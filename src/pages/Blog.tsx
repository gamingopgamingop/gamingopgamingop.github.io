import { useEffect, useState } from 'react'
import { Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { BlogPost } from '../types/database'
import Newsletter from '../components/Newsletter'
import './Blog.css'

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (!error && data) {
      setPosts(data)
    }
    setLoading(false)
  }

  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="blog-page">
      <section className="blog-header">
        <div className="container">
          <h1>Blog</h1>
          <p>
            Thoughts on web development, design, and building great products.
          </p>
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          {loading ? (
            <div className="loading-state">Loading posts...</div>
          ) : (
            <>
              {featuredPost && (
                <article className="featured-post">
                  <Link to={`/blog/${featuredPost.slug}`} className="featured-image">
                    {featuredPost.cover_image_url ? (
                      <img src={featuredPost.cover_image_url} alt={featuredPost.title} />
                    ) : (
                      <div className="featured-image-placeholder"></div>
                    )}
                  </Link>
                  <div className="featured-content">
                    <div className="post-meta">
                      {featuredPost.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <Link to={`/blog/${featuredPost.slug}`}>
                      <h2>{featuredPost.title}</h2>
                    </Link>
                    <p>{featuredPost.excerpt}</p>
                    <div className="post-footer">
                      <div className="author-info">
                        {featuredPost.author_avatar_url && (
                          <img src={featuredPost.author_avatar_url} alt={featuredPost.author} className="author-avatar" />
                        )}
                        <div>
                          <span className="author-name">{featuredPost.author}</span>
                          <div className="post-details">
                            <span>{formatDate(featuredPost.published_at!)}</span>
                            <span className="dot">&middot;</span>
                            <Clock size={14} />
                            <span>{featuredPost.reading_time_min} min read</span>
                          </div>
                        </div>
                      </div>
                      <Link to={`/blog/${featuredPost.slug}`} className="read-more">
                        Read Article <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              )}

              {otherPosts.length > 0 && (
                <div className="posts-grid">
                  {otherPosts.map(post => (
                    <article key={post.id} className="post-card">
                      <Link to={`/blog/${post.slug}`} className="post-image">
                        {post.cover_image_url ? (
                          <img src={post.cover_image_url} alt={post.title} />
                        ) : (
                          <div className="post-image-placeholder"></div>
                        )}
                      </Link>
                      <div className="post-content">
                        <div className="post-meta">
                          {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                        <Link to={`/blog/${post.slug}`}>
                          <h3>{post.title}</h3>
                        </Link>
                        <p>{post.excerpt}</p>
                        <div className="post-footer inline">
                          <span className="post-date">{formatDate(post.published_at!)}</span>
                          <span className="post-time">
                            <Clock size={14} /> {post.reading_time_min} min
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
