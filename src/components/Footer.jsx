import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="navbar-logo" style={{ fontSize: 32 }}>Vzario</div>
          <p>Crafting futuristic digital experiences that push the boundaries of technology and design.</p>
        </div>
        <div className="footer-col">
          <h2>Company</h2>
          <br />
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h2>Services</h2>
          <br />
          <ul>
            <li><Link to="/services">Web Development</Link></li>
            <li><Link to="/services">Mobile Apps</Link></li>
            <li><Link to="/services">UI / UX Design</Link></li>
            <li><Link to="/services">Cloud & DevOps</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h2>Connect</h2>
          <br />
          <ul>
            <li><a href="#" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">Twitter / X</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">Dribbble</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© {new Date().getFullYear()} Vzario. All rights reserved.</p>
      </div>
    </footer>
  )
}
