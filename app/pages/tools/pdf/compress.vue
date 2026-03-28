<template>
  <div>
    <NuxtLayout name="tool">
      <ToolLayout>
        <template #title>{{ $t('tools.pdfCompressor.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.pdfCompressor.pageSubtitle') }}</template>

        <!-- Step 1: Upload -->
        <div v-if="step === 'upload'">
          <FileDropZone
            accept=".pdf"
            accept-label="PDF"
            :max-size-m-b="50"
            @selected="onFileSelected"
            @removed="onFileRemoved"
          />

          <!-- Compression Level -->
          <div v-if="selectedFile" class="mt-6">
            <h3 class="text-sm font-semibold text-gray-700 mb-3">{{ $t('tools.pdfCompressor.compressionLevel') }}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                v-for="level in compressionLevels"
                :key="level.value"
                class="relative border-2 rounded-xl p-4 text-left transition"
                :class="selectedLevel === level.value
                  ? 'border-orange-400 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'"
                @click="selectedLevel = level.value"
              >
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-lg">{{ level.icon }}</span>
                  <span class="font-semibold text-gray-900">{{ level.label }}</span>
                </div>
                <p class="text-xs text-gray-500">{{ level.description }}</p>
                <span
                  v-if="level.value === 'medium'"
                  class="absolute -top-2 right-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
                >
                  {{ $t('tools.pdfCompressor.recommended') }}
                </span>
              </button>
            </div>

            <!-- Compress Button -->
            <button
              class="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              :disabled="isCompressing"
              @click="startCompression"
            >
              <span v-if="!isCompressing">{{ $t('tools.pdfCompressor.compressBtn') }}</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ $t('tools.pdfCompressor.compressing') }}
              </span>
            </button>
            <p v-if="isCompressing" class="text-center text-sm text-gray-400 mt-2">{{ $t('tools.pdfCompressor.waitTime') }}</p>
          </div>
        </div>

        <!-- Step 2: Result -->
        <div v-if="step === 'result' && result" class="text-center">
          <!-- Success Badge -->
          <div class="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-6">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">{{ $t('tools.pdfCompressor.complete') }}</span>
          </div>

          <!-- Size Comparison -->
          <div class="flex items-center justify-center gap-4 md:gap-8 mb-6">
            <div class="text-center">
              <p class="text-sm text-gray-500 mb-1">{{ $t('tools.pdfCompressor.before') }}</p>
              <p class="text-xl font-bold text-gray-400">{{ formatSize(result.original_size) }}</p>
            </div>
            <div class="text-3xl text-orange-500">→</div>
            <div class="text-center">
              <p class="text-sm text-gray-500 mb-1">{{ $t('tools.pdfCompressor.after') }}</p>
              <p class="text-xl font-bold text-gray-900">{{ formatSize(result.compressed_size) }}</p>
            </div>
          </div>

          <!-- Reduction Percentage -->
          <div class="bg-orange-50 rounded-xl p-6 mb-6 inline-block">
            <p class="text-4xl font-bold text-orange-500">{{ result.reduction_percent }}%</p>
            <p class="text-sm text-orange-600 mt-1">{{ $t('tools.pdfCompressor.fileSizeReduced') }}</p>
          </div>

          <!-- Download Button -->
          <div class="space-y-3">
            <a
              :href="downloadUrl"
              class="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition text-lg text-center"
              download
            >
              {{ $t('tools.pdfCompressor.downloadBtn') }}
            </a>
            <button
              class="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-xl transition"
              @click="resetTool"
            >
              {{ $t('tools.pdfCompressor.compressAnother') }}
            </button>
          </div>
        </div>

        <!-- Error -->
        <div v-if="errorMessage" class="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {{ errorMessage }}
        </div>

        <!-- SEO Content -->
        <template #seo>
          <h2>{{ $t('tools.pdfCompressor.howToTitle') }}</h2>
          <ol>
            <li>{{ $t('tools.pdfCompressor.howToStep1') }}</li>
            <li>{{ $t('tools.pdfCompressor.howToStep2') }}</li>
            <li>{{ $t('tools.pdfCompressor.howToStep3') }}</li>
          </ol>

          <h2>{{ $t('tools.pdfCompressor.whyTitle') }}</h2>
          <ul>
            <li>{{ $t('tools.pdfCompressor.whyFree') }}</li>
            <li>{{ $t('tools.pdfCompressor.whyNoSignup') }}</li>
            <li>{{ $t('tools.pdfCompressor.whyFast') }}</li>
            <li>{{ $t('tools.pdfCompressor.whySecure') }}</li>
            <li>{{ $t('tools.pdfCompressor.whyQuality') }}</li>
          </ul>

          <h2>{{ $t('tools.pdfCompressor.faqTitle') }}</h2>

          <h3>{{ $t('tools.pdfCompressor.faqFreeQ') }}</h3>
          <p>{{ $t('tools.pdfCompressor.faqFreeA') }}</p>

          <h3>{{ $t('tools.pdfCompressor.faqSafeQ') }}</h3>
          <p>{{ $t('tools.pdfCompressor.faqSafeA') }}</p>

          <h3>{{ $t('tools.pdfCompressor.faqSizeQ') }}</h3>
          <p>{{ $t('tools.pdfCompressor.faqSizeA') }}</p>

          <h3>{{ $t('tools.pdfCompressor.faqQualityQ') }}</h3>
          <p>{{ $t('tools.pdfCompressor.faqQualityA') }}</p>

          <h3>{{ $t('tools.pdfCompressor.faqBatchQ') }}</h3>
          <p>{{ $t('tools.pdfCompressor.faqBatchA') }}</p>
        </template>

        <!-- Related Tools -->
        <template #related>
          <ToolCard :tool="{ name: $t('tools.pdfToWord.name'), description: $t('tools.pdfToWord.description'), icon: '📝', path: '/tools/pdf/to-word', category: 'PDF' }" />
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
  title: t('tools.pdfCompressor.seoTitle'),
  description: t('tools.pdfCompressor.seoDescription'),
  ogTitle: t('tools.pdfCompressor.seoTitle'),
  ogDescription: t('tools.pdfCompressor.pageSubtitle'),
})

