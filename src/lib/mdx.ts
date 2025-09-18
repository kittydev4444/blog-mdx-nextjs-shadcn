import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt?: string
  content: string
  year: string
  order: number
}

export function getAllYears(): string[] {
  const years = fs.readdirSync(contentDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years descending

  return years
}

export function getPostsFromYear(year: string): BlogPost[] {
  const yearDirectory = path.join(contentDirectory, year)

  if (!fs.existsSync(yearDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(yearDirectory)
    .filter(name => name.endsWith('.mdx'))

  const posts = fileNames.map(fileName => {
    const fullPath = path.join(yearDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Extract order from filename (e.g., "1-my-post.mdx" -> 1)
    const orderMatch = fileName.match(/^(\d+)-/)
    const order = orderMatch ? parseInt(orderMatch[1]) : 0

    // Create slug from filename without order prefix
    const slug = fileName
      .replace(/^\d+-/, '') // Remove order prefix
      .replace(/\.mdx$/, '') // Remove extension

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || '',
      content,
      year,
      order
    }
  })

  // Sort by order number
  return posts.sort((a, b) => a.order - b.order)
}

export function getAllPosts(): BlogPost[] {
  const years = getAllYears()
  const allPosts = years.flatMap(year => getPostsFromYear(year))

  // Sort by year (desc) then by order within year
  return allPosts.sort((a, b) => {
    if (a.year !== b.year) {
      return parseInt(b.year) - parseInt(a.year)
    }
    return a.order - b.order
  })
}

export function getPostBySlug(slug: string): BlogPost | null {
  const years = getAllYears()

  for (const year of years) {
    const posts = getPostsFromYear(year)
    const post = posts.find(p => p.slug === slug)
    if (post) {
      return post
    }
  }

  return null
}

export function getAllSlugs(): string[] {
  return getAllPosts().map(post => post.slug)
}