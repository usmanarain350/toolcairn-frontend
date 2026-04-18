<template>
  <div>
    <NuxtLayout name="tool">
      <ToolLayout>
        <template #title>{{ $t('tools.metaTagGenerator.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.metaTagGenerator.pageSubtitle') }}</template>

        <div class="space-y-6">
          <!-- Basic Meta Tags -->
          <div>
            <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span class="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              Basic Meta Tags
            </h3>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label for="meta-title" class="block text-sm font-medium text-gray-600 mb-1">
                  {{ $t('tools.metaTagGenerator.title') }}
                  <span class="text-gray-400 font-normal">({{ meta.title.length }}/60)</span>
                </label>
                <input
                  id="meta-title"
                  v-model="meta.title"
                  type="text"
                  placeholder="My Awesome Page — Brand Name"
                  maxlength="60"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label for="meta-desc" class="block text-sm font-medium text-gray-600 mb-1">
                  {{ $t('tools.metaTagGenerator.description') }}
                  <span class="text-gray-400 font-normal">({{ meta.description.length }}/160)</span>
                </label>
                <textarea
                  id="meta-desc"
                  v-model="meta.description"
                  rows="2"
                  placeholder="A concise description of your page content for search engines..."
                  maxlength="160"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="meta-keywords" class="block text-sm font-medium text-gray-600 mb-1">{{ $t('tools.metaTagGenerator.keywords') }}</label>
                  <input
                    id="meta-keywords"
                    v-model="meta.keywords"
                    type="text"
                    placeholder="keyword1, keyword2, keyword3"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="meta-author" class="block text-sm font-medium text-gray-600 mb-1">{{ $t('tools.metaTagGenerator.author') }}</label>
                  <input
                    id="meta-author"
                    v-model="meta.author"
                    type="text"
                    placeholder="Author name or company"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="meta-viewport" class="block text-sm font-medium text-gray-600 mb-1">Viewport</label>
                  <select
                    id="meta-viewport"
                    v-model="meta.viewport"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="width=device-width, initial-scale=1.0">Responsive (recommended)</option>
                    <option value="width=device-width, initial-scale=1.0, maximum-scale=1.0">Fixed scale</option>
                    <option value="">None</option>
                  </select>
                </div>
                <div>
                  <label for="meta-robots" class="block text-sm font-medium text-gray-600 mb-1">Robots</label>
                  <select
                    id="meta-robots"
                    v-model="meta.robots"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="index, follow">Index, Follow (default)</option>
                    <option value="noindex, follow">Noindex, Follow</option>
                    <option value="index, nofollow">Index, Nofollow</option>
                    <option value="noindex, nofollow">Noindex, Nofollow</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Open Graph -->
          <div>
            <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span class="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              Open Graph (Facebook, LinkedIn)
            </h3>
            <div class="grid grid-cols-1 gap-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="og-title" class="block text-sm font-medium text-gray-600 mb-1">{{ $t('tools.metaTagGenerator.ogTitle') }}</label>
                  <input
                    id="og-title"
                    v-model="og.title"
                    type="text"
                    :placeholder="meta.title || 'Open Graph title'"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="og-url" class="block text-sm font-medium text-gray-600 mb-1">{{ $t('tools.metaTagGenerator.ogUrl') }}</label>
                  <input
                    id="og-url"
                    v-model="og.url"
                    type="url"
                    placeholder="https://example.com/page"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label for="og-desc" class="block text-sm font-medium text-gray-600 mb-1">{{ $t('tools.metaTagGenerator.ogDescription') }}</label>
                <textarea
                  id="og-desc"
                  v-model="og.description"
                  rows="2"
                  :placeholder="meta.description || 'Open Graph description for social sharing'"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label for="og-image" class="block text-sm font-medium text-gray-600 mb-1">{{ $t('tools.metaTagGenerator.ogImage') }}</label>
                <input
                  id="og-image"
                  v-model="og.image"
                  type="url"
                  placeholder="https://example.com/image.jpg (1200x630 recommended)"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- Twitter Card -->
          <div>
            <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span class="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              Twitter Card
            </h3>
            <div class="grid grid-cols-1 gap-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="tw-card" class="block text-sm font-medium text-gray-600 mb-1">{{ $t('tools.metaTagGenerator.twitterCard') }}</label>
                  <select
                    id="tw-card"
                    v-model="twitter.card"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary with Large Image</option>
                    <option value="app">App</option>
                    <option value="player">Player</option>
                  </select>
                </div>
                <div>
                  <label for="tw-site" class="block text-sm font-medium text-gray-600 mb-1">{{ $t('tools.metaTagGenerator.twitterSite') }}</label>
                  <input
                    id="tw-site"
                    v-model="twitter.site"
                    type="text"
                    placeholder="@yourbrand"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="tw-title" class="block text-sm font-medium text-gray-600 mb-1">Twitter Title</label>
                  <input
                    id="tw-title"
                    v-model="twitter.title"
                    type="text"
                    :placeholder="meta.title || 'Twitter card title'"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label for="tw-desc" class="block text-sm font-medium text-gray-600 mb-1">Twitter Description</label>
                  <input
                    id="tw-desc"
                    v-model="twitter.description"
                    type="text"
                    :placeholder="meta.description || 'Twitter card description'"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Generated HTML Preview -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span class="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                {{ $t('tools.metaTagGenerator.preview') }}
              </h3>
              <button
                class="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                @click="copyHtml"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {{ copyLabel }}
              </button>
            </div>
            <pre class="bg-gray-900 text-green-400 rounded-xl p-5 text-sm font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed"><code>{{ generatedHtml }}</code></pre>
          </div>
        </div>

        <!-- SEO Content -->
        <template #seo>
          <h2>How to Generate Meta Tags</h2>
          <ol>
            <li><strong>Fill in basic info</strong> — Enter your page title, description, keywords, and author. Character counters help you stay within recommended limits.</li>
            <li><strong>Add Open Graph tags</strong> — Set OG title, description, image, and URL for rich social media previews on Facebook, LinkedIn, and other platforms.</li>
            <li><strong>Configure Twitter Card</strong> — Choose a card type and add Twitter-specific metadata for optimized sharing on X (Twitter).</li>
            <li><strong>Copy the HTML</strong> — Click "Copy" to get the generated meta tags and paste them into your page's &lt;head&gt; section.</li>
          </ol>

          <h2>Benefits of Using Toolcairn Meta Tag Generator</h2>
          <ul>
            <li><strong>Complete Coverage</strong> — Generates basic SEO tags, Open Graph tags, and Twitter Card tags all in one place.</li>
            <li><strong>Character Counters</strong> — Stay within Google's recommended title (60 chars) and description (160 chars) limits.</li>
            <li><strong>Live Preview</strong> — See the generated HTML update in real-time as you type.</li>
            <li><strong>Copy-Ready Code</strong> — Generated HTML is properly formatted and ready to paste into your website.</li>
            <li><strong>Best Practices</strong> — Includes recommended defaults like responsive viewport and robots directives.</li>
          </ul>

          <h2>Frequently Asked Questions (FAQ)</h2>

          <h3>What are meta tags?</h3>
          <p>Meta tags are HTML elements that provide metadata about a web page. They are placed in the &lt;head&gt; section of your HTML and help search engines understand your content, control how your pages appear in search results, and define how your content looks when shared on social media.</p>

          <h3>What is the ideal title length?</h3>
          <p>Google typically displays the first 50-60 characters of a title tag. Keeping your title under 60 characters ensures it won't be truncated in search results. Include your target keyword near the beginning for best results.</p>

          <h3>What is the ideal description length?</h3>
          <p>Meta descriptions should be between 120-160 characters. Google may display up to 160 characters, but often truncates at around 155. Write a compelling description that encourages clicks.</p>

          <h3>What are Open Graph tags?</h3>
          <p>Open Graph (OG) tags control how your content appears when shared on social media platforms like Facebook, LinkedIn, and Pinterest. They define the title, description, and image that appear in the social media preview card.</p>

          <h3>What is a Twitter Card?</h3>
          <p>Twitter Cards are special meta tags that control how your content appears when shared on X (Twitter). "Summary with Large Image" is the most popular type, showing a large image preview with your title and description.</p>
        </template>

        <!-- Related Tools -->
        <template #related>
          <ToolCard :tool="{ name: $t('tools.slugGenerator.name'), description: $t('tools.slugGenerator.description'), icon: '🔗', path: '/tools/seo/slug-generator', category: 'SEO' }" />
          <ToolCard :tool="{ name: $t('tools.wordCounter.name'), description: $t('tools.wordCounter.description'), icon: '📝', path: '/tools/text/word-counter', category: 'Text' }" />
          <ToolCard :tool="{ name: $t('tools.jsonFormatter.name'), description: $t('tools.jsonFormatter.description'), icon: '{}', path: '/tools/developer/json-formatter', category: 'Developer' }" />
        </template>
      </ToolLayout>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('tools.metaTagGenerator.seoTitle'),
  description: t('tools.metaTagGenerator.seoDescription'),
  ogTitle: t('tools.metaTagGenerator.seoTitle'),
  ogDescription: t('tools.metaTagGenerator.pageSubtitle'),
})

