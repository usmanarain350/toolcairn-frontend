<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <BreadCrumb />
    <section class="mb-10">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Free Online PDF Tools</h1>
      <p class="text-lg text-gray-500 max-w-2xl">
        Compress, merge, split, convert and protect PDF files online. No signup required. Fast, free and secure.
      </p>
    </section>

    <section aria-label="PDF tools">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ToolCard v-for="tool in tools" :key="tool.path" :tool="tool" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Free Online PDF Tools',
  description: 'Compress, merge, split and convert PDF files online for free. No signup required. Works in your browser.',
  ogTitle: 'Free Online PDF Tools',
  ogDescription: 'Compress, merge, split and convert PDF files online for free. No signup required.',
  ogUrl: 'https://toolcairn.com/tools/pdf',
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://toolcairn.com/tools/pdf' }],
})

const tools = computed(() => [
  { name: t('tools.pdfCompressor.name'), description: t('tools.pdfCompressor.description'), icon: '📄', path: '/tools/pdf/compress', category: 'PDF' },
  { name: t('tools.mergePdf.name'), description: t('tools.mergePdf.description'), icon: '📎', path: '/tools/pdf/merge', category: 'PDF' },
  { name: t('tools.splitPdf.name'), description: t('tools.splitPdf.description'), icon: '✂️', path: '/tools/pdf/split', category: 'PDF' },
  { name: t('tools.protectPdf.name'), description: t('tools.protectPdf.description'), icon: '🔒', path: '/tools/pdf/protect', category: 'PDF' },
  { name: t('tools.pdfToJpg.name'), description: t('tools.pdfToJpg.description'), icon: '🖼️', path: '/tools/pdf/to-jpg', category: 'PDF' },
  { name: t('tools.pdfToPng.name'), description: t('tools.pdfToPng.description'), icon: '🖼️', path: '/tools/pdf/to-png', category: 'PDF' },
])
</script>
