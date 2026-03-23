import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { saveSubmission, getProjects } from '../utils/storage';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ────────────────────────────────────────────────── */
const services = [
  { icon: '⚡', num: '01', title: 'Web Development', desc: 'Blazing-fast, scalable web experiences built with modern frameworks and best practices.', image: '/images/service-web.png' },
  { icon: '📱', num: '02', title: 'Mobile Apps', desc: 'Cross-platform and native mobile applications that deliver seamless user experiences.', image: '/images/service-mobile.png' },
  { icon: '🎨', num: '03', title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces that delight users and drive conversions.', image: '/images/service-design.png' },
  { icon: '☁️', num: '04', title: 'Cloud & DevOps', desc: 'Scalable cloud infrastructure, CI/CD pipelines, and automated deployment systems.', image: '/images/service-cloud.png' },
  { icon: '🤖', num: '05', title: 'AI Integration', desc: 'Intelligent features powered by machine learning and cutting-edge AI APIs.', image: '/images/service-ai.png' },
  { icon: '🔒', num: '06', title: 'Security', desc: 'Enterprise-grade security audits, penetration testing, and compliance solutions.', image: '/images/service-security.png' },
  { icon: '🚀', num: '07', title: 'Optimization', desc: 'Enhance speed, performance, and conversion rates with data-driven technical optimizations.', image: '/images/service-optimization.png' },
  { icon: '🛠️', num: '08', title: 'Maintenance & Support', desc: 'Keep your systems running smoothly with 24/7 monitoring, updates, and dedicated technical support.', image: '/images/service-maintenance.png' },
]

const techStack = [
  {
    label: 'Frontend', items: [
      { icon: '🌐', name: 'HTML5' }, { icon: '🎨', name: 'CSS3' }, { icon: '⚡', name: 'JavaScript' },
    ]
  },
  {
    label: 'Frameworks', items: [
      { icon: '⚛️', name: 'React' }, { icon: '🔺', name: 'Angular' }, { icon: '▲', name: 'Next.js' },
      { icon: '🔥', name: 'Laravel' }, { icon: '📘', name: 'WordPress' },
    ]
  },
  {
    label: 'Backend', items: [
      { icon: '🐘', name: 'PHP' }, { icon: '🟢', name: 'Node.js' }, { icon: '🐍', name: 'Python' }, { icon: '🐹', name: 'Go' },
    ]
  },
  {
    label: 'Databases', items: [
      { icon: '🐘', name: 'PostgreSQL' }, { icon: '🍃', name: 'MongoDB' }, { icon: '🐬', name: 'MySQL' }, { icon: '🔴', name: 'Redis' },
    ]
  },
  {
    label: 'Cloud / DevOps', items: [
      { icon: '☁️', name: 'AWS' }, { icon: '🔵', name: 'Azure' }, { icon: '🐳', name: 'Docker' }, { icon: '⎈', name: 'Kubernetes' }, { icon: '🔁', name: 'CI/CD' },
    ]
  },
]

// Managed in Admin
const portfolioItemsPlaceholder = [
  { category: 'Web App', title: 'NeuroView Dashboard', image: '/images/portfolio-1.png' },
  { category: 'Mobile', title: 'Pulse Finance', image: '/images/portfolio-2.png' },
  { category: 'E-Commerce', title: 'Noir Shop', image: '/images/portfolio-3.png' },
  { category: 'SaaS', title: 'Atlas Analytics', image: '/images/portfolio-4.png' },
  { category: 'Brand', title: 'Vertex Identity', image: '/images/portfolio-5.png' },
]

const testimonials = [
  {
    quote: 'Vzario transformed our digital presence completely. The attention to detail and animation quality is unlike anything we have seen from any other agency.',
    name: 'Sarah Chen', role: 'CEO', company: 'NovaTech', avatar: '👩‍💼'
  },
  {
    quote: 'The team delivered a product that exceeded every expectation. Their technical expertise combined with a design sensibility is truly rare.',
    name: 'Marcus Reid', role: 'CTO', company: 'Orbit Systems', avatar: '👨‍💻'
  },
  {
    quote: 'Working with Vzario felt like partnering with a team from the future. Our app performance improved dramatically and users love the new experience.',
    name: 'Priya Sharma', role: 'Product Lead', company: 'Flux', avatar: '👩‍🚀'
  },
  {
    quote: 'Outstanding quality, perfect communication, and delivered on time. Vzario is the gold standard for premium digital product development.',
    name: 'James Wu', role: 'Founder', company: 'Apex Labs', avatar: '🧑‍🔬'
  },
  {
    quote: 'Their ability to translate complex requirements into elegant, high-performing solutions is unmatched. A truly world-class development partner.',
    name: 'Elena Rossi', role: 'VP Engineering', company: 'Vortex UI', avatar: '👩‍🔬'
  },
  {
    quote: 'The level of professionalism and the final outcome were both exceptional. Vzario is our go-to partner for all things digital.',
    name: 'Liam O’Brien', role: 'Head of Product', company: 'CloudScale', avatar: '👨‍💼'
  },
]

const stats = [
  { number: 150, suffix: '+', label: 'Projects Delivered' },
  { number: 8, suffix: '+', label: 'Years of Excellence' },
  { number: 98, suffix: '%', label: 'Client Satisfaction' },
  { number: 40, suffix: '+', label: 'Expert Team Members' },
]

const marqueeItems = [
  'Web Development', 'UI/UX Design', 'Mobile Apps', 'Cloud Solutions',
  'AI Integration', 'Brand Identity', 'Performance', 'Security',
  'Web Development', 'UI/UX Design', 'Mobile Apps', 'Cloud Solutions',
  'AI Integration', 'Brand Identity', 'Performance', 'Security',
]

/* ─── Components ─────────────────────────────────────────── */
const TechLogo = ({ name }) => {
  const mapping = {
    'HTML5': 'html5/html5-original.svg',
    'CSS3': 'css3/css3-original.svg',
    'JavaScript': 'javascript/javascript-original.svg',
    'React': 'react/react-original.svg',
    'Angular': 'angularjs/angularjs-original.svg',
    'Next.js': 'nextjs/nextjs-original.svg',
    'Laravel': 'laravel/laravel-original.svg',
    'WordPress': 'wordpress/wordpress-plain.svg',
    'PHP': 'php/php-original.svg',
    'Node.js': 'nodejs/nodejs-original.svg',
    'Python': 'python/python-original.svg',
    'Go': 'go/go-original.svg',
    'PostgreSQL': 'postgresql/postgresql-original.svg',
    'MongoDB': 'mongodb/mongodb-original.svg',
    'MySQL': 'mysql/mysql-original.svg',
    'Redis': 'redis/redis-original.svg',
    'AWS': 'amazonwebservices/amazonwebservices-original.svg',
    'Azure': 'azure/azure-original.svg',
    'Docker': 'docker/docker-original.svg',
    'Kubernetes': 'kubernetes/kubernetes-plain.svg',
    'CI/CD': 'github/github-original.svg', // Fallback for CI/CD conceptually
  }

  const path = mapping[name] || 'chrome/chrome-original.svg'
  const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`

  return (
    <img
      src={url}
      alt={name}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      onError={(e) => { e.target.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg' }}
    />
  )
}

function useScrollReveal(selector, from = {}) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    elements.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 60, ...from },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      )
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [selector])
}

/* ─── Counter ─────────────────────────────────────────────── */
function AnimatedCounter({ target, suffix }) {
  const ref = useRef(null)
  useEffect(() => {
    const obj = { val: 0 }
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix
          }
        })
      },
      once: true,
    })
  }, [target, suffix])
  return <span ref={ref}>0{suffix}</span>
}

/* ─── Contact Section ─────────────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('Sending...')
    saveSubmission('client', form)
    setTimeout(() => {
      setStatus('✓ Message sent! We will be in touch shortly.')
      setForm({ name: '', email: '', company: '', service: '', message: '' })
    }, 1500)
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <p className="section-label">Get in Touch</p>
        <h3 className="section-title">Let's <span className="accent">Work</span> Together</h3>
        <div className="contact-grid">
          <div>
            {[
              { label: 'Email', value: 'hello@vzario.com' },
              { label: 'Phone', value: '+1 (555) 000-0000' },
              { label: 'Location', value: 'New York · Dubai · London' },
              { label: 'Availability', value: 'Mon–Fri, 9am–6pm UTC' },
            ].map(item => (
              <div key={item.label} className="contact-info-item">
                <div className="contact-info-label">{item.label}</div>
                <div className="contact-info-value">{item.value}</div>
              </div>
            ))}
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">Full Name</label>
              <input
                id="contact-name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={e => setForm(v => ({ ...v, name: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                type="email"
                placeholder="john@company.com"
                value={form.email}
                onChange={e => setForm(v => ({ ...v, email: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                type="text"
                placeholder="Acme Corp"
                value={form.company}
                onChange={e => setForm(v => ({ ...v, company: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-service">Service Needed</label>
              <select
                id="contact-service"
                value={form.service}
                onChange={e => setForm(v => ({ ...v, service: e.target.value }))}
              >
                <option value="">Select a service...</option>
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>UI/UX Design</option>
                <option>Cloud & DevOps</option>
                <option>AI Integration</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                required
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
  )
}

/* ─── Home ────────────────────────────────────────────────── */
export default function Home() {
  const heroVRef = useRef(null)
  const heroZarioRef = useRef(null)
  const heroContainerRef = useRef(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Portfolio State (Replicated from Portfolio page)
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

  // Hero Logo Entrance Animation
  useEffect(() => {
    const v = heroVRef.current
    const zario = heroZarioRef.current
    if (!v || !zario) return

    // Master Timeline
    const tl = gsap.timeline({ delay: 2.5 })

    // 1. Reveal V (Initially centered via CSS/Motion)
    tl.fromTo(v,
      { scale: 0.6, opacity: 0, rotationX: 40 },
      { scale: 1, opacity: 1, rotationX: 0, duration: 1.5, ease: 'expo.out' }
    )

    // 2. Slide V left and Reveal ZARIO
    tl.fromTo(zario,
      { opacity: 0, x: -30, width: 0, marginLeft: 0 },
      { opacity: 1, x: 0, width: 'auto', marginLeft: '0.15em', duration: 1.2, ease: 'power4.out' },
      "+=0.4" // Small pause after V appears
    )

    // Parallax for the whole container
    gsap.to([v, zario], {
      y: '-8vh',
      ease: 'none',
      scrollTrigger: {
        trigger: heroContainerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  // Reveal animations for all sections
  useEffect(() => {
    // Section labels
    gsap.utils.toArray('.section-label').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      )
    })

    // Section titles - character split
    gsap.utils.toArray('.section-title').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      )
    })

    // Service cards
    gsap.utils.toArray('.service-card').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 80 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.08,
          scrollTrigger: { trigger: el.closest('.services-grid') || el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      )
    })

    // Tech categories
    gsap.utils.toArray('.tech-category').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      )
    })

    // Portfolio items
    gsap.utils.toArray('.portfolio-item').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out', delay: i * 0.07,
          scrollTrigger: { trigger: el.closest('.portfolio-grid') || el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      )
    })

    // About cards
    gsap.utils.toArray('.about-card').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      )
    })

    // Portfolio Page Items Animation (Home Section)
    gsap.utils.toArray('.portfolio-page-item').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.06,
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        }
      )
    })

    // CTA title lines
    gsap.utils.toArray('.cta-title .line span').forEach((el, i) => {
      gsap.fromTo(el,
        { y: '100%' },
        {
          y: '0%', duration: 1, ease: 'power4.out', delay: i * 0.12,
          scrollTrigger: { trigger: el.closest('.cta-title'), start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [active])

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(v => (v + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="hero-v2" ref={heroContainerRef} id="hero">
        <div className="hero-v2-bg">
          <div className="hero-v2-glow-1" />
          <div className="hero-v2-glow-2" />
          <div className="hero-v2-glow-3" />
        </div>
        <div className="hero-v2-grid" />

        <div className="hero-v2-content">
          <div className="hero-v2-tagline-container">
            <span className="hero-v2-tagline">Innovation & Design</span>
          </div>

          <h1 className="hero-v2-title">
            <span className="hero-v-initial" ref={heroVRef}>V</span>
            <span className="hero-zario-suffix" ref={heroZarioRef}>ZARIO</span>
          </h1>

          <p className="hero-v2-subtitle">
            Crafting premium digital experiences through <span>strategic design</span> and <span>futuristic tech</span>.
          </p>

          <div className="hero-v2-cta-group">
            <Link to="/contact" className="btn-v2-primary">Start a Project</Link>
            <Link to="/portfolio" className="btn-v2-secondary">Explore Work</Link>
          </div>
        </div>

        <div className="hero-v2-bottom">
          <div className="hero-v2-scroll">
            <div className="hero-v2-scroll-line" />
            <span>Discover</span>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="marquee-section">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-left">
              <p className="section-label">About Us</p>
              <h3 className="section-title">
                We Build <span className="accent">Digital</span><br />Futures
              </h3>
              <p className="about-description">
                Vzario is a <strong>premium digital agency</strong> at the intersection of design and technology. We craft transformative digital experiences that captivate audiences and drive measurable business growth.
              </p>
              <p className="about-description" style={{ marginTop: 20 }}>
                From concept to deployment, our team of <strong>expert engineers and designers</strong> deliver solutions that set new industry standards.
              </p>
            </div>
            <div className="about-right">
              {[
                { n: '150+', l: 'Projects Delivered' },
                { n: '8+', l: 'Years of Excellence' },
                { n: '40+', l: 'Expert Engineers' },
                { n: '98%', l: 'Client Satisfaction' },
              ].map(c => (
                <div key={c.l} className="about-card">
                  <div className="about-card-number">{c.n}</div>
                  <div className="about-card-label">{c.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="services" id="services">
        <div className="container">
          <p className="section-label">What We Do</p>
          <h3 className="section-title">Our <span className="accent">Services</span></h3>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div className="service-card-img-container">
                  <img src={s.image} alt={s.title} className="service-card-img" />
                </div>
                <div className="service-card-content">
                  <h3 className="service-card-title">{s.title}</h3>
                  <p className="service-card-description">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="tech" id="tech">
        <div className="container">
          <p className="section-label">Technology</p>
          <h3 className="section-title">Our <span className="accent">Stack</span></h3>
          <div className="tech-categories">
            {techStack.map(cat => (
              <div key={cat.label} className="tech-category">
                <div className="tech-category-label">
                  <span>{cat.label}</span>
                </div>
                <div className="tech-grid-v2">
                  {cat.items.map(item => (
                    <div key={item.name} className="tech-card-v2">
                      <div className="tech-card-icon">
                        <TechLogo name={item.name} />
                      </div>
                      <span className="tech-card-name">{item.name}</span>
                      <div className="tech-card-highlighter" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section className="portfolio" id="portfolio">
        <div className="container">
          <div className="portfolio-header">
            <div>
              <p className="section-label">Our Work</p>
              <h3 className="section-title">Selected <span className="accent">Projects</span></h3>
            </div>
            <Link to="/portfolio" className="portfolio-view-all">
              View All Work →
            </Link>
          </div>
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

      {/* ─── BRAND MARQUEE ─── */}
      <section className="brand-marquee-section">
        <div className="container">
          <p className="section-label" style={{ justifyContent: 'center', marginBottom: 40 }}>Trusted By Global Leaders</p>
          <div className="brand-marquee">
            <div className="brand-marquee-track">
              {[
                'react', 'nodejs', 'mongodb', 'github', 'mysql', 'php', 'python', 'javascript', 'html5', 'css3',
                'react', 'nodejs', 'mongodb', 'github', 'mysql', 'php', 'python', 'javascript', 'html5', 'css3'
              ].map((tech, i) => {
                const isPlain = ['php', 'python', 'javascript', 'html5', 'css3'].includes(tech);
                const suffix = isPlain ? '-plain-wordmark.svg' : '-original-wordmark.svg';
                return (
                  <div key={i} className="brand-logo-item">
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}${suffix}`}
                      alt={tech}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <p className="section-label">Client Love</p>
          <h3 className="section-title">What They <span className="accent">Say</span></h3>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card-v2">
                <div className="testimonial-top">
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} className="star-icon" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <p className="testimonial-quote-v2">"{t.quote}"</p>

                <div className="testimonial-separator" />

                <div className="testimonial-footer">
                  <div className="testimonial-footer-text">
                    <span className="testimonial-name-v2">{t.name}</span>
                    <div className="testimonial-info-row">
                      <span className="testimonial-role-v2">{t.role}</span>
                      <div className="testimonial-dot" />
                      <span className="testimonial-company-v2">{t.company}</span>
                    </div>
                  </div>
                </div>

                <div className="testimonial-highlighter" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="stats" id="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map(s => (
              <div key={s.label} className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter target={s.number} suffix={s.suffix} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta" id="cta">
        <div className="cta-v-bg">V</div>
        <div className="container">
          <div className="cta-content">
            <h3 className="cta-title">
              <span className="line"><span>Ready to Build</span></span>
              <span className="line"><span>Something</span></span>
              <span className="line"><span className="accent">Extraordinary?</span></span>
            </h3>
            <p className="cta-subtitle">
              Let's turn your vision into a premium digital experience that leaves a lasting impression.
            </p>
            <Link to="/contact" className="cta-btn">
              <span>Start Your Project</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <ContactSection />

      <Footer />
    </main>
  )
}
