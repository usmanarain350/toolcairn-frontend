<template>
      <ToolLayout>
        <template #title>{{ $t('tools.base64.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.base64.pageSubtitle') }}</template>

        <div class="space-y-5">
          <!-- Mode Toggle -->
          <div class="flex bg-gray-100 rounded-xl p-1">
            <button
              class="flex-1 py-2.5 text-sm font-semibold rounded-lg transition"
              :class="mode === 'encode' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
              @click="mode = 'encode'"
            >
              {{ $t('tools.base64.encode') }}
            </button>
            <button
              class="flex-1 py-2.5 text-sm font-semibold rounded-lg transition"
              :class="mode === 'decode' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
              @click="mode = 'decode'"
            >
              {{ $t('tools.base64.decode') }}
            </button>
          </div>

          <!-- Input -->
          <div>
            <label for="b64-input" class="block text-sm font-semibold text-gray-700 mb-2">
              {{ $t('tools.base64.inputLabel') }}
            </label>
            <textarea
              id="b64-input"
              v-model="inputText"
              rows="6"
              :placeholder="mode === 'encode' ? 'Enter text to encode to Base64...' : 'Paste Base64 string to decode...'"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-y"
              spellcheck="false"
            />
          </div>

          <!-- Convert Button -->
          <button
            class="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3.5 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            :disabled="!inputText.trim()"
            @click="convert"
          >
            {{ mode === 'encode' ? $t('tools.base64.encode') : $t('tools.base64.decode') }}
          </button>

          <!-- Error -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
            {{ errorMessage }}
          </div>

          <!-- Output -->
          <div v-if="outputText">
            <div class="flex items-center justify-between mb-2">
              <label class="text-sm font-semibold text-gray-700">
                {{ $t('tools.base64.outputLabel') }}
              </label>
              <button
                class="inline-flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-600 font-medium"
                @click="copyResult"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {{ copyLabel }}
              </button>
            </div>
            <textarea
              :value="outputText"
              rows="6"
              readonly
              class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono text-sm text-gray-900 focus:outline-none resize-y"
              spellcheck="false"
            />
          </div>

          <!-- Quick Info -->
          <div class="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
            <p v-if="inputText && outputText && mode === 'encode'">
              <strong>Input:</strong> {{ inputText.length }} characters
              <span class="mx-2 text-gray-300">|</span>
              <strong>Output:</strong> {{ outputText.length }} characters
              <span class="mx-2 text-gray-300">|</span>
              <strong>Size increase:</strong> {{ Math.round(((outputText.length - inputText.length) / inputText.length) * 100) }}%
            </p>
            <p v-else-if="inputText && outputText && mode === 'decode'">
              <strong>Input:</strong> {{ inputText.length }} characters
              <span class="mx-2 text-gray-300">|</span>
              <strong>Output:</strong> {{ outputText.length }} characters
            </p>
            <p v-else>
              Base64 encoding converts binary data to ASCII text. It is commonly used for embedding images in HTML/CSS, transmitting data over text-based protocols, and encoding credentials.
            </p>
          </div>
        </div>

        <!-- SEO Content -->
        <template #seo>
          <h2>How to Encode and Decode Base64</h2>
          <ol>
            <li><strong>Choose your mode</strong> — Select "Encode" to convert text to Base64, or "Decode" to convert Base64 back to text.</li>
            <li><strong>Enter your data</strong> — Paste or type your text or Base64 string into the input area.</li>
            <li><strong>Convert and copy</strong> — Click the convert button and copy the result with one click.</li>
          </ol>

          <h2>Benefits of Using Toolcairn Base64 Tool</h2>
          <ul>
            <li><strong>Instant Conversion</strong> — Encode or decode Base64 with a single click, no waiting.</li>
            <li><strong>Full Unicode Support</strong> — Properly handles special characters, emojis, and multilingual text.</li>
            <li><strong>Browser-Only Processing</strong> — Your data stays in your browser and is never uploaded to any server.</li>
            <li><strong>Size Statistics</strong> — See input/output character counts and the encoding size overhead.</li>
            <li><strong>No Signup</strong> — Use immediately without creating an account.</li>
          </ul>

          <h2>Frequently Asked Questions (FAQ)</h2>

          <h3>What is Base64 encoding?</h3>
          <p>Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It uses 64 characters (A-Z, a-z, 0-9, +, /) to represent data, with "=" used for padding. It is commonly used in email, URLs, and data storage.</p>

          <h3>Why is the encoded output larger than the input?</h3>
          <p>Base64 encoding increases data size by approximately 33%. This is because every 3 bytes of input are represented as 4 Base64 characters. This trade-off is necessary to ensure the data can be safely transmitted through text-based systems.</p>

          <h3>Can I encode binary files?</h3>
          <p>This tool supports text-to-Base64 encoding. For encoding binary files like images, you would need a file-based encoder. We plan to add file upload support in a future update.</p>

          <h3>Is Base64 encryption?</h3>
          <p>No. Base64 is an encoding scheme, not encryption. It does not provide any security. Anyone can decode a Base64 string. Never use Base64 to protect sensitive information.</p>

          <h3>What are common uses for Base64?</h3>
          <p>Common uses include embedding images in HTML/CSS (data URIs), encoding email attachments (MIME), transmitting binary data in JSON APIs, and encoding authentication credentials in HTTP headers (Basic Auth).</p>
        </template>

        <!-- Related Tools -->
        <template #related>
          <ToolCard :tool="{ name: $t('tools.jsonFormatter.name'), description: $t('tools.jsonFormatter.description'), icon: '{}', path: '/tools/developer/json-formatter', category: 'Developer' }" />
          <ToolCard :tool="{ name: $t('tools.passwordGenerator.name'), description: $t('tools.passwordGenerator.description'), icon: '🔐', path: '/tools/utility/password-generator', category: 'Utility' }" />
          <ToolCard :tool="{ name: $t('tools.slugGenerator.name'), description: $t('tools.slugGenerator.description'), icon: '🔗', path: '/tools/seo/slug-generator', category: 'SEO' }" />
        </template>
      </ToolLayout>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'tool' })

