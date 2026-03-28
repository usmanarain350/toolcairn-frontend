<template>
  <div>
    <NuxtLayout name="tool">
      <ToolLayout>
        <template #title>{{ $t('tools.jsonFormatter.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.jsonFormatter.pageSubtitle') }}</template>

        <div class="space-y-5">
          <!-- Input -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="json-input" class="text-sm font-semibold text-gray-700">{{ $t('tools.jsonFormatter.inputLabel') }}</label>
              <button
                class="text-xs text-orange-500 hover:text-orange-600 font-medium"
                @click="loadSample"
              >
                {{ $t('tools.jsonFormatter.loadSample') }}
              </button>
            </div>
            <textarea
              id="json-input"
              v-model="inputJson"
              rows="10"
              :placeholder="$t('tools.jsonFormatter.inputPlaceholder')"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 font-mono text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-y"
              spellcheck="false"
            />
          </div>

          <!-- Options -->
          <div class="flex items-center gap-4">
            <label class="text-sm font-semibold text-gray-700">{{ $t('tools.jsonFormatter.indent') }}:</label>
            <div class="flex gap-2">
              <button
                v-for="opt in indentOptions"
                :key="opt.value"
                class="px-3 py-1.5 rounded-lg border-2 text-sm font-medium transition"
                :class="indent === opt.value
                  ? 'border-orange-400 bg-orange-50 text-orange-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                @click="indent = opt.value"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition disabled:opacity-50"
              :disabled="!inputJson.trim()"
              @click="formatJson"
            >
              {{ $t('tools.jsonFormatter.formatBtn') }}
            </button>
            <button
              class="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-xl transition disabled:opacity-50"
              :disabled="!inputJson.trim()"
              @click="minifyJson"
            >
              {{ $t('tools.jsonFormatter.minifyBtn') }}
            </button>
            <button
              class="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-xl transition disabled:opacity-50 col-span-2 sm:col-span-1"
              :disabled="!inputJson.trim()"
              @click="validateJson"
            >
              {{ $t('tools.jsonFormatter.validateBtn') }}
            </button>
          </div>

          <!-- Validation Status -->
          <div v-if="validationMessage" class="rounded-xl p-4 text-sm font-medium" :class="isValid ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'">
            <div class="flex items-center gap-2">
              <svg v-if="isValid" class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              {{ validationMessage }}
            </div>
          </div>

          <!-- Output -->
          <div v-if="outputJson">
            <div class="flex items-center justify-between mb-2">
              <label class="text-sm font-semibold text-gray-700">{{ $t('tools.jsonFormatter.outputLabel') }}</label>
              <button
                class="inline-flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-600 font-medium"
                @click="copyResult"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {{ copyLabel }}
              </button>
            </div>
            <textarea
              :value="outputJson"
              rows="12"
              readonly
              class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono text-sm text-gray-900 focus:outline-none resize-y"
              spellcheck="false"
            />
          </div>
        </div>

        <!-- SEO Content -->
        <template #seo>
          <h2>How to Format and Validate JSON</h2>
          <ol>
            <li><strong>Paste your JSON</strong> — Enter raw JSON data into the input area, or click "Load Sample" to try with example data.</li>
            <li><strong>Choose an action</strong> — Click "Format" to beautify, "Minify" to compress, or "Validate" to check for errors.</li>
            <li><strong>Copy the result</strong> — Use the copy button to save the formatted output to your clipboard.</li>
          </ol>

          <h2>Benefits of Using ToolFlare JSON Formatter</h2>
          <ul>
            <li><strong>Instant Formatting</strong> — Beautify messy JSON with proper indentation in one click.</li>
            <li><strong>Validation with Error Details</strong> — Get clear error messages pointing to exactly where your JSON is broken.</li>
            <li><strong>Minification</strong> — Compress JSON by removing whitespace for smaller payloads.</li>
            <li><strong>Customizable Indentation</strong> — Choose between 2-space or 4-space indentation.</li>
            <li><strong>Browser-Only Processing</strong> — Your JSON data never leaves your browser. Zero privacy concerns.</li>
          </ul>

          <h2>Frequently Asked Questions (FAQ)</h2>

          <h3>What is JSON?</h3>
          <p>JSON (JavaScript Object Notation) is a lightweight data interchange format. It is easy for humans to read and write and easy for machines to parse and generate. JSON is the most widely used format for API responses and configuration files.</p>

          <h3>Why should I format JSON?</h3>
          <p>Formatted (or "pretty-printed") JSON is much easier to read and debug. Proper indentation and line breaks make it simple to identify the structure, find values, and spot errors in your data.</p>

          <h3>When should I minify JSON?</h3>
          <p>Minified JSON removes all unnecessary whitespace, reducing file size. Use minification for production API payloads, configuration files that are read by machines, or any scenario where bandwidth matters.</p>

          <h3>Is my data safe?</h3>
          <p>Yes. All processing happens entirely in your browser using JavaScript. Your JSON data is never sent to any server or stored anywhere.</p>

          <h3>What does the validator check?</h3>
          <p>The validator parses your input using the standard JSON specification. It checks for syntax errors like missing commas, unmatched brackets, invalid string escaping, and trailing commas.</p>
        </template>

        <!-- Related Tools -->
        <template #related>
          <ToolCard :tool="{ name: $t('tools.base64.name'), description: $t('tools.base64.description'), icon: '🔄', path: '/tools/developer/base64', category: 'Developer' }" />
          <ToolCard :tool="{ name: $t('tools.wordCounter.name'), description: $t('tools.wordCounter.description'), icon: '📝', path: '/tools/text/word-counter', category: 'Text' }" />
          <ToolCard :tool="{ name: $t('tools.metaTagGenerator.name'), description: $t('tools.metaTagGenerator.description'), icon: '🏷️', path: '/tools/seo/meta-tag-generator', category: 'SEO' }" />
        </template>
      </ToolLayout>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('tools.jsonFormatter.seoTitle'),
  description: t('tools.jsonFormatter.seoDescription'),
  ogTitle: t('tools.jsonFormatter.seoTitle'),
  ogDescription: t('tools.jsonFormatter.pageSubtitle'),
})

