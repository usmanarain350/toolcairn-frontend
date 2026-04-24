<template>
  <nav class="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
    <ol class="flex items-center gap-1.5 flex-wrap">
      <li>
        <NuxtLink to="/" class="hover:text-orange-600 transition">{{ $t('nav.home') }}</NuxtLink>
      </li>
      <li v-for="(crumb, index) in crumbs" :key="crumb.path" class="flex items-center gap-1.5">
        <span class="text-gray-300">/</span>
        <NuxtLink
          v-if="index < crumbs.length - 1"
          :to="crumb.path"
          class="hover:text-orange-600 transition"
        >
          {{ crumb.label }}
        </NuxtLink>
        <span v-else class="text-gray-700 font-medium">{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()

const SEGMENT_LABELS: Record<string, string> = {
  tools: '',
  pdf: 'PDF Tools',
  image: 'Image Tools',
  seo: 'SEO Tools',
  developer: 'Developer Tools',
  utility: 'Utility Tools',
  text: 'Text Tools',
  word: 'Word Tools',
  blog: 'Blog',
  about: 'About',
}

function labelFor(segment: string): string {
  if (SEGMENT_LABELS[segment] !== undefined) return SEGMENT_LABELS[segment]
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

const crumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments
    .map((segment, index) => {
      const label = labelFor(segment)
      return {
        label,
        path: '/' + segments.slice(0, index + 1).join('/'),
        hidden: label === '',
      }
    })
    .filter(c => !c.hidden)
})

const siteUrl = 'https://toolcairn.com'

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('nav.home'),
            item: `${siteUrl}/`,
          },
          ...crumbs.value.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 2,
            name: c.label,
            item: `${siteUrl}${c.path}`,
          })),
        ],
      })),
    },
  ],
})
</script>
