<template>
  <div>
    <NuxtLayout name="tool">
      <ToolLayout>
        <template #title>{{ $t('tools.slugGenerator.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.slugGenerator.pageSubtitle') }}</template>

        <div class="space-y-5">
          <!-- Input -->
          <div>
            <label for="slug-input" class="block text-sm font-semibold text-gray-700 mb-2">{{ $t('tools.slugGenerator.inputLabel') }}</label>
            <input
              id="slug-input"
              v-model="inputText"
              type="text"
              :placeholder="$t('tools.slugGenerator.inputPlaceholder')"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-lg"
            />
          </div>

          <!-- Options -->
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center gap-3">
              <label class="text-sm font-semibold text-gray-700">{{ $t('tools.slugGenerator.separator') }}:</label>
              <div class="flex gap-2">
                <button
                  class="px-4 py-2 rounded-lg border-2 text-sm font-medium transition"
                  :class="separator === '-'
                    ? 'border-orange-400 bg-orange-50 text-orange-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                  @click="separator = '-'"
                >
                  {{ $t('tools.slugGenerator.hyphen') }}
                </button>
                <button
                  class="px-4 py-2 rounded-lg border-2 text-sm font-medium transition"
                  :class="separator === '_'
                    ? 'border-orange-400 bg-orange-50 text-orange-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'"
                  @click="separator = '_'"
                >
                  {{ $t('tools.slugGenerator.underscore') }}
                </button>
              </div>
            </div>

            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="lowercase"
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span class="text-sm font-medium text-gray-700">{{ $t('tools.slugGenerator.lowercase') }}</span>
            </label>
          </div>

          <!-- Output -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-sm font-semibold text-gray-700">{{ $t('tools.slugGenerator.outputLabel') }}</label>
              <button
                v-if="slug"
                class="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition"
                @click="copySlug"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {{ copyLabel }}
              </button>
            </div>
            <div class="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono text-lg text-gray-900 min-h-[48px] flex items-center break-all">
              <span v-if="slug" class="text-orange-600">{{ slug }}</span>
              <span v-else class="text-gray-400">your-slug-will-appear-here</span>
            </div>
          </div>

          <!-- URL Preview -->
          <div v-if="slug" class="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p class="text-sm font-medium text-orange-700 mb-1">URL Preview</p>
            <p class="text-sm text-gray-700 font-mono break-all">
              https://example.com/<span class="text-orange-600 font-semibold">{{ slug }}</span>
            </p>
          </div>

          <!-- Stats -->
          <div v-if="slug" class="flex flex-wrap gap-4 text-sm text-gray-500">
            <span><strong class="text-gray-700">{{ slug.length }}</strong> characters</span>
            <span class="text-gray-300">|</span>
            <span><strong class="text-gray-700">{{ slug.split(separator).length }}</strong> words</span>
            <span class="text-gray-300">|</span>
            <span>
              Separator:
              <strong class="text-gray-700">{{ separator === '-' ? 'Hyphen' : 'Underscore' }}</strong>
            </span>
          </div>
        </div>

        <!-- SEO Content -->
        <template #seo>
          <h2>How to Generate a URL Slug</h2>
          <ol>
            <li><strong>Enter your text</strong> — Type or paste any title, headline, or text into the input field.</li>
            <li><strong>Choose your options</strong> — Select a separator (hyphen or underscore) and toggle lowercase on or off.</li>
            <li><strong>Copy your slug</strong> — The slug updates in real-time. Click "Copy" to save it to your clipboard.</li>
          </ol>

          <h2>Benefits of Using Toolcairn Slug Generator</h2>
          <ul>
            <li><strong>Real-Time Conversion</strong> — See your slug update instantly as you type, no button click needed.</li>
            <li><strong>SEO-Friendly</strong> — Generates clean, readable slugs that follow URL best practices for search engine optimization.</li>
            <li><strong>Smart Cleaning</strong> — Automatically removes special characters, accents, extra spaces, and trailing separators.</li>
            <li><strong>Customizable</strong> — Choose between hyphens and underscores, with optional lowercase conversion.</li>
            <li><strong>URL Preview</strong> — See how your slug will look as part of a complete URL.</li>
          </ul>

          <h2>Frequently Asked Questions (FAQ)</h2>

          <h3>What is a URL slug?</h3>
          <p>A URL slug is the part of a web address that comes after the domain name and identifies a specific page. For example, in "example.com/my-blog-post", the slug is "my-blog-post". Good slugs are short, descriptive, and use hyphens to separate words.</p>

          <h3>Should I use hyphens or underscores?</h3>
          <p>Google recommends using hyphens (-) rather than underscores (_) in URLs. Hyphens are treated as word separators by search engines, while underscores are not. For SEO, hyphens are the standard choice.</p>

          <h3>How long should a URL slug be?</h3>
          <p>Keep slugs between 3-5 words (50-60 characters) for the best balance of readability and SEO. Shorter slugs are easier to remember, share, and tend to perform better in search rankings.</p>

          <h3>Does case matter in slugs?</h3>
          <p>URLs are technically case-sensitive, but most web servers treat them as case-insensitive. Using lowercase is the universal convention for URL slugs. It prevents duplicate content issues and is easier to type.</p>

          <h3>What characters are removed?</h3>
          <p>The generator removes all special characters, punctuation, accented letters (converted to ASCII equivalents), and extra whitespace. Only alphanumeric characters and the chosen separator are kept.</p>
        </template>

        <!-- Related Tools -->
        <template #related>
          <ToolCard :tool="{ name: $t('tools.metaTagGenerator.name'), description: $t('tools.metaTagGenerator.description'), icon: '🏷️', path: '/tools/seo/meta-tag-generator', category: 'SEO' }" />
          <ToolCard :tool="{ name: $t('tools.wordCounter.name'), description: $t('tools.wordCounter.description'), icon: '📝', path: '/tools/text/word-counter', category: 'Text' }" />
          <ToolCard :tool="{ name: $t('tools.qrCode.name'), description: $t('tools.qrCode.description'), icon: '📱', path: '/tools/utility/qr-code', category: 'Utility' }" />
        </template>
      </ToolLayout>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('tools.slugGenerator.seoTitle'),
  description: t('tools.slugGenerator.seoDescription'),
  ogTitle: t('tools.slugGenerator.seoTitle'),
  ogDescription: t('tools.slugGenerator.pageSubtitle'),
})

