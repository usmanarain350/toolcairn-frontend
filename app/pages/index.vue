<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <!-- Hero -->
    <section class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {{ $t('home.title', { highlight: '' }) }}<span class="text-orange-500">{{ $t('home.titleHighlight') }}</span>
      </h1>
      <p class="text-lg text-gray-500 max-w-2xl mx-auto">
        {{ $t('home.subtitle') }}
      </p>
    </section>

    <!-- Tool Grid -->
    <section v-for="category in categories" :key="category.name" class="mb-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">{{ category.name }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ToolCard v-for="tool in category.tools" :key="tool.path" :tool="tool" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: `${t('site.name')} — ${t('site.tagline')}`,
  description: t('site.description'),
  ogTitle: `${t('site.name')} — ${t('site.tagline')}`,
  ogDescription: t('home.subtitle'),
})

const categories = computed(() => [
  {
    name: t('home.categoryPdf'),
    tools: [
      { name: t('tools.pdfCompressor.name'), description: t('tools.pdfCompressor.description'), icon: '📄', path: '/tools/pdf/compress', category: 'PDF' },
    ],
  },
  {
    name: t('home.categoryUtility'),
    tools: [
      { name: t('tools.qrCode.name'), description: t('tools.qrCode.description'), icon: '📱', path: '/tools/utility/qr-code', category: 'Utility' },
      { name: t('tools.passwordGenerator.name'), description: t('tools.passwordGenerator.description'), icon: '🔑', path: '/tools/utility/password-generator', category: 'Utility' },
    ],
  },
  {
    name: t('home.categoryDeveloper'),
    tools: [
      { name: t('tools.jsonFormatter.name'), description: t('tools.jsonFormatter.description'), icon: '{ }', path: '/tools/developer/json-formatter', category: 'Developer' },
      { name: t('tools.base64.name'), description: t('tools.base64.description'), icon: '🔤', path: '/tools/developer/base64', category: 'Developer' },
    ],
  },
  {
    name: t('home.categoryText'),
    tools: [
      { name: t('tools.wordCounter.name'), description: t('tools.wordCounter.description'), icon: '📝', path: '/tools/text/word-counter', category: 'Text' },
    ],
  },
  {
    name: t('home.categorySeo'),
    tools: [
      { name: t('tools.metaTagGenerator.name'), description: t('tools.metaTagGenerator.description'), icon: '🏷️', path: '/tools/seo/meta-tag-generator', category: 'SEO' },
      { name: t('tools.slugGenerator.name'), description: t('tools.slugGenerator.description'), icon: '🔗', path: '/tools/seo/slug-generator', category: 'SEO' },
    ],
  },
])
</script>
