import { useState } from 'react'
import Footer from '../components/Footer'
import { saveSubmission } from '../utils/storage'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('Sending...')
    saveSubmission('client', form)
    setTimeout(() => {
      setStatus('✓ Message received! Expect a reply within 24 hours.')
      setForm({ name: '', email: '', company: '', service: '', message: '' })
    }, 1500)
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Start a Conversation</p>
          <h3 className="page-hero-title">
            Let's<br /><span className="accent">Connect</span>
          </h3>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding) 0', borderTop: '1px solid var(--gray-900)' }}>
        <div className="container">
          <div className="contact-grid">
            <div>
              <p className="section-label">Contact Info</p>
              <h3 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                Ready to<br />build something<br /><span className="accent">great?</span>
              </h3>
              <div style={{ marginTop: 48 }}>
                {[
                  { label: 'General', value: 'hello@vzario.com' },
                  { label: 'New Business', value: 'projects@vzario.com' },
                  { label: 'Careers', value: 'careers@vzario.com' },
                  { label: 'Phone', value: '+1 (555) 000-0000' },
                  { label: 'New York', value: '340 W 53rd St, NY 10019' },
                  { label: 'Dubai', value: 'DIFC, Gate Avenue, Tower 2' },
                  { label: 'London', value: '1 Canada Square, E14 5AB' },
                ].map(item => (
                  <div key={item.label} className="contact-info-item">
                    <div className="contact-info-label">{item.label}</div>
                    <div className="contact-info-value">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label htmlFor="c-name">Full Name *</label>
                  <input id="c-name" type="text" placeholder="John Doe" required value={form.name} onChange={e => setForm(v => ({ ...v, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label htmlFor="c-email">Email Address *</label>
                  <input id="c-email" type="email" placeholder="john@company.com" required value={form.email} onChange={e => setForm(v => ({ ...v, email: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="c-company">Company</label>
                <input id="c-company" type="text" placeholder="Acme Corp" value={form.company} onChange={e => setForm(v => ({ ...v, company: e.target.value }))} />
              </div>
              <div className="form-group">
                <label htmlFor="c-service">Service Required</label>
                <select id="c-service" value={form.service} onChange={e => setForm(v => ({ ...v, service: e.target.value }))}>
                  <option value="">Select a service...</option>
                  <option>Web Development</option>
                  <option>Mobile App</option>
                  <option>UI/UX Design</option>
                  <option>Cloud & DevOps</option>
                  <option>AI Integration</option>
                  <option>Security Audit</option>
                  <option>Other / Multiple</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="c-message">Project Details *</label>
                <textarea
                  id="c-message"
                  placeholder="Tell us about your project, goals, timeline, and any other relevant details..."
                  required
                  style={{ minHeight: 160 }}
                  value={form.message}
                  onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                />
              </div>
              <div className="form-submit">
                <button type="submit" className="submit-btn">
                  <span>Send Message</span>
                  <span>→</span>
                </button>
                {status && <div className="submit-status">{status}</div>}
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
