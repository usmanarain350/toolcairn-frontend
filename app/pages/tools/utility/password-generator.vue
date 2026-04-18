<template>
      <ToolLayout>
        <template #title>{{ $t('tools.passwordGenerator.pageTitle') }}</template>
        <template #subtitle>{{ $t('tools.passwordGenerator.pageSubtitle') }}</template>

        <div class="space-y-6">
          <!-- Generated Password Display -->
          <div class="relative">
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 pr-24 font-mono text-lg text-gray-900 break-all min-h-[56px] flex items-center">
              {{ password || $t('tools.passwordGenerator.generateBtn') }}
            </div>
            <button
              v-if="password"
              class="absolute top-1/2 right-3 -translate-y-1/2 inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-3 py-2 rounded-lg transition"
              @click="copyPassword"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {{ copyLabel }}
            </button>
          </div>

          <!-- Strength Indicator -->
          <div v-if="password">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-sm font-medium text-gray-600">{{ $t('tools.passwordGenerator.strength') }}</span>
              <span class="text-sm font-semibold" :class="strengthColor">{{ strengthLabel }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="h-2.5 rounded-full transition-all duration-300"
                :class="strengthBarColor"
                :style="{ width: strengthPercent + '%' }"
              />
            </div>
          </div>

          <!-- Length Slider -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="length" class="text-sm font-semibold text-gray-700">{{ $t('tools.passwordGenerator.length') }}</label>
              <span class="text-sm font-bold text-orange-500 bg-orange-50 px-2.5 py-0.5 rounded-full">{{ length }}</span>
            </div>
            <input
              id="length"
              v-model.number="length"
              type="range"
              min="8"
              max="64"
              class="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-orange-500"
            />
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>8</span>
              <span>64</span>
            </div>
          </div>

          <!-- Character Options -->
          <div>
            <h3 class="text-sm font-semibold text-gray-700 mb-3">Character Types</h3>
            <div class="grid grid-cols-2 gap-3">
              <label
                v-for="opt in charOptions"
                :key="opt.key"
                class="flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition"
                :class="opt.enabled.value ? 'border-orange-300 bg-orange-50' : 'border-gray-200'"
              >
                <input
                  v-model="opt.enabled.value"
                  type="checkbox"
                  class="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  :disabled="isLastEnabled(opt.key)"
                />
                <div>
                  <span class="text-sm font-medium text-gray-900">{{ opt.label }}</span>
                  <span class="block text-xs text-gray-400">{{ opt.example }}</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Generate Button -->
          <button
            class="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition text-lg"
            @click="generatePassword"
          >
            {{ $t('tools.passwordGenerator.generateBtn') }}
          </button>
        </div>

        <!-- SEO Content -->
        <template #seo>
          <h2>How to Generate a Secure Password</h2>
          <ol>
            <li><strong>Set the length</strong> — Use the slider to choose a password length between 8 and 64 characters. Longer passwords are more secure.</li>
            <li><strong>Choose character types</strong> — Toggle uppercase, lowercase, numbers, and symbols on or off to match your requirements.</li>
            <li><strong>Generate and copy</strong> — Click "Generate Password" and use the copy button to save it to your clipboard.</li>
          </ol>

          <h2>Why Use a Password Generator?</h2>
          <ul>
            <li><strong>Truly Random</strong> — Computer-generated passwords are far more secure than human-created ones.</li>
            <li><strong>Customizable</strong> — Adjust length and character types to meet any password policy.</li>
            <li><strong>No Storage</strong> — Passwords are generated in your browser and never sent to any server.</li>
            <li><strong>Strength Indicator</strong> — Visual feedback helps you understand how secure your password is.</li>
            <li><strong>Instant Copy</strong> — One-click copy to clipboard for easy use with password managers.</li>
          </ul>

          <h2>Frequently Asked Questions (FAQ)</h2>

          <h3>Is this password generator secure?</h3>
          <p>Yes. Passwords are generated entirely in your browser using the Web Crypto API's cryptographically secure random number generator. No data is sent to any server.</p>

          <h3>What makes a strong password?</h3>
          <p>A strong password is at least 12 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and symbols. Our strength indicator helps you gauge your password's security.</p>

          <h3>How long should my password be?</h3>
          <p>We recommend at least 16 characters for important accounts. For maximum security, use 20 or more characters with all character types enabled.</p>

          <h3>Should I use a password manager?</h3>
          <p>Absolutely. A password manager lets you use unique, strong passwords for every account without needing to remember them. Generate a strong password here, then save it in your password manager.</p>

          <h3>Can I generate passwords without symbols?</h3>
          <p>Yes. You can toggle any character type on or off. At least one type must remain enabled.</p>
        </template>

        <!-- Related Tools -->
        <template #related>
          <ToolCard :tool="{ name: $t('tools.qrCode.name'), description: $t('tools.qrCode.description'), icon: '📱', path: '/tools/utility/qr-code', category: 'Utility' }" />
          <ToolCard :tool="{ name: $t('tools.base64.name'), description: $t('tools.base64.description'), icon: '🔄', path: '/tools/developer/base64', category: 'Developer' }" />
          <ToolCard :tool="{ name: $t('tools.wordCounter.name'), description: $t('tools.wordCounter.description'), icon: '📝', path: '/tools/text/word-counter', category: 'Text' }" />
        </template>
      </ToolLayout>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'tool' })

