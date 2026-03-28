<template>
  <div>
    <NuxtLayout name="tool">
      <ToolLayout>
        <template #title>{{ $t('tools.splitPdf.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.splitPdf.pageSubtitle') }}</template>

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
            <input ref="fileInput" type="file" accept=".pdf" class="hidden" @change="onFileSelect" />
            <div class="text-4xl mb-3">✂️</div>
            <p class="text-gray-700 font-medium">{{ $t('tools.splitPdf.dragDrop') }}</p>
            <p class="text-sm text-gray-400 mt-1">{{ $t('tools.splitPdf.orBrowse') }}</p>
            <p class="text-xs text-gray-400 mt-2">{{ $t('tools.splitPdf.maxInfo') }}</p>
          </div>

          <div v-if="isUploading" class="mt-6 flex items-center justify-center gap-3 text-gray-500">
            <svg class="animate-spin h-5 w-5 text-orange-500" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span class="text-sm">{{ $t('tools.splitPdf.uploading') }}</span>
          </div>
        </div>

        <!-- Step 2: Configure -->
        <div v-if="step === 'configure' && uploadResult">
          <div class="bg-gray-50 rounded-xl p-4 mb-6 flex items-center gap-3">
            <span class="text-2xl">📄</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ uploadResult.original_name }}</p>
              <p class="text-xs text-gray-500">
                {{ formatSize(uploadResult.original_size) }} &mdash; {{ $t('tools.splitPdf.pageCount', { count: uploadResult.page_count }) }}
              </p>
            </div>
          </div>

          <p class="text-sm font-semibold text-gray-700 mb-3">{{ $t('tools.splitPdf.splitMode') }}</p>

          <div class="space-y-3 mb-6">
            <!-- Mode: Split All -->
            <label
              class="flex items-start gap-4 border rounded-xl p-4 cursor-pointer transition"
              :class="mode === 'all' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'"
            >
              <input v-model="mode" type="radio" value="all" class="mt-1 accent-orange-500" />
              <div>
                <p class="font-medium text-gray-900">{{ $t('tools.splitPdf.modeAll') }}</p>
                <p class="text-sm text-gray-500 mt-0.5">{{ $t('tools.splitPdf.modeAllDesc') }}</p>
              </div>
            </label>

            <!-- Mode: Extract Range -->
            <label
              class="flex items-start gap-4 border rounded-xl p-4 cursor-pointer transition"
              :class="mode === 'range' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'"
            >
              <input v-model="mode" type="radio" value="range" class="mt-1 accent-orange-500" />
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ $t('tools.splitPdf.modeRange') }}</p>
                <p class="text-sm text-gray-500 mt-0.5">{{ $t('tools.splitPdf.modeRangeDesc') }}</p>

                <div v-if="mode === 'range'" class="mt-4 grid grid-cols-2 gap-4" @click.stop>
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">{{ $t('tools.splitPdf.fromPage') }}</label>
                    <input
                      v-model.number="fromPage"
                      type="number"
                      :min="1"
                      :max="uploadResult.page_count"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">{{ $t('tools.splitPdf.toPage') }}</label>
                    <input
                      v-model.number="toPage"
                      type="number"
                      :min="1"
                      :max="uploadResult.page_count"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>
            </label>
          </div>

          <button
            class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            :disabled="isSplitting"
            @click="startSplit"
          >
            <span v-if="!isSplitting">{{ $t('tools.splitPdf.splitBtn') }}</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {{ $t('tools.splitPdf.splitting') }}
            </span>
          </button>
        </div>

        <!-- Step 3: Result -->
        <div v-if="step === 'result' && splitResult" class="text-center">
          <div class="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-6">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">{{ $t('tools.splitPdf.complete') }}</span>
          </div>

          <div class="bg-gray-50 rounded-xl p-6 mb-6">
            <p class="text-lg font-semibold text-gray-900">
              <span v-if="splitResult.type === 'zip'">
                {{ $t('tools.splitPdf.resultAll', { count: splitResult.page_count }) }}
              </span>
              <span v-else>
                {{ $t('tools.splitPdf.resultRange', { from: fromPage, to: toPage }) }}
              </span>
            </p>
            <p class="text-sm text-gray-500 mt-1">{{ formatSize(splitResult.size) }}</p>
          </div>

          <div class="space-y-3">
            <a
              :href="downloadUrl"
              class="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition text-lg text-center"
              download
            >
              {{ splitResult.type === 'zip' ? $t('tools.splitPdf.downloadZip') : $t('tools.splitPdf.downloadPdf') }}
            </a>
            <button
              class="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-xl transition"
              @click="resetTool"
            >
              {{ $t('tools.splitPdf.splitAnother') }}
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {{ errorMessage }}
        </div>

        <template #seo>
          <h2>How to Split a PDF Online</h2>
          <ol>
            <li><strong>Upload PDF</strong> — Drag and drop or click to select your PDF file.</li>
            <li><strong>Choose split mode</strong> — Split all pages into individual files or extract a page range.</li>
            <li><strong>Download</strong> — Download your split PDF or ZIP archive instantly.</li>
          </ol>

          <h2>Why Use ToolFlare PDF Splitter?</h2>
          <ul>
            <li><strong>100% Free</strong> — No cost, no subscription required.</li>
            <li><strong>No Signup</strong> — Start splitting immediately with no account needed.</li>
            <li><strong>Two modes</strong> — Split every page or extract a specific range.</li>
            <li><strong>Secure</strong> — Files are automatically deleted after 1 hour.</li>
          </ul>

          <h2>FAQ</h2>
          <h3>What is the maximum file size?</h3>
          <p>You can upload PDF files up to 50MB in size.</p>
          <h3>What is the difference between the two modes?</h3>
          <p>"Split all pages" creates one PDF per page and packages them in a ZIP file. "Extract page range" creates a single PDF containing only the pages you specify.</p>
          <h3>Are my files secure?</h3>
          <p>Yes. All uploaded files are automatically deleted from our servers after 1 hour.</p>
        </template>

        <template #related>
          <ToolCard :tool="{ name: $t('tools.pdfCompressor.name'), description: $t('tools.pdfCompressor.description'), icon: '📄', path: '/tools/pdf/compress', category: 'PDF' }" />
          <ToolCard :tool="{ name: $t('tools.mergePdf.name'), description: $t('tools.mergePdf.description'), icon: '📑', path: '/tools/pdf/merge', category: 'PDF' }" />
          <ToolCard :tool="{ name: $t('tools.pdfToJpg.name'), description: $t('tools.pdfToJpg.description'), icon: '🖼️', path: '/tools/pdf/to-jpg', category: 'PDF' }" />
        </template>
      </ToolLayout>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useSeoMeta({
  title: t('tools.splitPdf.seoTitle'),
  description: t('tools.splitPdf.seoDescription'),
  ogTitle: t('tools.splitPdf.seoTitle'),
  ogDescription: t('tools.splitPdf.pageSubtitle'),
})

