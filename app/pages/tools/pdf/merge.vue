<template>
  <div>
    <NuxtLayout name="tool">
      <ToolLayout>
        <template #title>Merge PDF Files Online</template>
        <template #subtitle>Combine multiple PDF files into one document. Free, no signup required.</template>

        <!-- Step 1: Upload multiple files -->
        <div v-if="step === 'upload'">
          <div
            class="border-2 border-dashed rounded-xl p-10 text-center transition cursor-pointer"
            :class="isDragging ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-orange-300 hover:bg-gray-50'"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onDrop"
            @click="openFilePicker"
          >
            <input ref="fileInput" type="file" accept=".pdf" multiple class="hidden" @change="onFileSelect" />
            <div class="text-4xl mb-3">📑</div>
            <p class="text-gray-700 font-medium">Drag & drop PDF files here</p>
            <p class="text-sm text-gray-400 mt-1">or click to browse — select multiple PDFs</p>
            <p class="text-xs text-gray-400 mt-2">PDF files only — Max 50MB each, up to 20 files</p>
          </div>

          <!-- File list -->
          <div v-if="files.length > 0" class="mt-6 space-y-2">
            <h3 class="text-sm font-semibold text-gray-700 mb-3">{{ files.length }} file(s) selected — drag to reorder</h3>
            <div
              v-for="(file, index) in files"
              :key="index"
              class="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <span class="text-gray-400 text-sm font-mono w-6 text-center">{{ index + 1 }}</span>
              <span class="text-lg">📄</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ file.name }}</p>
                <p class="text-xs text-gray-500">{{ formatSize(file.size) }}</p>
              </div>
              <button class="text-red-400 hover:text-red-600 text-sm" @click="removeFile(index)">Remove</button>
            </div>

            <button
              class="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              :disabled="files.length < 2 || isMerging"
              @click="startMerge"
            >
              <span v-if="!isMerging">Merge {{ files.length }} PDFs</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Merging...
              </span>
            </button>
            <p v-if="files.length < 2" class="text-center text-sm text-gray-400 mt-2">Select at least 2 PDFs to merge</p>
          </div>
        </div>

        <!-- Step 2: Result -->
        <div v-if="step === 'result' && result" class="text-center">
          <div class="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-6">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">Merge Complete!</span>
          </div>

          <div class="bg-gray-50 rounded-xl p-6 mb-6">
            <p class="text-lg font-semibold text-gray-900">{{ result.file_count }} PDFs merged into one</p>
            <p class="text-sm text-gray-500 mt-1">Output size: {{ formatSize(result.merged_size) }}</p>
          </div>

          <div class="space-y-3">
            <a
              :href="downloadUrl"
              class="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition text-lg text-center"
              download
            >
              Download Merged PDF
            </a>
            <button
              class="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-xl transition"
              @click="resetTool"
            >
              Merge More Files
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {{ errorMessage }}
        </div>

        <template #seo>
          <h2>How to Merge PDF Files Online</h2>
          <ol>
            <li><strong>Upload PDFs</strong> — Drag and drop or select multiple PDF files.</li>
            <li><strong>Arrange order</strong> — Files are merged in the order shown.</li>
            <li><strong>Download</strong> — Click "Merge" and download your combined PDF.</li>
          </ol>

          <h2>Why Use ToolFlare PDF Merger?</h2>
          <ul>
            <li><strong>100% Free</strong> — Merge unlimited PDFs at no cost.</li>
            <li><strong>Up to 20 files</strong> — Combine up to 20 PDFs in one go.</li>
            <li><strong>Preserves quality</strong> — No quality loss during merge.</li>
            <li><strong>Secure</strong> — Files auto-deleted after 1 hour.</li>
          </ul>

          <h2>FAQ</h2>
          <h3>How many PDFs can I merge?</h3>
          <p>Up to 20 PDF files, each up to 50MB in size.</p>
          <h3>Does merging affect quality?</h3>
          <p>No. The merge process preserves the original quality of all pages.</p>
        </template>

        <template #related>
          <ToolCard :tool="{ name: 'PDF Compressor', description: 'Reduce PDF file size', icon: '📄', path: '/tools/pdf/compress', category: 'PDF' }" />
          <ToolCard :tool="{ name: 'PDF to JPG', description: 'Convert PDF pages to images', icon: '🖼️', path: '/tools/pdf/to-jpg', category: 'PDF' }" />
          <ToolCard :tool="{ name: 'Image Compressor', description: 'Compress images online', icon: '🖼️', path: '/tools/image/compress', category: 'Image' }" />
        </template>
      </ToolLayout>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Merge PDF Files Online — Free, No Signup | ToolFlare',
  description: 'Combine multiple PDF files into one document for free. No signup, fast, and secure. Up to 20 PDFs at once.',
})

useSchemaOrg([
  defineSoftwareApplication({
    name: 'ToolFlare PDF Merger',
    operatingSystem: 'Web',
    applicationCategory: 'UtilitiesApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const { mergePdfs, getMergeDownloadUrl } = useToolApi()

const step = ref<'upload' | 'result'>('upload')
const files = ref<File[]>([])
const isDragging = ref(false)
const isMerging = ref(false)
const errorMessage = ref('')
const downloadUrl = ref('')
const fileInput = ref<HTMLInputElement>()
const result = ref<{ file_count: number; merged_size: number } | null>(null)

function openFilePicker() {
  fileInput.value?.click()
}

function addFiles(newFiles: FileList | File[]) {
  for (const file of Array.from(newFiles)) {
    if (file.type !== 'application/pdf') continue
    if (file.size > 50 * 1024 * 1024) continue
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

async function startMerge() {
  if (files.value.length < 2) return
  isMerging.value = true
  errorMessage.value = ''

  try {
    const mergeResult = await mergePdfs(files.value)
    result.value = {
      file_count: mergeResult.file_count,
      merged_size: mergeResult.merged_size,
    }
    downloadUrl.value = getMergeDownloadUrl(mergeResult.merge_id)
    step.value = 'result'
  } catch (e: any) {
    errorMessage.value = e?.data?.message || e?.message || 'Merge failed. Please try again.'
  } finally {
    isMerging.value = false
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
