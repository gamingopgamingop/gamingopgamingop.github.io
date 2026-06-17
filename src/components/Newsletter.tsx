import { useState } from 'react'
import { Mail, CircleCheck as CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import './Newsletter.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])

    setLoading(false)

    if (error) {
      if (error.code === '23505') {
        setError('This email is already subscribed!')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } else {
      setSuccess(true)
    }
  }

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          {success ? (
            <div className="newsletter-success">
              <CheckCircle size={48} />
              <h3>You're Subscribed!</h3>
              <p>Thanks for subscribing. You'll hear from me soon.</p>
            </div>
          ) : (
            <>
              <h2>Stay Updated</h2>
              <p>
                Get notified when I publish new articles and projects.
                No spam, just quality content delivered to your inbox.
              </p>
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="input-group">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
                {error && <p className="error-message">{error}</p>}
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