useSchemaOrg([
  defineSoftwareApplication({
    name: 'ToolFlare PDF Compressor',
    operatingSystem: 'Web',
    applicationCategory: 'UtilitiesApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const { uploadPdf, compressPdf, getDownloadUrl } = useToolApi()

const step = ref<'upload' | 'result'>('upload')
const selectedFile = ref<File | null>(null)
const selectedLevel = ref<'low' | 'medium' | 'high'>('medium')
const isCompressing = ref(false)
const errorMessage = ref('')
const downloadUrl = ref('')

const result = ref<{
  original_size: number
  compressed_size: number
  reduction_percent: number
} | null>(null)

const compressionLevels = computed(() => [
  {
    value: 'low' as const,
    label: t('tools.pdfCompressor.levelLow'),
    icon: '🟢',
    description: t('tools.pdfCompressor.levelLowDesc'),
  },
  {
    value: 'medium' as const,
    label: t('tools.pdfCompressor.levelMedium'),
    icon: '🟡',
    description: t('tools.pdfCompressor.levelMediumDesc'),
  },
  {
    value: 'high' as const,
    label: t('tools.pdfCompressor.levelHigh'),
    icon: '🔴',
    description: t('tools.pdfCompressor.levelHighDesc'),
  },
])

function onFileSelected(file: File) {
  selectedFile.value = file
  errorMessage.value = ''
}

function onFileRemoved() {
  selectedFile.value = null
  errorMessage.value = ''
}

async function startCompression() {
  if (!selectedFile.value) return

  isCompressing.value = true
  errorMessage.value = ''

  try {
    // Step 1: Upload
    const uploadResult = await uploadPdf(selectedFile.value)

    // Step 2: Compress
    const compressResult = await compressPdf(uploadResult.file_id, selectedLevel.value)

    // Step 3: Show result
    result.value = {
      original_size: compressResult.original_size,
      compressed_size: compressResult.compressed_size,
      reduction_percent: compressResult.reduction_percent,
    }
    downloadUrl.value = getDownloadUrl(compressResult.compressed_file_id)
    step.value = 'result'
  } catch (e: any) {
    if (e?.data?.message) {
      errorMessage.value = e.data.message
    } else if (e?.message) {
      errorMessage.value = e.message
    } else {
      errorMessage.value = t('common.error')
    }
  } finally {
    isCompressing.value = false
  }
}

function resetTool() {
  step.value = 'upload'
  selectedFile.value = null
  selectedLevel.value = 'medium'
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
