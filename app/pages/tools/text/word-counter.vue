<template>
  <div>
    <NuxtLayout name="tool">
      <ToolLayout>
        <template #title>{{ $t('tools.wordCounter.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.wordCounter.pageSubtitle') }}</template>

        <div class="space-y-5">
          <!-- Text Input -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="text-input" class="text-sm font-semibold text-gray-700">Your Text</label>
              <button
                v-if="inputText"
                class="text-xs text-gray-400 hover:text-red-500 font-medium transition"
                @click="inputText = ''"
              >
                {{ $t('tools.wordCounter.clearBtn') }}
              </button>
            </div>
            <textarea
              id="text-input"
              v-model="inputText"
              rows="12"
              :placeholder="$t('tools.wordCounter.placeholder')"
              class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-y text-base leading-relaxed"
            />
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center"
            >
              <p class="text-2xl font-bold text-orange-500">{{ stat.value }}</p>
              <p class="text-xs text-gray-500 mt-1 font-medium">{{ stat.label }}</p>
            </div>
          </div>

          <!-- Reading & Speaking Time -->
          <div class="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <h3 class="text-sm font-semibold text-orange-700 mb-3">Estimated Time</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-lg font-bold text-gray-900">{{ readingTime }}</p>
                <p class="text-xs text-gray-500">Reading time (200 wpm)</p>
              </div>
              <div>
                <p class="text-lg font-bold text-gray-900">{{ speakingTime }}</p>
                <p class="text-xs text-gray-500">Speaking time (130 wpm)</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SEO Content -->
        <template #seo>
          <h2>How to Use the Word Counter</h2>
          <ol>
            <li><strong>Enter your text</strong> — Type directly or paste text from any source into the input area.</li>
            <li><strong>View real-time stats</strong> — See word count, character count, sentences, paragraphs, and more update instantly as you type.</li>
            <li><strong>Check reading time</strong> — Estimated reading and speaking times help you gauge content length for articles, speeches, and presentations.</li>
          </ol>

          <h2>Benefits of Using ToolFlare Word Counter</h2>
          <ul>
            <li><strong>Real-Time Analysis</strong> — All statistics update instantly as you type or edit your text.</li>
            <li><strong>Comprehensive Stats</strong> — Track words, characters (with and without spaces), sentences, and paragraphs all at once.</li>
            <li><strong>Reading Time Estimate</strong> — Know how long your content will take to read at 200 words per minute.</li>
            <li><strong>Speaking Time Estimate</strong> — Perfect for speech preparation at 130 words per minute.</li>
            <li><strong>No Signup Required</strong> — Use immediately without creating an account. Your text stays in your browser.</li>
          </ul>

          <h2>Frequently Asked Questions (FAQ)</h2>

          <h3>How are words counted?</h3>
          <p>Words are counted by splitting text on whitespace boundaries. Hyphenated words are counted as single words. Multiple consecutive spaces are treated as a single separator.</p>

          <h3>How is reading time calculated?</h3>
          <p>Reading time is based on an average adult reading speed of 200 words per minute. Speaking time uses 130 words per minute, which is a comfortable speaking pace for presentations.</p>

          <h3>Does it count characters with or without spaces?</h3>
          <p>Both! The tool shows total characters (including spaces) and characters without spaces, so you have both metrics available.</p>

          <h3>How are sentences counted?</h3>
          <p>Sentences are counted by detecting sentence-ending punctuation (periods, question marks, exclamation marks). Abbreviations like "Dr." or "U.S.A." may affect the count slightly.</p>

          <h3>Is there a text length limit?</h3>
          <p>No hard limit. The tool handles long documents efficiently since all processing happens in your browser.</p>
        </template>

        <!-- Related Tools -->
        <template #related>
          <ToolCard :tool="{ name: $t('tools.slugGenerator.name'), description: $t('tools.slugGenerator.description'), icon: '🔗', path: '/tools/seo/slug-generator', category: 'SEO' }" />
          <ToolCard :tool="{ name: $t('tools.metaTagGenerator.name'), description: $t('tools.metaTagGenerator.description'), icon: '🏷️', path: '/tools/seo/meta-tag-generator', category: 'SEO' }" />
          <ToolCard :tool="{ name: $t('tools.jsonFormatter.name'), description: $t('tools.jsonFormatter.description'), icon: '{}', path: '/tools/developer/json-formatter', category: 'Developer' }" />
        </template>
      </ToolLayout>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('tools.wordCounter.seoTitle'),
  description: t('tools.wordCounter.seoDescription'),
  ogTitle: t('tools.wordCounter.seoTitle'),
  ogDescription: t('tools.wordCounter.pageSubtitle'),
})

useSchemaOrg([
  defineSoftwareApp({
    name: 'ToolFlare Word Counter',
    operatingSystem: 'Web',
    applicationCategory: 'UtilitiesApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const inputText = ref('')

const wordCount = computed(() => {
  const text = inputText.value.trim()
  if (!text) return 0
  return text.split(/\s+/).filter(w => w.length > 0).length
})

const charCount = computed(() => inputText.value.length)

const charNoSpaces = computed(() => inputText.value.replace(/\s/g, '').length)

const sentenceCount = computed(() => {
  const text = inputText.value.trim()
  if (!text) return 0
  const matches = text.match(/[.!?]+(?=\s|$)/g)
  return matches ? matches.length : 0
})

const paragraphCount = computed(() => {
  const text = inputText.value.trim()
  if (!text) return 0
  return text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
})

const readingTime = computed(() => formatTime(wordCount.value / 200))
const speakingTime = computed(() => formatTime(wordCount.value / 130))

function formatTime(minutes: number): string {
  if (minutes < 1) {
    const seconds = Math.ceil(minutes * 60)
    return seconds <= 0 ? '0 sec' : `${seconds} sec`
  }
  const mins = Math.floor(minutes)
  const secs = Math.round((minutes - mins) * 60)
  if (mins === 0) return `${secs} sec`
  if (secs === 0) return `${mins} min`
  return `${mins} min ${secs} sec`
}

const stats = computed(() => [
  { label: t('tools.wordCounter.words'), value: wordCount.value },
  { label: t('tools.wordCounter.characters'), value: charCount.value },
  { label: t('tools.wordCounter.charsNoSpaces'), value: charNoSpaces.value },
  { label: t('tools.wordCounter.sentences'), value: sentenceCount.value },
  { label: t('tools.wordCounter.paragraphs'), value: paragraphCount.value },
  { label: t('tools.wordCounter.readingTime'), value: readingTime.value },
])
</script>
