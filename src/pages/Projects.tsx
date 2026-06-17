import { useEffect, useState } from 'react'
import { ExternalLink, Github, Folder } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Project } from '../types/database'
import Newsletter from '../components/Newsletter'
import './Projects.css'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })

    if (!error && data) {
      setProjects(data)
    }
    setLoading(false)
  }

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort()

  const filteredProjects = filter
    ? projects.filter(p => p.tags.includes(filter))
    : projects

  return (
    <div className="projects-page">
      <section className="projects-header">
        <div className="container">
          <h1>Projects</h1>
          <p>
            A collection of my work spanning web applications, mobile apps, and everything in between.
          </p>
        </div>
      </section>

      <section className="projects-content">
        <div className="container">
          <div className="filter-bar">
            <button
              className={`filter-btn ${!filter ? 'active' : ''}`}
              onClick={() => setFilter(null)}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`filter-btn ${filter === tag ? 'active' : ''}`}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-state">
              <Folder className="loading-icon" size={48} />
              <p>Loading projects...</p>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map(project => (
                <article key={project.id} className="project-card">
                  <div className="project-image">
                    {project.image_url ? (
                      <img src={project.image_url} alt={project.title} />
                    ) : (
                      <div className="project-image-placeholder">
                        <Folder size={48} />
                      </div>
                    )}
                    {project.featured && (
                      <span className="featured-badge">Featured</span>
                    )}
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map(tag => (
                        <span key={tag} className="tag" onClick={() => setFilter(tag)}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="project-link">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link">
                          <Github size={16} /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
