<template>
      <ToolLayout>
        <template #title>{{ $t('tools.qrCode.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.qrCode.pageSubtitle') }}</template>

        <!-- Input -->
        <div class="space-y-5">
          <div>
            <label for="qr-input" class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('tools.qrCode.inputLabel') }}</label>
            <input
              id="qr-input"
              v-model="inputText"
              type="text"
              :placeholder="$t('tools.qrCode.inputPlaceholder')"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>

          <!-- Size Selector -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('tools.qrCode.size') }}</label>
            <div class="flex gap-3">
              <button
                v-for="s in sizes"
                :key="s.value"
                class="px-4 py-2 rounded-lg border-2 text-sm font-medium transition"
                :class="selectedSize === s.value
                  ? 'border-orange-400 bg-orange-50 text-orange-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                @click="selectedSize = s.value"
              >
                {{ s.label }}
              </button>
            </div>
          </div>

          <!-- Generate Button -->
          <button
            class="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3.5 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            :disabled="!inputText.trim()"
            @click="generateQr"
          >
            {{ $t('tools.qrCode.generateBtn') }}
          </button>

          <!-- QR Code Output -->
          <div v-if="qrUrl" class="text-center space-y-4 pt-4">
            <div class="inline-block bg-white border border-gray-200 rounded-xl p-4">
              <img
                :src="qrUrl"
                :alt="`QR Code for: ${inputText}`"
                :width="selectedSize"
                :height="selectedSize"
                class="mx-auto"
              />
            </div>

            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                :href="qrUrl"
                :download="`qrcode-${selectedSize}x${selectedSize}.png`"
                class="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {{ $t('tools.qrCode.downloadBtn') }}
              </a>
              <button
                class="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-xl transition"
                @click="copyUrl"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {{ copyLabel }}
              </button>
            </div>
          </div>
        </div>

        <!-- SEO Content -->
        <template #seo>
          <h2>How to Generate a QR Code</h2>
          <ol>
            <li><strong>Enter your content</strong> — Type or paste any URL, text, email address, or phone number into the input field.</li>
            <li><strong>Choose a size</strong> — Select from Small (150x150), Medium (300x300), or Large (500x500) pixel dimensions.</li>
            <li><strong>Generate and download</strong> — Click "Generate QR Code" and download the PNG image instantly.</li>
          </ol>

          <h2>Benefits of Using Toolcairn QR Code Generator</h2>
          <ul>
            <li><strong>100% Free</strong> — No hidden fees, no watermarks, no premium plan needed.</li>
            <li><strong>No Signup Required</strong> — Generate QR codes immediately without creating an account.</li>
            <li><strong>Instant Download</strong> — Download your QR code as a high-quality PNG image.</li>
            <li><strong>Multiple Sizes</strong> — Choose the perfect resolution for print, web, or social media.</li>
            <li><strong>Works with Any Content</strong> — URLs, text, email addresses, phone numbers, WiFi credentials, and more.</li>
          </ul>

          <h2>Frequently Asked Questions (FAQ)</h2>

          <h3>What can I encode in a QR code?</h3>
          <p>You can encode any text content including URLs, plain text, email addresses, phone numbers, WiFi network credentials, vCard contacts, and more. The most common use is encoding website URLs.</p>

          <h3>What size should I choose?</h3>
          <p>For web use, 300x300 pixels is ideal. For print materials like posters or business cards, choose 500x500 pixels. The 150x150 option works well for small digital applications.</p>

          <h3>Is there a character limit?</h3>
          <p>QR codes can encode up to about 4,296 alphanumeric characters. For best scanning reliability, keep your content under 500 characters.</p>

          <h3>Can I customize the QR code colors?</h3>
          <p>The current generator creates standard black-and-white QR codes for maximum scan compatibility. Color customization is coming in a future update.</p>

          <h3>Do the QR codes expire?</h3>
          <p>No. QR codes generated here are static and will never expire. The image contains all the data directly, so it works forever.</p>
        </template>

        <!-- Related Tools -->
        <template #related>
          <ToolCard :tool="{ name: $t('tools.passwordGenerator.name'), description: $t('tools.passwordGenerator.description'), icon: '🔐', path: '/tools/utility/password-generator', category: 'Utility' }" />
          <ToolCard :tool="{ name: $t('tools.base64.name'), description: $t('tools.base64.description'), icon: '🔄', path: '/tools/developer/base64', category: 'Developer' }" />
          <ToolCard :tool="{ name: $t('tools.slugGenerator.name'), description: $t('tools.slugGenerator.description'), icon: '🔗', path: '/tools/seo/slug-generator', category: 'SEO' }" />
        </template>
      </ToolLayout>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'tool' })

const { t } = useI18n()

useToolSeo({
  name: t('tools.qrCode.name'),
  description: t('tools.qrCode.seoDescription'),
  path: '/tools/utility/qr-code',
})

useSchemaOrg([
  defineSoftwareApp({
    name: 'Toolcairn QR Code Generator',
    operatingSystem: 'Web',
    applicationCategory: 'UtilitiesApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const inputText = ref('')
const selectedSize = ref(300)
const qrUrl = ref('')
const copyLabel = ref(t('tools.qrCode.copyUrl'))

const sizes = [
  { value: 150, label: 'Small (150px)' },
  { value: 300, label: 'Medium (300px)' },
  { value: 500, label: 'Large (500px)' },
]

function generateQr() {
  if (!inputText.value.trim()) return
  const encoded = encodeURIComponent(inputText.value.trim())
  qrUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=${selectedSize.value}x${selectedSize.value}&data=${encoded}`
}

async function copyUrl() {
  if (!qrUrl.value) return
  try {
    await navigator.clipboard.writeText(qrUrl.value)
    copyLabel.value = t('common.copySuccess')
    setTimeout(() => { copyLabel.value = t('tools.qrCode.copyUrl') }, 2000)
  } catch {
    copyLabel.value = 'Failed'
    setTimeout(() => { copyLabel.value = t('tools.qrCode.copyUrl') }, 2000)
  }
}
</script>
