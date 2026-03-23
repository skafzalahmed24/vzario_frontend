import { useState } from 'react'
import Footer from '../components/Footer'

const faqs = [
  { q: 'What types of clients do you work with?', a: 'We work with a diverse range of clients — from ambitious startups to Fortune 500 enterprises across industries including fintech, healthtech, e-commerce, SaaS, and consumer apps. Our sweet spot is clients who value premium quality and want to ship products that stand out.' },
  { q: 'How long does a typical project take?', a: 'Project timelines depend on scope and complexity. A basic web app typically takes 6–10 weeks. Enterprise platforms can range from 3–9 months. We always provide a detailed timeline during the discovery phase so you know exactly what to expect.' },
  { q: 'What is your development process?', a: 'We follow an agile, iterative process: Discovery & Strategy → Design → Development → Testing → Launch → Support. You will have full visibility throughout with weekly check-ins, a shared project dashboard, and direct access to your team.' },
  { q: 'Do you work with existing codebases?', a: 'Absolutely. We regularly work with existing codebases for new features, performance optimization, refactoring, or tech debt reduction. Our first step is always a thorough technical audit to understand what we are working with.' },
  { q: 'What are your pricing models?', a: 'We offer both fixed-price project-based engagements and monthly retainers for ongoing work. After the discovery call, we produce a detailed proposal with transparent pricing. No hidden costs, ever.' },
  { q: 'Do you provide post-launch support?', a: 'Yes. All projects include 30 days of post-launch support. We also offer ongoing maintenance and feature retainer packages for clients who want a long-term partner.' },
  { q: 'Can you work with our existing design team?', a: 'Absolutely. Many of our clients have in-house designers and we integrate seamlessly with existing Figma files, design systems, and brand guidelines. We are used to being one part of a larger team.' },
  { q: 'What makes Vzario different from other agencies?', a: 'Three things: our obsession with quality, our deep technical expertise across the full stack, and our focus on animation and micro-interaction excellence. We build products that users actually enjoy using, not just functional tools.' },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Got Questions?</p>
          <h3 className="page-hero-title">
            Frequently<br /><span className="accent">Asked</span>
          </h3>
        </div>
      </section>

      <section style={{ padding: 'var(--section-padding) 0', borderTop: '1px solid var(--gray-900)' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="faq-list">
            {faqs.map((item, i) => (
              <div key={i} className={`faq-item ${openIdx === i ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  aria-expanded={openIdx === i}
                >
                  <h3>{item.q}</h3>
                  <div className="faq-icon">+</div>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
