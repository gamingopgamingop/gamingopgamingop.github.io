import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="footer-logo">SB</span>
          <p className="footer-tagline">Building digital experiences that matter.</p>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h4>Navigation</h4>
            <a href="/">Home</a>
            <a href="/portfolio">Portfolio</a>
            <a href="/projects">Projects</a>
            <a href="/blog">Blog</a>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <a href="mailto:sarthak@example.com">
              <Mail size={16} /> sarthak@example.com
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github size={16} /> GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter size={16} /> Twitter
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} Sarthak Bansal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
