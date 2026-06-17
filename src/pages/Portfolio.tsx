import { Briefcase, GraduationCap, Award, Download } from 'lucide-react'
import './Portfolio.css'

export default function Portfolio() {
  const experiences = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'TechCorp Inc.',
      period: '2022 - Present',
      description: 'Leading development of cloud-native SaaS platform serving 50K+ businesses. Architected microservices infrastructure reducing deployment time by 60%.',
      skills: ['React', 'Node.js', 'AWS', 'Kubernetes'],
    },
    {
      title: 'Full-Stack Developer',
      company: 'StartupXYZ',
      period: '2020 - 2022',
      description: 'Built customer-facing dashboard from scratch, increasing user engagement by 40%. Implemented real-time analytics pipeline.',
      skills: ['Vue.js', 'Python', 'PostgreSQL', 'Redis'],
    },
    {
      title: 'Junior Developer',
      company: 'Digital Agency Co.',
      period: '2018 - 2020',
      description: 'Developed responsive websites and web applications for 30+ clients across various industries.',
      skills: ['JavaScript', 'React', 'CSS', 'PHP'],
    },
  ]

  const education = [
    {
      degree: 'M.S. Computer Science',
      school: 'Stanford University',
      year: '2018',
      focus: 'Specialized in Human-Computer Interaction and AI',
    },
    {
      degree: 'B.S. Computer Science',
      school: 'UC Berkeley',
      year: '2016',
      focus: 'Dean\'s List, Graduated with Honors',
    },
  ]

  const certifications = [
    { name: 'AWS Solutions Architect Professional', issuer: 'Amazon Web Services', year: '2023' },
    { name: 'Google Cloud Professional Developer', issuer: 'Google Cloud', year: '2022' },
    { name: 'Certified Kubernetes Administrator', issuer: 'CNCF', year: '2021' },
  ]

  const skills = {
    'Frontend': ['React', 'TypeScript', 'Vue.js', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    'Backend': ['Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB', 'Redis'],
    'DevOps': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'GitHub Actions'],
    'Design': ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
  }

  return (
    <div className="portfolio">
      <section className="portfolio-header">
        <div className="container">
          <div className="header-content">
            <h1>Portfolio & Resume</h1>
            <p>
              A comprehensive overview of my professional journey, skills, and achievements.
            </p>
            <a href="/resume.pdf" className="btn btn-primary">
              <Download size={18} /> Download Resume
            </a>
          </div>
        </div>
      </section>

      <section className="experience-section">
        <div className="container">
          <div className="section-header">
            <Briefcase size={24} />
            <h2>Work Experience</h2>
          </div>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{exp.title}</h3>
                    <span className="period">{exp.period}</span>
                  </div>
                  <p className="company">{exp.company}</p>
                  <p className="description">{exp.description}</p>
                  <div className="skill-tags">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="education-section">
        <div className="container">
          <div className="section-header">
            <GraduationCap size={24} />
            <h2>Education</h2>
          </div>
          <div className="education-grid">
            {education.map((edu, index) => (
              <div key={index} className="education-card">
                <div className="education-year">{edu.year}</div>
                <h3>{edu.degree}</h3>
                <p className="school">{edu.school}</p>
                <p className="focus">{edu.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="certifications-section">
        <div className="container">
          <div className="section-header">
            <Award size={24} />
            <h2>Certifications</h2>
          </div>
          <div className="cert-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="cert-card">
                <div className="cert-icon">
                  <Award size={24} />
                </div>
                <div className="cert-info">
                  <h3>{cert.name}</h3>
                  <p>{cert.issuer} &bull; {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section">
        <div className="container">
          <h2>Technical Skills</h2>
          <div className="skills-container">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="skill-category">
                <h3>{category}</h3>
                <ul className="skill-list">
                  {items.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
