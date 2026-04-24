interface ToolFaq {
  question: string
  answer: string
}

interface ToolSeoOptions {
  name: string
  description: string
  path: string
  faqs?: ToolFaq[]
}

export function useToolSeo(options: ToolSeoOptions) {
  const siteUrl = 'https://toolcairn.com'
  const url = `${siteUrl}${options.path}`
  const title = `${options.name} – Free Online Tool`

  useSeoMeta({
    title,
    description: options.description,
    ogTitle: title,
    ogDescription: options.description,
    ogUrl: url,
    ogType: 'website',
    twitterTitle: title,
    twitterDescription: options.description,
  })

  const scripts: Array<{ type: string, innerHTML: string }> = [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description: options.description,
        url,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Toolcairn',
          url: `${siteUrl}/`,
        },
      }),
    },
  ]

  if (options.faqs && options.faqs.length > 0) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: options.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }),
    })
  }

  useHead({
    link: [{ rel: 'canonical', href: url }],
    script: scripts,
  })
}
