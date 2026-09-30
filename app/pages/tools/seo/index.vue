<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <BreadCrumb />
    <section class="mb-10">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Free Online SEO Tools</h1>
      <p class="text-lg text-gray-500 max-w-2xl">
        Meta tag generators, slug builders and more. No signup required. Works in your browser.
      </p>
    </section>

    <section class="mb-10 text-gray-600 leading-relaxed max-w-3xl">
      <h2 class="text-2xl font-bold text-gray-900 mb-3">A Handful of SEO Tools, No Heavy Lifting</h2>
      <p class="mb-4">
        Search engine optimization comes down to a lot of small, repetitive tasks. Toolcairn's SEO tools
        handle the fiddly ones for you. Generate optimized meta tags with correct title and description
        lengths, and build clean, search-friendly URL slugs from any headline — all with live previews and
        copy-ready output.
      </p>
      <p>
        Both tools follow current best practices, run entirely in your browser, and are free to use with no
        signup and no usage limits.
      </p>
    </section>

    <section aria-label="SEO tools">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ToolCard v-for="tool in tools" :key="tool.path" :tool="tool" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Free Online SEO Tools',
  description: 'Meta tag generators, slug builders and more SEO helpers online for free. No signup required.',
  ogTitle: 'Free Online SEO Tools',
  ogDescription: 'Meta tag generators, slug builders and more SEO helpers online for free.',
  ogUrl: 'https://toolcairn.com/tools/seo',
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://toolcairn.com/tools/seo' }],
})

const tools = computed(() => [
  { name: t('tools.metaTagGenerator.name'), description: t('tools.metaTagGenerator.description'), icon: '🏷️', path: '/tools/seo/meta-tag-generator', category: 'SEO' },
  { name: t('tools.slugGenerator.name'), description: t('tools.slugGenerator.description'), icon: '🔗', path: '/tools/seo/slug-generator', category: 'SEO' },
])
</script>
