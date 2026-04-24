<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <!-- Hero -->
    <section class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {{ $t('home.title', { highlight: '' }) }}<span class="text-orange-600">{{ $t('home.titleHighlight') }}</span>
      </h1>
      <p class="text-lg text-gray-500 max-w-2xl mx-auto">
        {{ $t('home.subtitle') }}
      </p>
    </section>

    <!-- Tool Grid -->
    <section v-for="category in categories" :key="category.name" class="mb-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">
        <NuxtLink v-if="category.hubPath" :to="category.hubPath" class="hover:text-orange-600 transition">
          {{ category.name }}
        </NuxtLink>
        <span v-else>{{ category.name }}</span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ToolCard v-for="tool in category.tools" :key="tool.path" :tool="tool" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

useSeoMeta({
  title: `${t('site.name')} — ${t('site.tagline')}`,
  description: t('site.description'),
  ogTitle: `${t('site.name')} — ${t('site.tagline')}`,
  ogDescription: t('home.subtitle'),
})

useHead({
  link: [
    { rel: 'canonical', href: `https://toolcairn.com${route.path === '/' ? '/' : route.path}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Toolcairn',
        url: 'https://toolcairn.com/',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://toolcairn.com/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Toolcairn',
        url: 'https://toolcairn.com/',
        logo: 'https://toolcairn.com/logo.png',
      }),
    },
  ],
})

const categories = computed(() => [
  {
    name: t('home.categoryPdf'),
    hubPath: '/tools/pdf',
    tools: [
      { name: t('tools.pdfCompressor.name'), description: t('tools.pdfCompressor.description'), icon: '📄', path: '/tools/pdf/compress', category: 'PDF' },
      { name: t('tools.mergePdf.name'), description: t('tools.mergePdf.description'), icon: '📎', path: '/tools/pdf/merge', category: 'PDF' },
      { name: t('tools.pdfToJpg.name'), description: t('tools.pdfToJpg.description'), icon: '🖼️', path: '/tools/pdf/to-jpg', category: 'PDF' },
      { name: t('tools.pdfToPng.name'), description: t('tools.pdfToPng.description'), icon: '🖼️', path: '/tools/pdf/to-png', category: 'PDF' },
      { name: t('tools.splitPdf.name'), description: t('tools.splitPdf.description'), icon: '✂️', path: '/tools/pdf/split', category: 'PDF' },
      { name: t('tools.protectPdf.name'), description: t('tools.protectPdf.description'), icon: '🔒', path: '/tools/pdf/protect', category: 'PDF' },
    ],
  },
  {
    name: t('home.categoryImage'),
    hubPath: '/tools/image',
    tools: [
      { name: t('tools.imageCompressor.name'), description: t('tools.imageCompressor.description'), icon: '🖼️', path: '/tools/image/compress', category: 'Image' },
      { name: t('tools.imageToPdf.name'), description: t('tools.imageToPdf.description'), icon: '📄', path: '/tools/image/to-pdf', category: 'Image' },
    ],
  },
  {
    name: t('home.categoryUtility'),
    hubPath: null,
    tools: [
      { name: t('tools.qrCode.name'), description: t('tools.qrCode.description'), icon: '📱', path: '/tools/utility/qr-code', category: 'Utility' },
      { name: t('tools.passwordGenerator.name'), description: t('tools.passwordGenerator.description'), icon: '🔑', path: '/tools/utility/password-generator', category: 'Utility' },
    ],
  },
  {
    name: t('home.categoryDeveloper'),
    hubPath: null,
    tools: [
      { name: t('tools.jsonFormatter.name'), description: t('tools.jsonFormatter.description'), icon: '{ }', path: '/tools/developer/json-formatter', category: 'Developer' },
      { name: t('tools.base64.name'), description: t('tools.base64.description'), icon: '🔤', path: '/tools/developer/base64', category: 'Developer' },
    ],
  },
  {
    name: t('home.categoryText'),
    hubPath: null,
    tools: [
      { name: t('tools.wordCounter.name'), description: t('tools.wordCounter.description'), icon: '📝', path: '/tools/text/word-counter', category: 'Text' },
    ],
  },
  {
    name: t('home.categorySeo'),
    hubPath: '/tools/seo',
    tools: [
      { name: t('tools.metaTagGenerator.name'), description: t('tools.metaTagGenerator.description'), icon: '🏷️', path: '/tools/seo/meta-tag-generator', category: 'SEO' },
      { name: t('tools.slugGenerator.name'), description: t('tools.slugGenerator.description'), icon: '🔗', path: '/tools/seo/slug-generator', category: 'SEO' },
    ],
  },
  {
    name: t('home.categoryWord'),
    tools: [
      { name: t('tools.wordToPdf.name'), description: t('tools.wordToPdf.description'), icon: '📝', path: '/tools/word/to-pdf', category: 'Word' },
    ],
  },
])
</script>