const { t } = useI18n()

useSeoMeta({
  title: t('tools.passwordGenerator.seoTitle'),
  description: t('tools.passwordGenerator.seoDescription'),
  ogTitle: t('tools.passwordGenerator.seoTitle'),
  ogDescription: t('tools.passwordGenerator.pageSubtitle'),
})

useSchemaOrg([
  defineSoftwareApp({
    name: 'Toolcairn Password Generator',
    operatingSystem: 'Web',
    applicationCategory: 'UtilitiesApplication',
    offers: { price: '0', priceCurrency: 'USD' },
  }),
])

const length = ref(16)
const useUppercase = ref(true)
const useLowercase = ref(true)
const useNumbers = ref(true)
const useSymbols = ref(true)

const password = ref('')
const copyLabel = ref(t('tools.passwordGenerator.copyBtn'))

const charOptions = computed(() => [
  { key: 'uppercase', label: t('tools.passwordGenerator.uppercase'), example: 'A-Z', enabled: useUppercase },
  { key: 'lowercase', label: t('tools.passwordGenerator.lowercase'), example: 'a-z', enabled: useLowercase },
  { key: 'numbers', label: t('tools.passwordGenerator.numbers'), example: '0-9', enabled: useNumbers },
  { key: 'symbols', label: t('tools.passwordGenerator.symbols'), example: '!@#$%&*', enabled: useSymbols },
])

const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}

function isLastEnabled(key: string): boolean {
  const enabledCount = [useUppercase, useLowercase, useNumbers, useSymbols].filter(r => r.value).length
  const current = charOptions.value.find((o: { key: string; enabled: Ref<boolean> }) => o.key === key)
  return enabledCount === 1 && !!current?.enabled.value
}

function generatePassword() {
  let pool = ''
  if (useUppercase.value) pool += CHARS.uppercase
  if (useLowercase.value) pool += CHARS.lowercase
  if (useNumbers.value) pool += CHARS.numbers
  if (useSymbols.value) pool += CHARS.symbols

  if (!pool) {
    useLowercase.value = true
    pool = CHARS.lowercase
  }

  const array = new Uint32Array(length.value)
  crypto.getRandomValues(array)

  let result = ''
  for (let i = 0; i < length.value; i++) {
    result += pool[array[i]! % pool.length]
  }

  password.value = result
}

const strengthScore = computed(() => {
  if (!password.value) return 0
  let score = 0
  const len = password.value.length
  if (len >= 8) score += 1
  if (len >= 12) score += 1
  if (len >= 16) score += 1
  if (len >= 24) score += 1
  if (useUppercase.value && useLowercase.value) score += 1
  if (useNumbers.value) score += 1
  if (useSymbols.value) score += 1
  return Math.min(score, 7)
})

const strengthLabel = computed(() => {
  if (strengthScore.value <= 2) return t('tools.passwordGenerator.weak')
  if (strengthScore.value <= 4) return t('tools.passwordGenerator.medium')
  if (strengthScore.value <= 5) return t('tools.passwordGenerator.strong')
  return t('tools.passwordGenerator.veryStrong')
})

const strengthPercent = computed(() => {
  return Math.round((strengthScore.value / 7) * 100)
})

const strengthColor = computed(() => {
  if (strengthScore.value <= 2) return 'text-red-500'
  if (strengthScore.value <= 4) return 'text-yellow-500'
  if (strengthScore.value <= 5) return 'text-green-500'
  return 'text-emerald-600'
})

const strengthBarColor = computed(() => {
  if (strengthScore.value <= 2) return 'bg-red-500'
  if (strengthScore.value <= 4) return 'bg-yellow-500'
  if (strengthScore.value <= 5) return 'bg-green-500'
  return 'bg-emerald-600'
})

async function copyPassword() {
  if (!password.value) return
  try {
    await navigator.clipboard.writeText(password.value)
    copyLabel.value = t('tools.passwordGenerator.copied')
    setTimeout(() => { copyLabel.value = t('tools.passwordGenerator.copyBtn') }, 2000)
  } catch {
    copyLabel.value = 'Failed'
    setTimeout(() => { copyLabel.value = t('tools.passwordGenerator.copyBtn') }, 2000)
  }
}

// Auto-generate on mount and when settings change
watch([length, useUppercase, useLowercase, useNumbers, useSymbols], () => {
  generatePassword()
})

onMounted(() => {
  generatePassword()
})
</script>
