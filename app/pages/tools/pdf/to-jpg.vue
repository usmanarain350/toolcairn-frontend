<template>
  <div>
    <NuxtLayout name="tool">
      <ToolLayout>
        <template #title>{{ $t('tools.pdfToJpg.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.pdfToJpg.pageSubtitle') }}</template>

        <!-- Step 1: Upload -->
        <div v-if="step === 'upload'">
          <FileDropZone
            accept=".pdf"
            accept-label="PDF"
            :max-size-m-b="50"
            @selected="onFileSelected"
            @removed="onFileRemoved"
          />

          <div v-if="selectedFile" class="mt-6">
            <!-- Format -->
            <div class="mb-4">
              <h3 class="text-sm font-semibold text-gray-700 mb-2">{{ $t('tools.pdfToJpg.outputFormat') }}</h3>
              <div class="flex gap-3">
                <button
                  v-for="fmt in ['jpg', 'png']"
                  :key="fmt"
                  class="px-6 py-2 rounded-lg border-2 text-sm font-medium transition uppercase"
                  :class="format === fmt ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                  @click="format = fmt as 'jpg' | 'png'"
                >
                  {{ fmt }}
                </button>
              </div>
            </div>

            <!-- DPI -->
            <div class="mb-6">
              <h3 class="text-sm font-semibold text-gray-700 mb-2">{{ $t('tools.pdfToJpg.quality') }} ({{ dpi }} DPI)</h3>
              <div class="flex gap-3">
                <button
                  v-for="opt in dpiOptions"
                  :key="opt.value"
                  class="flex-1 px-4 py-2 rounded-lg border-2 text-sm font-medium transition text-center"
                  :class="dpi === opt.value ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                  @click="dpi = opt.value"
                >
                  {{ opt.label }}
                </button>
              </div>
            </div>

            <button
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              :disabled="isConverting"
              @click="startConversion"
            >
              <span v-if="!isConverting">{{ $t('tools.pdfToJpg.convertBtn', { format: format.toUpperCase() }) }}</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ $t('tools.pdfToJpg.converting') }}
              </span>
            </button>
          </div>
        </div>

        <!-- Step 2: Result -->
        <div v-if="step === 'result' && result" class="text-center">
          <div class="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-6">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">{{ $t('tools.pdfToJpg.complete') }}</span>
          </div>

          <div class="bg-gray-50 rounded-xl p-6 mb-6">
            <p class="text-lg font-semibold text-gray-900">{{ $t('tools.pdfToJpg.pagesConverted', { count: result.page_count }) }}</p>
            <p class="text-sm text-gray-500 mt-1">
              {{ result.type === 'zip' ? $t('tools.pdfToJpg.zipInfo') : $t('tools.pdfToJpg.singleInfo') }}
              — {{ formatSize(result.size) }}
            </p>
          </div>

          <div class="space-y-3">
            <a
              :href="downloadUrl"
              class="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition text-lg text-center"
              download
            >
              {{ $t('tools.pdfToJpg.downloadBtn', { type: result.type === 'zip' ? 'ZIP' : format.toUpperCase() }) }}
            </a>
            <button
              class="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-xl transition"
              @click="resetTool"
            >
              {{ $t('tools.pdfToJpg.convertAnother') }}
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {{ errorMessage }}
        </div>

        <template #seo>
          <h2>How to Convert PDF to JPG</h2>
          <ol>
            <li><strong>Upload your PDF</strong> — Drag and drop or click to browse (max 50MB).</li>
            <li><strong>Choose settings</strong> — Select output format (JPG or PNG) and quality (DPI).</li>
            <li><strong>Download</strong> — Each page becomes a separate image. Multi-page PDFs download as ZIP.</li>
          </ol>

          <h2>Why Use ToolFlare PDF to JPG?</h2>
          <ul>
            <li><strong>High quality</strong> — Up to 300 DPI for crisp, sharp images.</li>
            <li><strong>JPG or PNG</strong> — Choose the format that works best for you.</li>
            <li><strong>All pages converted</strong> — Every page becomes a separate image.</li>
            <li><strong>Free & secure</strong> — No signup, files auto-deleted after 1 hour.</li>
          </ul>

          <h2>FAQ</h2>
          <h3>What DPI should I use?</h3>
          <p>72 DPI for web/screen, 150 DPI for general use, 300 DPI for print quality.</p>
          <h3>What happens with multi-page PDFs?</h3>
          <p>Each page is converted to a separate image. If your PDF has multiple pages, you'll download a ZIP file containing all images.</p>
        </template>

        <template #related>
          <ToolCard :tool="{ name: $t('tools.pdfCompressor.name'), description: $t('tools.pdfCompressor.description'), icon: '📄', path: '/tools/pdf/compress', category: 'PDF' }" />
          <ToolCard :tool="{ name: $t('tools.mergePdf.name'), description: $t('tools.mergePdf.description'), icon: '📎', path: '/tools/pdf/merge', category: 'PDF' }" />
          <ToolCard :tool="{ name: $t('tools.imageCompressor.name'), description: $t('tools.imageCompressor.description'), icon: '🖼️', path: '/tools/image/compress', category: 'Image' }" />
        </template>
      </ToolLayout>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('tools.pdfToJpg.seoTitle'),
  description: t('tools.pdfToJpg.seoDescription'),
  ogTitle: t('tools.pdfToJpg.seoTitle'),
  ogDescription: t('tools.pdfToJpg.pageSubtitle'),
})

useSchemaOrg([
  defineSoftwareApplication({
    name: 'ToolFlare PDF to JPG Converter',
    operatingSystem: 'Web',
    applicationCategory: 'UtilitiesApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const { convertPdfToImage, getConvertDownloadUrl } = useToolApi()

const step = ref<'upload' | 'result'>('upload')
const selectedFile = ref<File | null>(null)
const format = ref<'jpg' | 'png'>('jpg')
const dpi = ref(150)
const isConverting = ref(false)
const errorMessage = ref('')
const downloadUrl = ref('')
const result = ref<{ page_count: number; type: string; size: number } | null>(null)

const dpiOptions = computed(() => [
  { value: 72, label: t('tools.pdfToJpg.dpiWeb') },
  { value: 150, label: t('tools.pdfToJpg.dpiStandard') },
  { value: 300, label: t('tools.pdfToJpg.dpiPrint') },
])

function onFileSelected(file: File) {
  selectedFile.value = file
  errorMessage.value = ''
}

function onFileRemoved() {
  selectedFile.value = null
  errorMessage.value = ''
}

async function startConversion() {
  if (!selectedFile.value) return
  isConverting.value = true
  errorMessage.value = ''

  try {
    const convertResult = await convertPdfToImage(selectedFile.value, format.value, dpi.value)
    result.value = {
      page_count: convertResult.page_count,
      type: convertResult.type,
      size: convertResult.size,
    }
    downloadUrl.value = getConvertDownloadUrl(convertResult.convert_id)
    step.value = 'result'
  } catch (e: any) {
    errorMessage.value = e?.data?.message || e?.message || t('common.error')
  } finally {
    isConverting.value = false
  }
}

function resetTool() {
  step.value = 'upload'
  selectedFile.value = null
  format.value = 'jpg'
  dpi.value = 150
  result.value = null
  downloadUrl.value = ''
  errorMessage.value = ''
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
</script>
