<template>
  <div>
    <NuxtLayout name="tool">
      <ToolLayout>
        <template #title>{{ $t('tools.imageToPdf.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.imageToPdf.pageSubtitle') }}</template>

        <!-- Step 1: Upload -->
        <div v-if="step === 'upload'">
          <div
            class="border-2 border-dashed rounded-xl p-10 text-center transition cursor-pointer"
            :class="isDragging ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-orange-300 hover:bg-gray-50'"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onDrop"
            @click="openFilePicker"
          >
            <input ref="fileInput" type="file" accept=".jpg,.jpeg,.png,.webp" multiple class="hidden" @change="onFileSelect" />
            <div class="text-4xl mb-3">🖼️</div>
            <p class="text-gray-700 font-medium">{{ $t('tools.imageToPdf.dragDrop') }}</p>
            <p class="text-sm text-gray-400 mt-1">{{ $t('tools.imageToPdf.orBrowse') }}</p>
            <p class="text-xs text-gray-400 mt-2">{{ $t('tools.imageToPdf.maxInfo') }}</p>
          </div>

          <!-- File list -->
          <div v-if="files.length > 0" class="mt-6 space-y-2">
            <h3 class="text-sm font-semibold text-gray-700 mb-3">{{ $t('tools.imageToPdf.filesSelected', { count: files.length }) }}</h3>
            <div
              v-for="(file, index) in files"
              :key="index"
              class="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <span class="text-gray-400 text-sm font-mono w-6 text-center">{{ index + 1 }}</span>
              <span class="text-lg">🖼️</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ file.name }}</p>
                <p class="text-xs text-gray-500">{{ formatSize(file.size) }}</p>
              </div>
              <button class="text-red-400 hover:text-red-600 text-sm" @click="removeFile(index)">{{ $t('common.remove') }}</button>
            </div>

            <button
              class="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              :disabled="isConverting"
              @click="startConversion"
            >
              <span v-if="!isConverting">{{ $t('tools.imageToPdf.convertBtn', { count: files.length }) }}</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ $t('tools.imageToPdf.converting') }}
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
            <span class="font-medium">{{ $t('tools.imageToPdf.complete') }}</span>
          </div>

          <div class="bg-gray-50 rounded-xl p-6 mb-6">
            <p class="text-lg font-semibold text-gray-900">{{ $t('tools.imageToPdf.resultInfo', { count: result.image_count }) }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ formatSize(result.pdf_size) }}</p>
          </div>

          <div class="space-y-3">
            <a
              :href="downloadUrl"
              class="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition text-lg text-center"
              download
            >
              {{ $t('tools.imageToPdf.downloadBtn') }}
            </a>
            <button
              class="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-xl transition"
              @click="resetTool"
            >
              {{ $t('tools.imageToPdf.convertAnother') }}
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {{ errorMessage }}
        </div>

        <template #seo>
          <h2>How to Convert Images to PDF</h2>
          <ol>
            <li><strong>Upload images</strong> — Select one or more JPG, PNG, or WebP files (max 10MB each, up to 20 images).</li>
            <li><strong>Order them</strong> — Images appear in the PDF in the order shown.</li>
            <li><strong>Download</strong> — Click convert and get your PDF instantly.</li>
          </ol>

          <h2>Why Use ToolFlare Image to PDF?</h2>
          <ul>
            <li><strong>Multiple formats</strong> — Supports JPG, PNG, and WebP images.</li>
            <li><strong>Up to 20 images</strong> — Combine many images into one PDF.</li>
            <li><strong>One page per image</strong> — Each image becomes a separate PDF page.</li>
            <li><strong>Free & secure</strong> — No signup, files auto-deleted after 1 hour.</li>
          </ul>

          <h2>FAQ</h2>
          <h3>What image formats are supported?</h3>
          <p>JPG, JPEG, PNG, and WebP. Each image becomes one page in the PDF.</p>
          <h3>How many images can I convert?</h3>
          <p>Up to 20 images per conversion, each up to 10MB.</p>
          <h3>Will image quality be preserved?</h3>
          <p>Yes. Images are embedded in the PDF at their original resolution.</p>
        </template>

        <template #related>
          <ToolCard :tool="{ name: $t('tools.imageCompressor.name'), description: $t('tools.imageCompressor.description'), icon: '🖼️', path: '/tools/image/compress', category: 'Image' }" />
          <ToolCard :tool="{ name: $t('tools.pdfToJpg.name'), description: $t('tools.pdfToJpg.description'), icon: '🖼️', path: '/tools/pdf/to-jpg', category: 'PDF' }" />
          <ToolCard :tool="{ name: $t('tools.pdfCompressor.name'), description: $t('tools.pdfCompressor.description'), icon: '📄', path: '/tools/pdf/compress', category: 'PDF' }" />
        </template>
      </ToolLayout>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useSeoMeta({
  title: t('tools.imageToPdf.seoTitle'),
  description: t('tools.imageToPdf.seoDescription'),
  ogTitle: t('tools.imageToPdf.seoTitle'),
  ogDescription: t('tools.imageToPdf.pageSubtitle'),
})

useSchemaOrg([
  defineSoftwareApp({
    name: 'ToolFlare Image to PDF Converter',
    operatingSystem: 'Web',
    applicationCategory: 'UtilitiesApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const { convertImagesToPdf, getImageToPdfDownloadUrl } = useToolApi()

const step = ref<'upload' | 'result'>('upload')
const files = ref<File[]>([])
const isDragging = ref(false)
const isConverting = ref(false)
const errorMessage = ref('')
const downloadUrl = ref('')
const fileInput = ref<HTMLInputElement>()
const result = ref<{ image_count: number; pdf_size: number } | null>(null)

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 10 * 1024 * 1024

function openFilePicker() {
  fileInput.value?.click()
}

function addFiles(newFiles: FileList | File[]) {
  for (const file of Array.from(newFiles)) {
    if (!ACCEPTED_TYPES.includes(file.type)) continue
    if (file.size > MAX_SIZE) continue
    if (files.value.length >= 20) break
    files.value.push(file)
  }
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  if (e.dataTransfer?.files) addFiles(e.dataTransfer.files)
}

function onFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files) addFiles(input.files)
  input.value = ''
}

function removeFile(index: number) {
  files.value.splice(index, 1)
}

async function startConversion() {
  if (!files.value.length) return
  isConverting.value = true
  errorMessage.value = ''

  try {
    const convertResult = await convertImagesToPdf(files.value)
    result.value = {
      image_count: convertResult.image_count,
      pdf_size: convertResult.pdf_size,
    }
    downloadUrl.value = getImageToPdfDownloadUrl(convertResult.convert_id)
    step.value = 'result'
  } catch (e: any) {
    errorMessage.value = e?.data?.message || e?.message || t('common.error')
  } finally {
    isConverting.value = false
  }
}

function resetTool() {
  step.value = 'upload'
  files.value = []
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