useSchemaOrg([
  defineSoftwareApp({
    name: 'Toolcairn Meta Tag Generator',
    operatingSystem: 'Web',
    applicationCategory: 'DeveloperApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const copyLabel = ref(t('tools.metaTagGenerator.copyBtn'))

const meta = reactive({
  title: '',
  description: '',
  keywords: '',
  author: '',
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
})

const og = reactive({
  title: '',
  description: '',
  image: '',
  url: '',
})

const twitter = reactive({
  card: 'summary_large_image',
  site: '',
  title: '',
  description: '',
})

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const generatedHtml = computed(() => {
  const lines: string[] = ['<!-- Basic Meta Tags -->']

  if (meta.title) {
    lines.push(`<title>${escapeHtml(meta.title)}</title>`)
  }
  if (meta.description) {
    lines.push(`<meta name="description" content="${escapeHtml(meta.description)}" />`)
  }
  if (meta.keywords) {
    lines.push(`<meta name="keywords" content="${escapeHtml(meta.keywords)}" />`)
  }
  if (meta.author) {
    lines.push(`<meta name="author" content="${escapeHtml(meta.author)}" />`)
  }
  if (meta.viewport) {
    lines.push(`<meta name="viewport" content="${escapeHtml(meta.viewport)}" />`)
  }
  if (meta.robots) {
    lines.push(`<meta name="robots" content="${escapeHtml(meta.robots)}" />`)
  }

  const ogTitle = og.title || meta.title
  const ogDesc = og.description || meta.description

  if (ogTitle || ogDesc || og.image || og.url) {
    lines.push('')
    lines.push('<!-- Open Graph / Facebook -->')
    lines.push('<meta property="og:type" content="website" />')
    if (ogTitle) lines.push(`<meta property="og:title" content="${escapeHtml(ogTitle)}" />`)
    if (ogDesc) lines.push(`<meta property="og:description" content="${escapeHtml(ogDesc)}" />`)
    if (og.image) lines.push(`<meta property="og:image" content="${escapeHtml(og.image)}" />`)
    if (og.url) lines.push(`<meta property="og:url" content="${escapeHtml(og.url)}" />`)
  }

  const twTitle = twitter.title || ogTitle || meta.title
  const twDesc = twitter.description || ogDesc || meta.description

  if (twitter.card || twitter.site || twTitle || twDesc) {
    lines.push('')
    lines.push('<!-- Twitter Card -->')
    if (twitter.card) lines.push(`<meta name="twitter:card" content="${escapeHtml(twitter.card)}" />`)
    if (twitter.site) lines.push(`<meta name="twitter:site" content="${escapeHtml(twitter.site)}" />`)
    if (twTitle) lines.push(`<meta name="twitter:title" content="${escapeHtml(twTitle)}" />`)
    if (twDesc) lines.push(`<meta name="twitter:description" content="${escapeHtml(twDesc)}" />`)
    if (og.image) lines.push(`<meta name="twitter:image" content="${escapeHtml(og.image)}" />`)
  }

  return lines.join('\n')
})

async function copyHtml() {
  try {
    await navigator.clipboard.writeText(generatedHtml.value)
    copyLabel.value = t('common.copySuccess')
    setTimeout(() => { copyLabel.value = t('tools.metaTagGenerator.copyBtn') }, 2000)
  } catch {
    copyLabel.value = 'Failed'
    setTimeout(() => { copyLabel.value = t('tools.metaTagGenerator.copyBtn') }, 2000)
  }
}
</script>
