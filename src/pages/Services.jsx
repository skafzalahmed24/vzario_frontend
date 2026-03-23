import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'

const services = [
  { num: '01', icon: '⚡', title: 'Web Development', desc: 'We architect, design, and build exceptional web applications — from lightning-fast marketing sites to complex enterprise platforms. Our stack: React, Next.js, Node.js, Go, and more.', tags: ['React', 'Next.js', 'Node.js', 'TypeScript'] },
  { num: '02', icon: '📱', title: 'Mobile Applications', desc: 'Native and cross-platform mobile apps that users love. We deliver polished iOS and Android experiences with React Native and Swift/Kotlin.', tags: ['React Native', 'Swift', 'Kotlin', 'Flutter'] },
  { num: '03', icon: '🎨', title: 'UI/UX Design', desc: 'Research-driven design that solves real problems beautifully. We create interfaces that are intuitive, accessible, and visually stunning.', tags: ['Figma', 'Design Systems', 'Research', 'Prototyping'] },
  { num: '04', icon: '☁️', title: 'Cloud & DevOps', desc: 'Scalable cloud infrastructure that grows with your business. We implement CI/CD pipelines, container orchestration, and auto-scaling systems.', tags: ['AWS', 'Azure', 'Docker', 'Kubernetes'] },
  { num: '05', icon: '🤖', title: 'AI Integration', desc: 'Embed intelligence into your product. From LLM integrations to custom ML models, we make AI accessible and practical for real business needs.', tags: ['OpenAI', 'LangChain', 'TensorFlow', 'Python'] },
  { num: '06', icon: '🔒', title: 'Security Auditing', desc: 'Comprehensive security assessments, penetration testing, and compliance implementation to protect your assets and user data.', tags: ['OWASP', 'Pen Testing', 'ISO 27001', 'GDPR'] },
]

export default function Services() {
  useEffect(() => {
    gsap.utils.toArray('.service-list-item').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.06,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      )
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">What We Offer</p>
          <h3 className="page-hero-title">
            Our<br /><span className="accent">Services</span>
          </h3>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding) 0', borderTop: '1px solid var(--gray-900)' }}>
        <div className="container">
          <div className="services-list">
            {services.map(s => (
              <div key={s.num} className="service-list-item">
                <div className="service-list-number">{s.num}</div>
                <div className="service-list-content">
                  <h3>{s.icon} {s.title}</h3>
                  <p>{s.desc}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
                    {s.tags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: 'var(--font-mono)', fontSize: 10,
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        padding: '4px 12px', border: '1px solid var(--gray-800)',
                        borderRadius: '999px', color: 'var(--gray-500)',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="service-list-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