const { t } = useI18n()

useToolSeo({
  name: t('tools.base64.name'),
  description: t('tools.base64.seoDescription'),
  path: '/tools/developer/base64',
})

useSchemaOrg([
  defineSoftwareApp({
    name: 'Toolcairn Base64 Encoder/Decoder',
    operatingSystem: 'Web',
    applicationCategory: 'DeveloperApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const mode = ref<'encode' | 'decode'>('encode')
const inputText = ref('')
const outputText = ref('')
const errorMessage = ref('')
const copyLabel = ref(t('tools.base64.copyBtn'))

watch(mode, () => {
  inputText.value = ''
  outputText.value = ''
  errorMessage.value = ''
})

function convert() {
  errorMessage.value = ''
  outputText.value = ''

  if (!inputText.value.trim()) return

  try {
    if (mode.value === 'encode') {
      // Handle Unicode properly: encode string to UTF-8 bytes first
      const encoder = new TextEncoder()
      const bytes = encoder.encode(inputText.value)
      let binary = ''
      for (const byte of bytes) {
        binary += String.fromCharCode(byte)
      }
      outputText.value = btoa(binary)
    } else {
      // Decode: handle UTF-8 properly
      const binary = atob(inputText.value.trim())
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i)
      }
      const decoder = new TextDecoder()
      outputText.value = decoder.decode(bytes)
    }
  } catch (e: any) {
    if (mode.value === 'decode') {
      errorMessage.value = 'Invalid Base64 string. Please check your input and try again.'
    } else {
      errorMessage.value = `Encoding error: ${e.message}`
    }
  }
}

async function copyResult() {
  if (!outputText.value) return
  try {
    await navigator.clipboard.writeText(outputText.value)
    copyLabel.value = t('common.copySuccess')
    setTimeout(() => { copyLabel.value = t('tools.base64.copyBtn') }, 2000)
  } catch {
    copyLabel.value = 'Failed'
    setTimeout(() => { copyLabel.value = t('tools.base64.copyBtn') }, 2000)
  }
}
</script>
