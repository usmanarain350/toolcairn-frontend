<template>
  <div>
    <NuxtLayout name="tool">
      <ToolLayout>
        <template #title>{{ $t('tools.imageCompressor.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.imageCompressor.pageSubtitle') }}</template>

        <!-- Step 1: Upload -->
        <div v-if="step === 'upload'">
          <FileDropZone
            accept=".jpg,.jpeg,.png,.webp"
            accept-label="JPG, PNG, WebP"
            :max-size-m-b="10"
            @selected="onFileSelected"
            @removed="onFileRemoved"
          />

          <div v-if="selectedFile" class="mt-6">
            <h3 class="text-sm font-semibold text-gray-700 mb-3">{{ $t('tools.imageCompressor.quality') }} ({{ quality }}%)</h3>
            <input
              v-model.number="quality"
              type="range"
              min="10"
              max="100"
              step="5"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>{{ $t('tools.imageCompressor.smallestFile') }}</span>
              <span>{{ $t('tools.imageCompressor.bestQuality') }}</span>
            </div>

            <button
              class="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              :disabled="isCompressing"
              @click="startCompression"
            >
              <span v-if="!isCompressing">{{ $t('tools.imageCompressor.compressBtn') }}</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ $t('tools.imageCompressor.compressing') }}
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
            <span class="font-medium">{{ $t('tools.imageCompressor.complete') }}</span>
          </div>

          <div class="flex items-center justify-center gap-4 md:gap-8 mb-6">
            <div class="text-center">
              <p class="text-sm text-gray-500 mb-1">{{ $t('common.before') }}</p>
              <p class="text-xl font-bold text-gray-400">{{ formatSize(result.original_size) }}</p>
            </div>
            <div class="text-3xl text-orange-500">→</div>
            <div class="text-center">
              <p class="text-sm text-gray-500 mb-1">{{ $t('common.after') }}</p>
              <p class="text-xl font-bold text-gray-900">{{ formatSize(result.compressed_size) }}</p>
            </div>
          </div>

          <div class="bg-orange-50 rounded-xl p-6 mb-6 inline-block">
            <p class="text-4xl font-bold text-orange-500">{{ result.reduction_percent }}%</p>
            <p class="text-sm text-orange-600 mt-1">{{ $t('common.fileSizeReduced') }}</p>
          </div>

          <div class="space-y-3">
            <a
              :href="downloadUrl"
              class="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition text-lg text-center"
              download
            >
              {{ $t('tools.imageCompressor.downloadBtn') }}
            </a>
            <button
              class="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-xl transition"
              @click="resetTool"
            >
              {{ $t('tools.imageCompressor.compressAnother') }}
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {{ errorMessage }}
        </div>

        <template #seo>
          <h2>How to Compress an Image Online</h2>
          <ol>
            <li><strong>Upload your image</strong> — Drag and drop a JPG, PNG, or WebP file (max 10MB).</li>
            <li><strong>Adjust quality</strong> — Use the slider to balance file size and image quality.</li>
            <li><strong>Download</strong> — Click "Compress Image" and download your optimized file.</li>
          </ol>

          <h2>Why Use ToolFlare Image Compressor?</h2>
          <ul>
            <li><strong>100% Free</strong> — No hidden costs or premium tiers.</li>
            <li><strong>Multiple Formats</strong> — Supports JPG, PNG, and WebP.</li>
            <li><strong>Quality Control</strong> — Fine-tune compression with the quality slider.</li>
            <li><strong>Secure</strong> — Files auto-deleted after 1 hour.</li>
            <li><strong>Fast</strong> — Most images compressed in under 3 seconds.</li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <h3>What formats are supported?</h3>
          <p>JPG/JPEG, PNG, and WebP images up to 10MB.</p>
          <h3>Does compression reduce quality?</h3>
          <p>You control the quality with the slider. Higher quality means larger file, lower quality means smaller file.</p>
          <h3>Is my image safe?</h3>
          <p>Yes. All files are automatically deleted from our servers after 1 hour.</p>
        </template>

        <template #related>
          <ToolCard :tool="{ name: $t('tools.pdfCompressor.name'), description: $t('tools.pdfCompressor.description'), icon: '📄', path: '/tools/pdf/compress', category: 'PDF' }" />
          <ToolCard :tool="{ name: $t('tools.pdfToJpg.name'), description: $t('tools.pdfToJpg.description'), icon: '🖼️', path: '/tools/pdf/to-jpg', category: 'PDF' }" />
          <ToolCard :tool="{ name: $t('tools.qrCode.name'), description: $t('tools.qrCode.description'), icon: '📱', path: '/tools/utility/qr-code', category: 'Utility' }" />
        </template>
      </ToolLayout>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('tools.imageCompressor.seoTitle'),
  description: t('tools.imageCompressor.seoDescription'),
  ogTitle: t('tools.imageCompressor.seoTitle'),
  ogDescription: t('tools.imageCompressor.pageSubtitle'),
})

useSchemaOrg([
  defineSoftwareApp({
    name: 'ToolFlare Image Compressor',
    operatingSystem: 'Web',
    applicationCategory: 'UtilitiesApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const { uploadImage, compressImage, getImageDownloadUrl } = useToolApi()

const step = ref<'upload' | 'result'>('upload')
const selectedFile = ref<File | null>(null)
const quality = ref(80)
const isCompressing = ref(false)
const errorMessage = ref('')
const downloadUrl = ref('')
const result = ref<{ original_size: number; compressed_size: number; reduction_percent: number } | null>(null)

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
    const uploadResult = await uploadImage(selectedFile.value)
    const compressResult = await compressImage(uploadResult.file_id, quality.value)
    result.value = {
      original_size: compressResult.original_size,
      compressed_size: compressResult.compressed_size,
      reduction_percent: compressResult.reduction_percent,
    }
    downloadUrl.value = getImageDownloadUrl(compressResult.compressed_file_id)
    step.value = 'result'
  } catch (e: any) {
    errorMessage.value = e?.data?.message || e?.message || t('common.error')
  } finally {
    isCompressing.value = false
  }
}

function resetTool() {
  step.value = 'upload'
  selectedFile.value = null
  quality.value = 80
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
