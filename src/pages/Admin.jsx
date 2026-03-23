import { useState, useEffect } from 'react'
import { 
  getCareers, deleteCareer, updateCareerStatus, 
  getAdmin, setAdmin, 
  getJobs, saveJob, deleteJob, updateJob,
  getSubmissions, deleteSubmission, updateSubmissionStatus,
  getProjects, saveProject, deleteProject, updateProject
} from '../utils/storage'

export default function Admin() {
  const [isAdminCreated, setIsAdminCreated] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [activeSection, setActiveSection] = useState('career-forms') 
  
  const [data, setData] = useState({
    careers: [],
    jobs: [],
    client: [],
    projects: []
  })
  
  const [newJob, setNewJob] = useState({ title: '', dept: '', type: 'Full-time', location: 'Remote' })
  const [editingJobId, setEditingJobId] = useState(null)

  const [newProject, setNewProject] = useState({ title: '', category: '', desc: '', year: '', image: '', link: '', featured: false })
  const [editingProjectId, setEditingProjectId] = useState(null)

  const [msg, setMsg] = useState('')
  const [lastActivity, setLastActivity] = useState(Date.now())

  useEffect(() => {
    const admin = getAdmin()
    if (admin) setIsAdminCreated(true)
    refreshAllData()
  }, [])

  const refreshAllData = () => {
    setData({
      careers: getCareers(),
      jobs: getJobs(),
      client: getSubmissions('client'),
      projects: getProjects()
    })
  }

  // 30-minute Auto-Logout Logic
  useEffect(() => {
    if (!isLoggedIn) return
    const TIMEOUT = 30 * 60 * 1000
    const resetTimer = () => setLastActivity(Date.now())
    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('keypress', resetTimer)
    window.addEventListener('click', resetTimer)
    window.addEventListener('scroll', resetTimer)
    const interval = setInterval(() => {
      if (Date.now() - lastActivity > TIMEOUT) {
        setIsLoggedIn(false)
        setMsg('Session expired.')
      }
    }, 60000)
    return () => {
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('keypress', resetTimer)
      window.removeEventListener('click', resetTimer)
      window.removeEventListener('scroll', resetTimer)
      clearInterval(interval)
    }
  }, [isLoggedIn, lastActivity])

  const handleLogin = (e) => {
    e.preventDefault()
    const admin = getAdmin()
    if (admin && admin.username === username && admin.password === password) {
      setIsLoggedIn(true)
      setMsg('')
    } else {
      setMsg('Invalid credentials')
    }
  }

  if (!isLoggedIn) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ background: 'var(--gray-900)', padding: 40, width: '100%', maxWidth: 400, border: '1px solid var(--gray-800)' }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Admin Backoffice</h3>
          <p style={{ color: 'var(--gray-500)', fontSize: 14, marginBottom: 32 }}>
            {isAdminCreated ? 'Login to your account' : 'Create your admin account'}
          </p>

          {msg && <p style={{ color: 'var(--accent)', marginBottom: 20, fontSize: 13 }}>{msg}</p>}

          <form onSubmit={isAdminCreated ? handleLogin : (e) => { e.preventDefault(); setAdmin(username, password); setIsAdminCreated(true); setMsg('Account created! Please login.') }}>
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Admin@123"
                style={{ width: '100%', background: 'var(--black)', border: '1px solid var(--gray-800)', padding: '12px 16px', color: 'white', marginTop: 8 }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 32 }}>
              <label style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gray-500)' }}>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Admin@123"
                style={{ width: '100%', background: 'var(--black)', border: '1px solid var(--gray-800)', padding: '12px 16px', color: 'white', marginTop: 8 }}
              />
            </div>
            <button type="submit" className="submit-btn" style={{ width: '100%' }}>
              {isAdminCreated ? 'Login' : 'Setup Account'}
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">VZARIO <span className="accent">ADMIN</span></div>
        
        <nav className="sidebar-nav">
          <div className="nav-group">
            <div className="nav-group-label">Career</div>
            <button 
              className={`nav-item ${activeSection === 'career-forms' ? 'active' : ''}`}
              onClick={() => setActiveSection('career-forms')}
            >
              Forms
            </button>
            <button 
              className={`nav-item ${activeSection === 'career-jobs' ? 'active' : ''}`}
              onClick={() => setActiveSection('career-jobs')}
            >
              Job Listing
            </button>
          </div>

          <button 
            className={`nav-item ${activeSection === 'client-connect' ? 'active' : ''}`}
            onClick={() => setActiveSection('client-connect')}
            style={{ marginTop: 24 }}
          >
            Client Connect
          </button>

          <button 
            className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveSection('projects')}
            style={{ marginTop: 8 }}
          >
            Projects
          </button>
        </nav>

        <button className="logout-btn-sidebar" onClick={() => setIsLoggedIn(false)}>Logout</button>
      </aside>

      <section className="admin-main">
        <div className="admin-content">
          {activeSection === 'career-forms' && (
            <div className="admin-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Job Role</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.careers.map(app => (
                    <tr key={app.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{app.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                          <a href={app.portfolio} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>Portfolio</a>
                          {app.resume && (
                            <> · <button onClick={() => {
                              const base64Data = app.resume.split(',')[1];
                              const contentType = app.resume.split(',')[0].split(':')[1].split(';')[0];
                              const byteCharacters = atob(base64Data);
                              const byteNumbers = new Array(byteCharacters.length);
                              for (let i = 0; i < byteCharacters.length; i++) byteNumbers[i] = byteCharacters.charCodeAt(i);
                              const byteArray = new Uint8Array(byteNumbers);
                              const blob = new Blob([byteArray], { type: contentType });
                              const blobUrl = URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = blobUrl; link.target = '_blank';
                              link.download = app.resumeName || 'resume'; link.click();
                            }} style={{ textDecoration: 'underline', color: 'inherit', fontSize: 'inherit', cursor: 'none' }}>Resume</button></>
                          )}
                        </div>
                      </td>
                      <td>{app.jobTitle}</td>
                      <td>{app.phone}</td>
                      <td>
                        <select 
                          className="status-select"
                          value={app.status || 'Pending'}
                          onChange={(e) => { updateCareerStatus(app.id, e.target.value); refreshAllData() }}
                        >
                          <option>Pending</option>
                          <option>Reviewed</option>
                          <option>Rejected</option>
                          <option>Hired</option>
                        </select>
                      </td>
                      <td>
                        <button className="delete-btn" onClick={() => { deleteCareer(app.id); refreshAllData() }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {data.careers.length === 0 && <tr><td colSpan="5" style={{textAlign: 'center', padding: 40, color: 'var(--gray-500)'}}>No career forms yet.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === 'career-jobs' && (
            <div className="admin-card">
              <div style={{ marginBottom: 40, background: 'var(--black)', padding: 24, border: '1px solid var(--gray-800)' }}>
                <h3 style={{ marginBottom: 20, fontSize: 16 }}>{editingJobId ? 'Edit Job Listing' : 'Post New Job Listing'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                  <input placeholder="Job Title" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} style={{ background: 'var(--gray-900)', border: '1px solid var(--gray-800)', padding: 12, color: 'white' }} />
                  <input placeholder="Department" value={newJob.dept} onChange={e => setNewJob({...newJob, dept: e.target.value})} style={{ background: 'var(--gray-900)', border: '1px solid var(--gray-800)', padding: 12, color: 'white' }} />
                  <input placeholder="Type (e.g. Full-time, Contract)" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})} style={{ background: 'var(--gray-900)', border: '1px solid var(--gray-800)', padding: 12, color: 'white' }} />
                  <input placeholder="Location" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} style={{ background: 'var(--gray-900)', border: '1px solid var(--gray-800)', padding: 12, color: 'white' }} />
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                  <button 
                    className="submit-btn" 
                    style={{ padding: '10px 24px' }}
                    onClick={() => { 
                      if(newJob.title) { 
                        if (editingJobId) {
                          updateJob(editingJobId, newJob);
                          setEditingJobId(null);
                        } else {
                          saveJob(newJob);
                        }
                        setNewJob({title: '', dept: '', type: 'Full-time', location: 'Remote'}); 
                        refreshAllData() 
                      } 
                    }}
                  >
                    {editingJobId ? 'Update Job Posting' : 'Create Job Posting'}
                  </button>
                  {editingJobId && (
                    <button 
                      className="delete-btn" 
                      style={{ padding: '10px 24px', background: 'transparent' }}
                      onClick={() => {
                        setEditingJobId(null);
                        setNewJob({title: '', dept: '', type: 'Full-time', location: 'Remote'});
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Dept</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.jobs.map(job => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.dept}</td>
                      <td>{job.type}</td>
                      <td>{job.location}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button 
                            className="status-select" 
                            style={{ padding: '4px 12px', border: '1px solid var(--gray-800)', background: 'var(--gray-900)', color: 'white', cursor: 'pointer' }}
                            onClick={() => {
                              setEditingJobId(job.id);
                              setNewJob({ title: job.title, dept: job.dept, type: job.type, location: job.location });
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          >
                            Edit
                          </button>
                          <button className="delete-btn" onClick={() => { deleteJob(job.id); refreshAllData() }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === 'client-connect' && (
            <div className="admin-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Service / Details</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.client.map(sub => (
                    <tr key={sub.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{sub.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{sub.email}</div>
                        {sub.company && <div style={{ fontSize: 11, color: 'var(--accent)' }}>{sub.company}</div>}
                      </td>
                      <td>
                        <div style={{ fontSize: 13 }}>{sub.service}</div>
                      </td>
                      <td style={{ maxWidth: 300, fontSize: 12, lineHeight: 1.5 }}>{sub.message}</td>
                      <td>
                        <select 
                          className="status-select"
                          value={sub.status || 'New'}
                          onChange={(e) => { updateSubmissionStatus('client', sub.id, e.target.value); refreshAllData() }}
                        >
                          <option>New</option>
                          <option>Contacted</option>
                          <option>Proposal Sent</option>
                          <option>Qualified</option>
                          <option>Closed</option>
                          <option>Lost</option>
                        </select>
                      </td>
                      <td>
                        <button className="delete-btn" onClick={() => { deleteSubmission('client', sub.id); refreshAllData() }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {data.client.length === 0 && <tr><td colSpan="5" style={{textAlign: 'center', padding: 40, color: 'var(--gray-500)'}}>No submissions yet.</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === 'projects' && (
            <div className="admin-card">
              <div style={{ marginBottom: 40, background: 'var(--black)', padding: 24, border: '1px solid var(--gray-800)' }}>
                <h3 style={{ marginBottom: 20, fontSize: 16 }}>{editingProjectId ? 'Edit Project' : 'Add New Project'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                  <div className="form-group">
                    <label style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 4, display: 'block' }}>Title</label>
                    <input placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} style={{ width: '100%', background: 'var(--gray-900)', border: '1px solid var(--gray-800)', padding: 12, color: 'white' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 4, display: 'block' }}>Category</label>
                    <input placeholder="Category (e.g. Web App, Mobile)" value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} style={{ width: '100%', background: 'var(--gray-900)', border: '1px solid var(--gray-800)', padding: 12, color: 'white' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 4, display: 'block' }}>Year</label>
                    <input placeholder="Year" value={newProject.year} onChange={e => setNewProject({...newProject, year: e.target.value})} style={{ width: '100%', background: 'var(--gray-900)', border: '1px solid var(--gray-800)', padding: 12, color: 'white' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 4, display: 'block' }}>Image URL</label>
                    <input placeholder="/images/portfolio-X.png" value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} style={{ width: '100%', background: 'var(--gray-900)', border: '1px solid var(--gray-800)', padding: 12, color: 'white' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 4, display: 'block' }}>Project Link (URL)</label>
                    <input placeholder="https://..." value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} style={{ width: '100%', background: 'var(--gray-900)', border: '1px solid var(--gray-800)', padding: 12, color: 'white' }} />
                  </div>
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 4, display: 'block' }}>Description</label>
                    <textarea placeholder="Short description..." value={newProject.desc} onChange={e => setNewProject({...newProject, desc: e.target.value})} style={{ width: '100%', height: 80, background: 'var(--gray-900)', border: '1px solid var(--gray-800)', padding: 12, color: 'white', fontFamily: 'inherit' }} />
                  </div>
                  <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input type="checkbox" id="featured" checked={newProject.featured} onChange={e => setNewProject({...newProject, featured: e.target.checked})} style={{ cursor: 'none' }} />
                    <label htmlFor="featured" style={{ fontSize: 13, cursor: 'none' }}>Feature on Home Page</label>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                  <button 
                    className="submit-btn" 
                    style={{ padding: '10px 24px' }}
                    onClick={() => { 
                      if(newProject.title) { 
                        if (editingProjectId) {
                          updateProject(editingProjectId, newProject);
                          setEditingProjectId(null);
                        } else {
                          saveProject(newProject);
                        }
                        setNewProject({ title: '', category: '', desc: '', year: '', image: '', link: '', featured: false }); 
                        refreshAllData() 
                      } 
                    }}
                  >
                    {editingProjectId ? 'Update Project' : 'Add Project'}
                  </button>
                  {editingProjectId && (
                    <button 
                      className="delete-btn" 
                      style={{ padding: '10px 24px', background: 'transparent' }}
                      onClick={() => {
                        setEditingProjectId(null);
                        setNewProject({ title: '', category: '', desc: '', year: '', image: '', link: '', featured: false });
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Category</th>
                    <th>Year</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.projects.map(proj => (
                    <tr key={proj.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <img src={proj.image} alt="" style={{ width: 40, height: 25, objectFit: 'cover', background: 'var(--gray-800)' }} />
                          <div>
                            <div style={{ fontWeight: 600 }}>{proj.title}</div>
                            <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{proj.desc?.substring(0, 40)}...</div>
                          </div>
                        </div>
                      </td>
                      <td>{proj.category}</td>
                      <td>{proj.year}</td>
                      <td>{proj.featured ? <span style={{ color: 'var(--accent)' }}>Yes</span> : <span style={{ color: 'var(--gray-600)' }}>No</span>}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button 
                            className="status-select" 
                            style={{ padding: '4px 12px', border: '1px solid var(--gray-800)', background: 'var(--gray-900)', color: 'white', cursor: 'pointer' }}
                            onClick={() => {
                              setEditingProjectId(proj.id);
                              setNewProject({ ...proj });
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          >
                            Edit
                          </button>
                          <button className="delete-btn" onClick={() => { deleteProject(proj.id); refreshAllData() }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {data.projects.length === 0 && <tr><td colSpan="5" style={{textAlign: 'center', padding: 40, color: 'var(--gray-500)'}}>No projects added yet.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