useSchemaOrg([
  defineSoftwareApp({
    name: 'Toolcairn URL Slug Generator',
    operatingSystem: 'Web',
    applicationCategory: 'DeveloperApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const inputText = ref('')
const separator = ref('-')
const lowercase = ref(true)
const copyLabel = ref(t('tools.slugGenerator.copyBtn'))

const slug = computed(() => {
  let text = inputText.value.trim()
  if (!text) return ''

  // Normalize unicode characters (accented to ASCII)
  text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Convert to lowercase if enabled
  if (lowercase.value) {
    text = text.toLowerCase()
  }

  // Replace spaces and non-alphanumeric characters with separator
  text = text
    .replace(/[^a-zA-Z0-9\s]/g, '')   // Remove special characters
    .replace(/\s+/g, separator.value)   // Replace spaces with separator
    .replace(new RegExp(`\\${separator.value}+`, 'g'), separator.value) // Remove consecutive separators
    .replace(new RegExp(`^\\${separator.value}|\\${separator.value}$`, 'g'), '') // Trim separators from ends

  return text
})

async function copySlug() {
  if (!slug.value) return
  try {
    await navigator.clipboard.writeText(slug.value)
    copyLabel.value = t('common.copySuccess')
    setTimeout(() => { copyLabel.value = t('tools.slugGenerator.copyBtn') }, 2000)
  } catch {
    copyLabel.value = 'Failed'
    setTimeout(() => { copyLabel.value = t('tools.slugGenerator.copyBtn') }, 2000)
  }
}
</script>
