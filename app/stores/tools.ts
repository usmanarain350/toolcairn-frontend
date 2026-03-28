import { defineStore } from 'pinia'

interface Tool {
  name: string
  slug: string
  category: string
  description: string
  icon: string
  path: string
  isActive: boolean
  requiresBackend: boolean
}

export const useToolsStore = defineStore('tools', () => {
  const tools = ref<Tool[]>([
    { name: 'PDF Compressor', slug: 'compress', category: 'pdf', description: 'Reduce PDF file size without losing quality', icon: '📄', path: '/tools/pdf/compress', isActive: true, requiresBackend: true },
    { name: 'QR Code Generator', slug: 'qr-code', category: 'utility', description: 'Generate QR codes for any URL or text', icon: '📱', path: '/tools/utility/qr-code', isActive: true, requiresBackend: false },
    { name: 'Password Generator', slug: 'password-generator', category: 'utility', description: 'Create strong, secure passwords', icon: '🔑', path: '/tools/utility/password-generator', isActive: true, requiresBackend: false },
    { name: 'JSON Formatter', slug: 'json-formatter', category: 'developer', description: 'Format and validate JSON data', icon: '{ }', path: '/tools/developer/json-formatter', isActive: true, requiresBackend: false },
    { name: 'Word Counter', slug: 'word-counter', category: 'text', description: 'Count words, characters, and sentences', icon: '📝', path: '/tools/text/word-counter', isActive: true, requiresBackend: false },
    { name: 'Base64 Encoder/Decoder', slug: 'base64', category: 'developer', description: 'Encode and decode Base64 strings', icon: '🔤', path: '/tools/developer/base64', isActive: true, requiresBackend: false },
    { name: 'Meta Tag Generator', slug: 'meta-tag-generator', category: 'seo', description: 'Generate SEO meta tags for your website', icon: '🏷️', path: '/tools/seo/meta-tag-generator', isActive: true, requiresBackend: false },
    { name: 'URL Slug Generator', slug: 'slug-generator', category: 'seo', description: 'Convert text to URL-friendly slugs', icon: '🔗', path: '/tools/seo/slug-generator', isActive: true, requiresBackend: false },
  ])

  const getByCategory = (category: string) =>
    tools.value.filter(t => t.category === category && t.isActive)

  const getBySlug = (slug: string) =>
    tools.value.find(t => t.slug === slug)

  return { tools, getByCategory, getBySlug }
})
