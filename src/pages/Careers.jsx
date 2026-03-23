import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import { saveCareer, getJobs } from '../utils/storage'

const perks = [
  { icon: '🚀', title: 'Cutting Edge', desc: 'Work with the latest technologies and push the boundaries of digital innovation.' },
  { icon: '🌍', title: 'Remote First', desc: 'Flexible working hours and the freedom to work from anywhere in the world.' },
  { icon: '🧠', title: 'Growth Mindset', desc: 'Dedicated budget for learning, certifications, and attending global conferences.' },
  { icon: '🤝', title: 'Collaborative Culture', desc: 'Join a team of passionate experts who value transparency and mutual respect.' },
  { icon: '🏥', title: 'Health & Wellness', desc: 'Comprehensive health insurance, fitness stipends, and mental health support.' },
  { icon: '🎉', title: 'Team Retreats', desc: 'Annual offsites and quarterly team-building activities to stay connected.' },
]

export default function Careers() {
  const [availableJobs, setAvailableJobs] = useState([])
  const [activeJob, setActiveJob] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    resume: null,
    resumeName: ''
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setAvailableJobs(getJobs())
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData({
        ...formData,
        resume: reader.result,
        resumeName: file.name
      })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    saveCareer({ ...formData, jobTitle: activeJob.title })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setActiveJob(null)
      setFormData({ name: '', email: '', phone: '', portfolio: '', resume: null, resumeName: '' })
    }, 3000)
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Join Our Team</p>
          <h3 className="page-hero-title">
            Build the<br /><span className="accent">Future</span>
          </h3>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding) 0', borderTop: '1px solid var(--gray-900)' }}>
        <div className="container">
          <p className="section-label">Benefits</p>
          <h3 className="section-title">Why <span className="accent">Vzario?</span></h3>
          <div className="perks-grid">
            {perks.map(p => (
              <div key={p.title} style={{
                background: 'var(--gray-900)', padding: 'clamp(24px,3vw,40px)',
                transition: 'background 0.4s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-800)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--gray-900)'}
              >
                <div style={{ fontSize: 36, marginBottom: 20 }}>{p.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontFamily: 'var(--font-secondary)', fontSize: 14, color: 'var(--gray-500)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding) 0', borderTop: '1px solid var(--gray-900)' }}>
        <div className="container">
          <p className="section-label">Open Positions</p>
          <h3 className="section-title">We're <span className="accent">Hiring</span></h3>
          <div className="careers-grid">
            {availableJobs.map((job, i) => (
              <div key={i} className="job-card">
                <div>
                  <div className="job-title">{job.title}</div>
                  <div className="job-meta">
                    <span className="job-tag">{job.dept}</span>
                    <span className="job-tag">{job.type}</span>
                    <span className="job-tag">{job.location}</span>
                  </div>
                </div>
                <button
                  className="job-apply"
                  onClick={() => setActiveJob(job)}
                >
                  Apply Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {activeJob && (
        <div className="modal-overlay" onClick={() => setActiveJob(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveJob(null)}>✕</button>
            <p className="section-label">Application Form</p>
            <h3 className="modal-title">Applying for <span className="accent">{activeJob.title}</span></h3>

            {submitted ? (
              <div className="success-message">
                <h3>Application Received!</h3>
                <p>We'll review your profile and get back to you soon.</p>
              </div>
            ) : (
              <form className="apply-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="form-group">
                    <label>Portfolio Link</label>
                    <input
                      type="url"
                      value={formData.portfolio}
                      onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                      placeholder="https://portfolio.com"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Resume / CV (PDF, DOC, DOCX)</label>
                    <div className="file-upload-wrapper">
                      <input
                        type="file"
                        id="resume-upload"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="resume-upload" className="file-upload-label">
                        {formData.resumeName || 'Choose File...'}
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="submit-btn" style={{ marginTop: 32 }}>Submit Application</button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
