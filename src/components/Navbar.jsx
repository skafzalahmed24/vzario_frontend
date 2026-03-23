import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'

const links = [
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Careers', path: '/careers' },
  { label: 'FAQ', path: '/faq' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.8 }
    )
  }, [])

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ opacity: 0 }}>
        <Link to="/" className="navbar-logo">Vzario</Link>
        <div className="navbar-links">
          {links.map(l => (
            <Link key={l.path} to={l.path}>{l.label}</Link>
          ))}
        </div>
        <Link to="/contact" className="navbar-cta">Let's Talk</Link>
        <button
          className="navbar-menu-btn"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span style={menuOpen ? { transform: 'rotate(45deg) translate(3px, 4px)' } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: 'rotate(-45deg) translate(3px, -4px)' } : {}} />
        </button>
      </nav>
      {/* Mobile Nav */}
      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {links.map(l => (
            <li key={l.path}>
              <Link to={l.path} onClick={() => setMenuOpen(false)}>{l.label}</Link>
            </li>
          ))}
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