useSchemaOrg([
  defineSoftwareApplication({
    name: 'ToolFlare JSON Formatter',
    operatingSystem: 'Web',
    applicationCategory: 'DeveloperApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const inputJson = ref('')
const outputJson = ref('')
const validationMessage = ref('')
const isValid = ref(false)
const indent = ref(2)
const copyLabel = ref(t('tools.jsonFormatter.copyBtn'))

const indentOptions = [
  { value: 2, label: '2 Spaces' },
  { value: 4, label: '4 Spaces' },
]

function formatJson() {
  validationMessage.value = ''
  try {
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsed, null, indent.value)
    isValid.value = true
    validationMessage.value = 'Valid JSON — formatted successfully.'
  } catch (e: any) {
    outputJson.value = ''
    isValid.value = false
    validationMessage.value = `Invalid JSON: ${e.message}`
  }
}

function minifyJson() {
  validationMessage.value = ''
  try {
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsed)
    isValid.value = true
    validationMessage.value = 'Valid JSON — minified successfully.'
  } catch (e: any) {
    outputJson.value = ''
    isValid.value = false
    validationMessage.value = `Invalid JSON: ${e.message}`
  }
}

function validateJson() {
  try {
    JSON.parse(inputJson.value)
    isValid.value = true
    validationMessage.value = 'Valid JSON! The structure is correct.'
  } catch (e: any) {
    isValid.value = false
    validationMessage.value = `Invalid JSON: ${e.message}`
  }
}

function loadSample() {
  inputJson.value = JSON.stringify({
    name: 'ToolFlare',
    version: '1.0.0',
    description: 'Free online developer tools',
    features: ['JSON Formatter', 'Base64 Encoder', 'Password Generator'],
    config: {
      theme: 'orange',
      analytics: true,
      maxFileSize: '50MB',
    },
    stats: {
      tools: 20,
      users: 15000,
      uptime: 99.9,
    },
  })
}

async function copyResult() {
  if (!outputJson.value) return
  try {
    await navigator.clipboard.writeText(outputJson.value)
    copyLabel.value = t('common.copySuccess')
    setTimeout(() => { copyLabel.value = t('tools.jsonFormatter.copyBtn') }, 2000)
  } catch {
    copyLabel.value = 'Failed'
    setTimeout(() => { copyLabel.value = t('tools.jsonFormatter.copyBtn') }, 2000)
  }
}
</script>
