import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'

const timeline = [
  { year: '2016', title: 'The Beginning', desc: 'Vzario was founded with a single mission: to build digital experiences that feel like the future. Started as a small team of 4 passionate engineers and designers.' },
  { year: '2018', title: 'First Major Launch', desc: 'We delivered our first enterprise-scale platform for a Fortune 500 client, setting a new benchmark for what a digital agency could accomplish.' },
  { year: '2020', title: 'Global Expansion', desc: 'Opened offices in Dubai and London, expanding our team to over 20 specialists across design, engineering, and strategy.' },
  { year: '2022', title: 'AI Integration Era', desc: 'We pioneered AI-powered development workflows, reducing delivery time by 40% while maintaining our uncompromising quality standards.' },
  { year: '2024', title: '150+ Projects Milestone', desc: 'Reached a landmark moment — 150 successful projects delivered across 30 countries with a 98% client satisfaction rate.' },
  { year: '2026', title: 'The Future', desc: 'Continuing to push boundaries. We are building the next generation of digital experiences with cutting-edge technology and bold design vision.' },
]

const team = [
  { name: 'Alex Mercer', role: 'Founder & CEO', emoji: '👨‍💼' },
  { name: 'Zara Khan', role: 'Chief Design Officer', emoji: '👩‍🎨' },
  { name: 'Leo Zhang', role: 'VP Engineering', emoji: '👨‍💻' },
  { name: 'Mia Torres', role: 'Head of Strategy', emoji: '👩‍🔬' },
]

export default function About() {
  useEffect(() => {
    gsap.utils.toArray('.timeline-item').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      )
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Our Story</p>
          <h3 className="page-hero-title">
            About<br /><span className="accent">Vzario</span>
          </h3>
        </div>
      </section>

      <section className="timeline">
        <div className="container">
          <p className="section-label">Journey</p>
          <h3 className="section-title">How We <span className="accent">Got Here</span></h3>
          <div style={{ marginTop: 64 }}>
            {timeline.map((item) => (
              <div key={item.year} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-line" />
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding) 0', borderTop: '1px solid var(--gray-900)' }}>
        <div className="container">
          <p className="section-label">The Team</p>
          <h3 className="section-title">Meet the <span className="accent">Minds</span></h3>
          <div className="team-grid">
            {team.map(m => (
              <div key={m.name} style={{
                background: 'var(--gray-900)', padding: 'clamp(32px,4vw,56px)',
                textAlign: 'center', transition: 'background 0.4s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-800)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--gray-900)'}
              >
                <div style={{ fontSize: 56, marginBottom: 24 }}>{m.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{m.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', color: 'var(--gray-500)', textTransform: 'uppercase' }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
