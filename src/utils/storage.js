const STORAGE_KEYS = {
  CAREERS: 'vzario_careers',
  ADMIN: 'vzario_admin',
  JOBS: 'vzario_jobs',
  CLIENT_CONNECT: 'vzario_client_connect',
  PROJECTS: 'vzario_projects',
}

export const getCareers = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CAREERS)
  return data ? JSON.parse(data) : []
}

export const saveCareer = (application) => {
  const careers = getCareers()
  const newApplication = {
    ...application,
    id: Date.now(),
    date: new Date().toISOString(),
    status: 'Pending'
  }
  localStorage.setItem(STORAGE_KEYS.CAREERS, JSON.stringify([newApplication, ...careers]))
}

export const deleteCareer = (id) => {
  const careers = getCareers()
  const filtered = careers.filter(c => c.id !== id)
  localStorage.setItem(STORAGE_KEYS.CAREERS, JSON.stringify(filtered))
}

export const updateCareerStatus = (id, status) => {
  const careers = getCareers()
  const updated = careers.map(c => c.id === id ? { ...c, status } : c)
  localStorage.setItem(STORAGE_KEYS.CAREERS, JSON.stringify(updated))
}

// Job Management
export const getJobs = () => {
  const data = localStorage.getItem(STORAGE_KEYS.JOBS)
  const defaultJobs = [
    { id: 1, title: 'Senior Frontend Engineer', dept: 'Engineering', type: 'Full-time', location: 'Remote · New York' },
    { id: 2, title: 'UI/UX Designer', dept: 'Design', type: 'Full-time', location: 'Remote · London' },
    { id: 3, title: 'Backend Engineer (Node.js / Go)', dept: 'Engineering', type: 'Full-time', location: 'Remote · Dubai' }
  ]
  return data ? JSON.parse(data) : defaultJobs
}

export const saveJob = (job) => {
  const jobs = getJobs()
  const newJob = { ...job, id: Date.now() }
  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify([newJob, ...jobs]))
}

export const deleteJob = (id) => {
  const jobs = getJobs()
  const filtered = jobs.filter(j => j.id !== id)
  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(filtered))
}

export const updateJob = (id, updatedJob) => {
  const jobs = getJobs()
  const updated = jobs.map(j => j.id === id ? { ...j, ...updatedJob } : j)
  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updated))
}
// Projects
export const getProjects = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PROJECTS)
  if (!data) {
    const initial = [
      { id: 1, category: 'Web App', title: 'NeuroView Dashboard', desc: 'Real-time analytics platform with advanced data visualization.', image: '/images/portfolio-1.png', year: '2025', featured: true, link: 'https://neuroview.vzario.com' },
      { id: 2, category: 'Mobile', title: 'Pulse Finance', desc: 'Personal finance app with AI-powered insights.', image: '/images/portfolio-2.png', year: '2025', featured: true, link: '#' },
      { id: 3, category: 'E-Commerce', title: 'Noir Shop', desc: 'Luxury e-commerce experience with immersive product pages.', image: '/images/portfolio-3.png', year: '2024', featured: true, link: '#' },
      { id: 4, category: 'SaaS', title: 'Atlas Analytics', desc: 'B2B SaaS platform for enterprise business intelligence.', image: '/images/portfolio-4.png', year: '2024', featured: true, link: '#' },
      { id: 5, category: 'Brand', title: 'Vertex Identity', desc: 'Complete brand identity system for a tech startup.', image: '/images/portfolio-5.png', year: '2024', featured: true, link: '#' },
    ]
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initial))
    return initial
  }
  return JSON.parse(data)
}

export const saveProject = (project) => {
  const current = getProjects()
  const entry = { ...project, id: Date.now() }
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify([entry, ...current]))
}

export const deleteProject = (id) => {
  const current = getProjects()
  const filtered = current.filter(p => p.id !== id)
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered))
}

export const updateProject = (id, updatedProject) => {
  const current = getProjects()
  const updated = current.map(p => p.id === id ? { ...p, ...updatedProject } : p)
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated))
}

// Client Connect Submissions
export const getSubmissions = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CLIENT_CONNECT)
  return data ? JSON.parse(data) : []
}

export const saveSubmission = (type, submission) => {
  const current = getSubmissions()
  const entry = { ...submission, id: Date.now(), date: new Date().toISOString(), status: 'New' }
  localStorage.setItem(STORAGE_KEYS.CLIENT_CONNECT, JSON.stringify([entry, ...current]))
}

export const deleteSubmission = (type, id) => {
  const current = getSubmissions()
  const filtered = current.filter(s => s.id !== id)
  localStorage.setItem(STORAGE_KEYS.CLIENT_CONNECT, JSON.stringify(filtered))
}

export const updateSubmissionStatus = (type, id, status) => {
  const current = getSubmissions()
  const updated = current.map(s => s.id === id ? { ...s, status } : s)
  localStorage.setItem(STORAGE_KEYS.CLIENT_CONNECT, JSON.stringify(updated))
}

export const getAdmin = () => {
  const data = localStorage.getItem(STORAGE_KEYS.ADMIN)
  return data ? JSON.parse(data) : null
}

export const setAdmin = (username, password) => {
  localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify({ username, password }))
}

export const validateAdmin = (username, password) => {
  const admin = getAdmin()
  return admin && admin.username === username && admin.password === password
}
