import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, User, ArrowLeft, Share2, Linkedin, Twitter } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { BlogPost } from '../types/database'
import './BlogPost.css'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchPost(slug)
    }
  }, [slug])

  async function fetchPost(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (!error && data) {
      setPost(data)
    }
    setLoading(false)
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="loading-state">Loading article...</div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="not-found">
            <h1>Article Not Found</h1>
            <p>The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog" className="btn btn-primary">
              <ArrowLeft size={18} /> Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <article className="blog-post-page">
      <header className="post-header">
        <div className="container">
          <Link to="/blog" className="back-link">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <div className="author">
              {post.author_avatar_url && (
                <img src={post.author_avatar_url} alt={post.author} className="author-avatar" />
              )}
              <div className="author-details">
                <span className="author-name">{post.author}</span>
                <div className="post-info">
                  <time>{formatDate(post.published_at!)}</time>
                  <span className="dot">&middot;</span>
                  <Clock size={14} />
                  <span>{post.reading_time_min} min read</span>
                </div>
              </div>
            </div>
            <div className="share-buttons">
              <span>Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn"
              >
                <Twitter size={18} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn"
              >
                <Linkedin size={18} />
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="share-btn"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {post.cover_image_url && (
        <div className="post-cover">
          <img src={post.cover_image_url} alt={post.title} />
        </div>
      )}

      <div className="container">
        <div className="post-content-wrapper">
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/#{1,6}\s([^\n]+)/g, '<h2>$1</h2>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') }}
          />
          <aside className="post-sidebar">
            <div className="sidebar-card">
              <h3>About the Author</h3>
              <div className="author-bio">
                {post.author_avatar_url && (
                  <img src={post.author_avatar_url} alt={post.author} className="bio-avatar" />
                )}
                <div>
                  <p className="bio-name">{post.author}</p>
                  <p className="bio-text">Full-stack developer passionate about building great products and sharing knowledge with the community.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
