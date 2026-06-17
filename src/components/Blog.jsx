import { ArrowRight } from 'lucide-react'
import { Reveal, RevealStagger, RevealItem } from './Reveal'

const POSTS = [
  {
    id: 1,
    title: 'Building Multi-Tenant SaaS with FastAPI and PostgreSQL',
    excerpt: 'How I architected a workforce management platform that serves multiple clients from a single codebase — schema isolation, auth, and tenant routing.',
    tag: 'Backend Engineering',
    date: 'Coming Soon',
    color: 'var(--accent)',
    readTime: '8 min',
  },
  {
    id: 2,
    title: 'RAG in Production: What They Don\'t Tell You',
    excerpt: 'Lessons from deploying a retrieval-augmented generation chatbot for a real client — chunking strategies, embedding models, and latency trade-offs.',
    tag: 'AI / ML',
    date: 'Coming Soon',
    color: '#7C3AED',
    readTime: '6 min',
  },
  {
    id: 3,
    title: 'ETL Automation That Actually Saves Hours',
    excerpt: 'Breaking down the data pipeline system I built at Ethos Farm — scheduling, error handling, idempotency, and why Celery beat cron jobs for us.',
    tag: 'Data Engineering',
    date: 'Coming Soon',
    color: '#059669',
    readTime: '5 min',
  },
]

export default function Blog() {
  return (
    <section id="blog" className="section">
      <div className="container">
        <Reveal style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="section-label">Blog</span>
          <h2 className="section-title">Thoughts & <span className="gradient-text">Writing</span></h2>
          <p className="section-sub">Technical deep-dives on the things I build and learn.</p>
        </Reveal>

        <RevealStagger stagger={0.1} className="blog-grid">
          {POSTS.map(post => (
            <RevealItem key={post.id}>
              <article className="blog-card">
                <div
                  className="blog-img"
                  style={{
                    background: `linear-gradient(135deg, ${post.color}18 0%, #050C1A 100%)`,
                    borderBottom: `1px solid ${post.color}25`,
                  }}
                >
                  <span className="blog-img-tag" style={{ color: post.color, background: `${post.color}15`, border: `1px solid ${post.color}30` }}>
                    {post.tag}
                  </span>
                </div>
                <div className="blog-body">
                  <div className="blog-meta">
                    <span>{post.date}</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <span className="blog-link">
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
