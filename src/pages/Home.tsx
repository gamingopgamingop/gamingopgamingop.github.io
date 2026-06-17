import { ArrowRight, Code as Code2, Palette, Rocket, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import './Home.css'

export default function Home() {
  const skills = [
    { icon: Code2, title: 'Full-Stack Development', description: 'Modern web applications with React, Node.js, and cloud technologies' },
    { icon: Palette, title: 'UI/UX Design', description: 'Beautiful, intuitive interfaces focused on user experience' },
    { icon: Rocket, title: 'Performance', description: 'Optimized applications that load fast and scale efficiently' },
    { icon: Sparkles, title: 'Innovation', description: 'Cutting-edge solutions powered by AI and modern tooling' },
  ]

  const featuredProjects = [
    {
      title: 'CloudSync Platform',
      description: 'Enterprise SaaS platform for real-time collaboration',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Node.js', 'AWS'],
    },
    {
      title: 'Analytics Dashboard',
      description: 'Data visualization and business intelligence tool',
      image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['TypeScript', 'D3.js', 'PostgreSQL'],
    },
    {
      title: 'Mobile Commerce App',
      description: 'Cross-platform shopping experience with 100K+ users',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React Native', 'Firebase', 'Stripe'],
    },
  ]

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Sparkles size={14} />
              <span>Available for new projects</span>
            </div>
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Jane Doe</span>
            </h1>
            <h2 className="hero-subtitle">Full-Stack Developer & Designer</h2>
            <p className="hero-description">
              I craft exceptional digital experiences through clean code and thoughtful design.
              Specializing in modern web applications that make a real impact.
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">
                View Projects <ArrowRight size={18} />
              </Link>
              <Link to="/portfolio" className="btn btn-secondary">
                See Portfolio
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Developer workspace"
                className="hero-image"
              />
              <div className="hero-decoration"></div>
            </div>
          </div>
        </div>
        <div className="hero-bg-gradient"></div>
      </section>

      <section className="skills-section">
        <div className="container">
          <h2 className="section-title">What I Do</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-icon">
                  <skill.icon size={24} />
                </div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-preview">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Work</h2>
            <Link to="/projects" className="view-all">
              View all projects <ArrowRight size={16} />
            </Link>
          </div>
          <div className="projects-grid">
            {featuredProjects.map((project, index) => (
              <article key={index} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Let's Work Together</h2>
              <p>
                Have a project in mind? I'd love to hear about it. Send me a message and let's
                discuss how we can bring your ideas to life.
              </p>
              <ul className="contact-highlights">
                <li>Quick response within 24 hours</li>
                <li>Free initial consultation</li>
                <li>Flexible engagement models</li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
