import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'
import { getProjects } from '../utils/storage'

const filtersPlaceholder = ['All', 'Web App', 'Mobile', 'E-Commerce', 'SaaS', 'Brand']

const projectsPlaceholder = [
  { category: 'Web App', title: 'NeuroView Dashboard', desc: 'Real-time analytics platform with advanced data visualization.', image: '/images/portfolio-1.png', year: '2025' },
  { category: 'Mobile', title: 'Pulse Finance', desc: 'Personal finance app with AI-powered insights.', image: '/images/portfolio-2.png', year: '2025' },
  { category: 'E-Commerce', title: 'Noir Shop', desc: 'Luxury e-commerce experience with immersive product pages.', image: '/images/portfolio-3.png', year: '2024' },
  { category: 'SaaS', title: 'Atlas Analytics', desc: 'B2B SaaS platform for enterprise business intelligence.', image: '/images/portfolio-4.png', year: '2024' },
  { category: 'Brand', title: 'Vertex Identity', desc: 'Complete brand identity system for a tech startup.', image: '/images/portfolio-5.png', year: '2024' },
  { category: 'Web App', title: 'Orion Platform', desc: 'Collaborative project management for distributed teams.', image: '/images/portfolio-6.png', year: '2023' },
  { category: 'Mobile', title: 'Nimbus Weather', desc: 'Hyper-local weather app with beautiful animations.', image: '/images/portfolio-2.png', year: '2023' },
  { category: 'SaaS', title: 'Quanta CRM', desc: 'Next-gen customer relationship management platform.', image: '/images/portfolio-1.png', year: '2023' },
  { category: 'E-Commerce', title: 'Celeste Marketplace', desc: 'Multi-vendor fashion marketplace with live features.', image: '/images/portfolio-3.png', year: '2022' },
]

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const [projects, setProjects] = useState([])
  const [filters, setFilters] = useState(['All'])

  useEffect(() => {
    const all = getProjects()
    setProjects(all)
    const cats = ['All', ...new Set(all.map(p => p.category).filter(Boolean))]
    setFilters(cats)
  }, [])

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  useEffect(() => {
    gsap.utils.toArray('.portfolio-page-item').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.06,
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        }
      )
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [active])

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Case Studies</p>
          <h3 className="page-hero-title">
            Our<br /><span className="accent">Portfolio</span>
          </h3>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding) 0', borderTop: '1px solid var(--gray-900)' }}>
        <div className="container">
          <div className="portfolio-filters">
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn ${active === f ? 'active' : ''}`}
                onClick={() => setActive(f)}
              >{f}</button>
            ))}
          </div>
          <div className="portfolio-page-grid">
            {filtered.map((p, i) => (
              <div key={p.title} className="portfolio-page-item" style={{
                background: 'var(--gray-900)',
                overflow: 'hidden',
                cursor: 'none',
                position: 'relative',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-800)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--gray-900)'}
              >
                <a 
                  href={p.link || '#'} 
                  target={p.link && p.link !== '#' ? "_blank" : "_self"}
                  rel="noreferrer"
                  style={{ display: 'block', height: '100%', textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{
                    aspectRatio: '16/10',
                    overflow: 'hidden',
                  }}>
                    <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 'clamp(20px,3vw,36px)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 8 }}>
                      {p.category} · {p.year}
                    </div>
                    <h3 style={{ fontSize: 'clamp(18px,2vw,24px)', fontWeight: 700, marginBottom: 10 }}>{p.title}</h3>
                    <p style={{ fontFamily: 'var(--font-secondary)', fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.7 }}>{p.desc}</p>
                    {p.link && p.link !== '#' && (
                      <div style={{ marginTop: 20, color: 'var(--accent)', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                        VIEW PROJECT <span style={{ fontSize: 16 }}>→</span>
                      </div>
                    )}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
