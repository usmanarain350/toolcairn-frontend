<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <BreadCrumb />
    <section class="mb-10">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Free Online Image Tools</h1>
      <p class="text-lg text-gray-500 max-w-2xl">
        Compress images, convert to PDF and more. No signup required. Works in your browser.
      </p>
    </section>

    <section aria-label="Image tools">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ToolCard v-for="tool in tools" :key="tool.path" :tool="tool" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Free Online Image Tools',
  description: 'Compress images and convert images to PDF online for free. No signup required. Works in your browser.',
  ogTitle: 'Free Online Image Tools',
  ogDescription: 'Compress images and convert images to PDF online for free. No signup required.',
  ogUrl: 'https://toolcairn.com/tools/image',
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://toolcairn.com/tools/image' }],
})

const tools = computed(() => [
  { name: t('tools.imageCompressor.name'), description: t('tools.imageCompressor.description'), icon: '🖼️', path: '/tools/image/compress', category: 'Image' },
  { name: t('tools.imageToPdf.name'), description: t('tools.imageToPdf.description'), icon: '📄', path: '/tools/image/to-pdf', category: 'Image' },
])
</script>
