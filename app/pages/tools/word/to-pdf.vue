<template>
  <div>
    <NuxtLayout name="tool">
      <ToolLayout>
        <template #title>{{ $t('tools.wordToPdf.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.wordToPdf.pageSubtitle') }}</template>

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
            <input ref="fileInput" type="file" accept=".doc,.docx,.odt,.rtf" class="hidden" @change="onFileSelect" />
            <div class="text-4xl mb-3">📄</div>
            <p class="text-gray-700 font-medium">{{ $t('tools.wordToPdf.dragDrop') }}</p>
            <p class="text-sm text-gray-400 mt-1">{{ $t('tools.wordToPdf.orBrowse') }}</p>
            <p class="text-xs text-gray-400 mt-2">{{ $t('tools.wordToPdf.maxInfo') }}</p>
          </div>

          <!-- Selected file -->
          <div v-if="file" class="mt-6">
            <div class="flex items-center gap-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <span class="text-2xl">📝</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ file.name }}</p>
                <p class="text-xs text-gray-500">{{ formatSize(file.size) }}</p>
              </div>
              <button class="text-red-400 hover:text-red-600 text-sm" @click="file = null">{{ $t('common.remove') }}</button>
            </div>

            <button
              class="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              :disabled="isConverting"
              @click="startConversion"
            >
              <span v-if="!isConverting">{{ $t('tools.wordToPdf.convertBtn') }}</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ $t('tools.wordToPdf.converting') }}
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
            <span class="font-medium">{{ $t('tools.wordToPdf.complete') }}</span>
          </div>

          <div class="bg-gray-50 rounded-xl p-6 mb-6">
            <p class="text-lg font-semibold text-gray-900">{{ $t('tools.wordToPdf.resultInfo') }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ formatSize(result.pdf_size) }}</p>
          </div>

          <div class="space-y-3">
            <a
              :href="downloadUrl"
              class="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition text-lg text-center"
              download
            >
              {{ $t('tools.wordToPdf.downloadBtn') }}
            </a>
            <button
              class="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-xl transition"
              @click="resetTool"
            >
              {{ $t('tools.wordToPdf.convertAnother') }}
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {{ errorMessage }}
        </div>

        <template #seo>
          <h2>How to Convert Word to PDF</h2>
          <ol>
            <li><strong>Upload your document</strong> — Select a DOCX, DOC, ODT, or RTF file (max 20MB).</li>
            <li><strong>Convert</strong> — Click the button and LibreOffice converts your document server-side.</li>
            <li><strong>Download</strong> — Get your PDF instantly, ready to share or print.</li>
          </ol>

          <h2>Why Use Toolcairn Word to PDF?</h2>
          <ul>
            <li><strong>Multiple formats</strong> — Supports DOCX, DOC, ODT, and RTF files.</li>
            <li><strong>Accurate layout</strong> — Preserves fonts, tables, images, and formatting.</li>
            <li><strong>No Microsoft Office needed</strong> — Works on any device in your browser.</li>
            <li><strong>Free & secure</strong> — No signup, files auto-deleted after 1 hour.</li>
          </ul>

          <h2>FAQ</h2>
          <h3>What file formats are supported?</h3>
          <p>DOCX, DOC, ODT (OpenDocument Text), and RTF. All are converted via LibreOffice for accurate rendering.</p>
          <h3>Will the formatting be preserved?</h3>
          <p>Yes. LibreOffice preserves fonts, paragraph styles, tables, and embedded images as faithfully as possible.</p>
          <h3>How large a file can I upload?</h3>
          <p>Up to 20MB per file.</p>
        </template>

        <template #related>
          <ToolCard :tool="{ name: $t('tools.pdfCompressor.name'), description: $t('tools.pdfCompressor.description'), icon: '📄', path: '/tools/pdf/compress', category: 'PDF' }" />
          <ToolCard :tool="{ name: $t('tools.mergePdf.name'), description: $t('tools.mergePdf.description'), icon: '📎', path: '/tools/pdf/merge', category: 'PDF' }" />
          <ToolCard :tool="{ name: $t('tools.imageToPdf.name'), description: $t('tools.imageToPdf.description'), icon: '🖼️', path: '/tools/image/to-pdf', category: 'Image' }" />
        </template>
      </ToolLayout>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useSeoMeta({
  title: t('tools.wordToPdf.seoTitle'),
  description: t('tools.wordToPdf.seoDescription'),
  ogTitle: t('tools.wordToPdf.seoTitle'),
  ogDescription: t('tools.wordToPdf.pageSubtitle'),
})

useSchemaOrg([
  defineSoftwareApp({
    name: 'Toolcairn Word to PDF Converter',
    operatingSystem: 'Web',
    applicationCategory: 'UtilitiesApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const { convertWordToPdf, getWordToPdfDownloadUrl } = useToolApi()

const step = ref<'upload' | 'result'>('upload')
const file = ref<File | null>(null)
const isDragging = ref(false)
const isConverting = ref(false)
const errorMessage = ref('')
const downloadUrl = ref('')
const fileInput = ref<HTMLInputElement>()
const result = ref<{ pdf_size: number } | null>(null)

const ACCEPTED_EXTENSIONS = ['.doc', '.docx', '.odt', '.rtf']
const MAX_SIZE = 20 * 1024 * 1024

function openFilePicker() {
  fileInput.value?.click()
}

function isValidFile(f: File): boolean {
  const name = f.name.toLowerCase()
  return ACCEPTED_EXTENSIONS.some(ext => name.endsWith(ext)) && f.size <= MAX_SIZE
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const dropped = e.dataTransfer?.files?.[0]
  if (dropped && isValidFile(dropped)) file.value = dropped
}

function onFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  const selected = input.files?.[0]
  if (selected && isValidFile(selected)) file.value = selected
  input.value = ''
}

async function startConversion() {
  if (!file.value) return
  isConverting.value = true
  errorMessage.value = ''

  try {
    const convertResult = await convertWordToPdf(file.value)
    result.value = { pdf_size: convertResult.pdf_size }
    downloadUrl.value = getWordToPdfDownloadUrl(convertResult.convert_id)
    step.value = 'result'
  } catch (e: any) {
    errorMessage.value = e?.data?.message || e?.message || t('common.error')
  } finally {
    isConverting.value = false
  }
}

function resetTool() {
  step.value = 'upload'
  file.value = null
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