useSchemaOrg([
  defineSoftwareApp({
    name: 'ToolFlare PDF Splitter',
    operatingSystem: 'Web',
    applicationCategory: 'UtilitiesApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const { uploadPdfForSplit, splitPdf, getSplitDownloadUrl } = useToolApi()

const step = ref<'upload' | 'configure' | 'result'>('upload')
const isDragging = ref(false)
const isUploading = ref(false)
const isSplitting = ref(false)
const errorMessage = ref('')
const downloadUrl = ref('')
const fileInput = ref<HTMLInputElement>()
const mode = ref<'all' | 'range'>('all')
const fromPage = ref(1)
const toPage = ref(1)

const uploadResult = ref<{
  file_id: string
  original_name: string
  original_size: number
  page_count: number
} | null>(null)

const splitResult = ref<{
  split_id: string
  page_count: number
  type: 'zip' | 'pdf'
  size: number
  download_url: string
} | null>(null)

function openFilePicker() {
  fileInput.value?.click()
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) handleFile(file)
}

function onFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) handleFile(file)
  input.value = ''
}

async function handleFile(file: File) {
  if (file.type !== 'application/pdf') {
    errorMessage.value = t('tools.splitPdf.errorWrongType')
    return
  }
  if (file.size > 50 * 1024 * 1024) {
    errorMessage.value = t('tools.splitPdf.errorTooLarge')
    return
  }

  isUploading.value = true
  errorMessage.value = ''

  try {
    const result = await uploadPdfForSplit(file)
    uploadResult.value = result
    toPage.value = result.page_count
    step.value = 'configure'
  } catch (e: any) {
    errorMessage.value = e?.data?.message || e?.message || t('common.error')
  } finally {
    isUploading.value = false
  }
}

async function startSplit() {
  if (!uploadResult.value) return

  if (mode.value === 'range') {
    if (!fromPage.value || !toPage.value) {
      errorMessage.value = t('tools.splitPdf.errorRangeRequired')
      return
    }
    if (fromPage.value > toPage.value) {
      errorMessage.value = t('tools.splitPdf.errorRangeOrder')
      return
    }
    if (toPage.value > uploadResult.value.page_count) {
      errorMessage.value = t('tools.splitPdf.errorRangeExceeds', { max: uploadResult.value.page_count })
      return
    }
  }

  isSplitting.value = true
  errorMessage.value = ''

  try {
    const result = await splitPdf(
      uploadResult.value.file_id,
      mode.value,
      mode.value === 'range' ? fromPage.value : undefined,
      mode.value === 'range' ? toPage.value : undefined,
    )
    splitResult.value = result
    downloadUrl.value = getSplitDownloadUrl(result.split_id)
    step.value = 'result'
  } catch (e: any) {
    errorMessage.value = e?.data?.message || e?.message || t('common.error')
  } finally {
    isSplitting.value = false
  }
}

function resetTool() {
  step.value = 'upload'
  uploadResult.value = null
  splitResult.value = null
  downloadUrl.value = ''
  errorMessage.value = ''
  mode.value = 'all'
  fromPage.value = 1
  toPage.value = 1
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
</script>
