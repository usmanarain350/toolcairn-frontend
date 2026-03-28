<template>
  <div>
    <NuxtLayout name="tool">
      <ToolLayout>
        <template #title>{{ $t('tools.protectPdf.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.protectPdf.pageSubtitle') }}</template>

        <!-- Step 1: Upload + Password -->
        <div v-if="step === 'upload'">
          <FileDropZone
            accept=".pdf"
            accept-label="PDF"
            :max-size-m-b="50"
            @selected="onFileSelected"
            @removed="onFileRemoved"
          />

          <div v-if="selectedFile" class="mt-6 space-y-4">
            <!-- Password -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">
                {{ $t('tools.protectPdf.passwordLabel') }}
              </label>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="$t('tools.protectPdf.passwordPlaceholder')"
                  class="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  @keyup.enter="startProtect"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  @click="showPassword = !showPassword"
                >
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
              <p class="text-xs text-gray-400 mt-1">{{ $t('tools.protectPdf.passwordHint') }}</p>
            </div>

            <button
              class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              :disabled="isProtecting || password.length < 4"
              @click="startProtect"
            >
              <span v-if="!isProtecting">{{ $t('tools.protectPdf.protectBtn') }}</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ $t('tools.protectPdf.protecting') }}
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
            <span class="font-medium">{{ $t('tools.protectPdf.complete') }}</span>
          </div>

          <div class="bg-gray-50 rounded-xl p-6 mb-6">
            <div class="flex items-center justify-center gap-2 mb-2">
              <svg class="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              <p class="text-lg font-semibold text-gray-900">{{ $t('tools.protectPdf.resultInfo') }}</p>
            </div>
            <p class="text-sm text-gray-500">{{ formatSize(result.protected_size) }}</p>
          </div>

          <div class="space-y-3">
            <a
              :href="downloadUrl"
              class="block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition text-lg text-center"
              download
            >
              {{ $t('tools.protectPdf.downloadBtn') }}
            </a>
            <button
              class="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-xl transition"
              @click="resetTool"
            >
              {{ $t('tools.protectPdf.protectAnother') }}
            </button>
          </div>
        </div>

        <div v-if="errorMessage" class="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {{ errorMessage }}
        </div>

        <template #seo>
          <h2>How to Password Protect a PDF</h2>
          <ol>
            <li><strong>Upload your PDF</strong> — Drag and drop or click to browse (max 50MB).</li>
            <li><strong>Enter a password</strong> — Choose a strong password (minimum 4 characters).</li>
            <li><strong>Download</strong> — Your password-protected PDF is ready instantly.</li>
          </ol>

          <h2>Why Password Protect a PDF?</h2>
          <ul>
            <li><strong>Prevent unauthorized access</strong> — Only people with the password can open the file.</li>
            <li><strong>128-bit encryption</strong> — Industry-standard AES encryption keeps your file secure.</li>
            <li><strong>Restrict permissions</strong> — Prevents copying, printing, and editing.</li>
            <li><strong>Free & private</strong> — No signup, files auto-deleted after 1 hour.</li>
          </ul>

          <h2>FAQ</h2>
          <h3>What encryption is used?</h3>
          <p>Your PDF is protected with 128-bit RC4 encryption via Ghostscript, which is compatible with all major PDF readers.</p>
          <h3>Can I remove the password later?</h3>
          <p>Yes — use a PDF unlock tool with your password to remove protection.</p>
          <h3>Is my PDF secure on your servers?</h3>
          <p>Yes. Files are automatically deleted after 1 hour and never stored permanently.</p>
        </template>

        <template #related>
          <ToolCard :tool="{ name: $t('tools.pdfCompressor.name'), description: $t('tools.pdfCompressor.description'), icon: '📄', path: '/tools/pdf/compress', category: 'PDF' }" />
          <ToolCard :tool="{ name: $t('tools.mergePdf.name'), description: $t('tools.mergePdf.description'), icon: '📎', path: '/tools/pdf/merge', category: 'PDF' }" />
          <ToolCard :tool="{ name: $t('tools.splitPdf.name'), description: $t('tools.splitPdf.description'), icon: '✂️', path: '/tools/pdf/split', category: 'PDF' }" />
        </template>
      </ToolLayout>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useSeoMeta({
  title: t('tools.protectPdf.seoTitle'),
  description: t('tools.protectPdf.seoDescription'),
  ogTitle: t('tools.protectPdf.seoTitle'),
  ogDescription: t('tools.protectPdf.pageSubtitle'),
})

useSchemaOrg([
  defineSoftwareApp({
    name: 'ToolFlare PDF Password Protector',
    operatingSystem: 'Web',
    applicationCategory: 'UtilitiesApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const { protectPdf, getProtectDownloadUrl } = useToolApi()

const step = ref<'upload' | 'result'>('upload')
const selectedFile = ref<File | null>(null)
const password = ref('')
const showPassword = ref(false)
const isProtecting = ref(false)
const errorMessage = ref('')
const downloadUrl = ref('')
const result = ref<{ original_size: number; protected_size: number } | null>(null)

function onFileSelected(file: File) {
  selectedFile.value = file
  errorMessage.value = ''
}

function onFileRemoved() {
  selectedFile.value = null
  errorMessage.value = ''
}

async function startProtect() {
  if (!selectedFile.value || password.value.length < 4) return
  isProtecting.value = true
  errorMessage.value = ''

  try {
    const protectResult = await protectPdf(selectedFile.value, password.value)
    result.value = {
      original_size: protectResult.original_size,
      protected_size: protectResult.protected_size,
    }
    downloadUrl.value = getProtectDownloadUrl(protectResult.protect_id)
    step.value = 'result'
  } catch (e: any) {
    errorMessage.value = e?.data?.message || e?.message || t('common.error')
  } finally {
    isProtecting.value = false
  }
}

function resetTool() {
  step.value = 'upload'
  selectedFile.value = null
  password.value = ''
  showPassword.value = false
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
