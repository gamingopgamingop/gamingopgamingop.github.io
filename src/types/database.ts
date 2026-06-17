export interface Project {
  id: string
  title: string
  slug: string
  description: string
  long_description: string | null
  image_url: string | null
  demo_url: string | null
  github_url: string | null
  tags: string[]
  featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image_url: string | null
  author: string
  author_avatar_url: string | null
  published: boolean
  published_at: string | null
  tags: string[]
  reading_time_min: number
  created_at: string
  updated_at: string
}
