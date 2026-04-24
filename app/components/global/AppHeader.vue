<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <NuxtLink to="/" class="flex items-center gap-2 text-xl font-bold text-orange-600 hover:text-orange-600 transition shrink-0">
        <span class="text-2xl">🔥</span>
        <span>{{ $t('site.name') }}</span>
      </NuxtLink>
      <nav aria-label="Primary" class="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-600">
        <NuxtLink to="/tools/pdf/" class="hover:text-orange-600 transition whitespace-nowrap">{{ $t('nav.pdfTools') }}</NuxtLink>
        <NuxtLink to="/tools/image/" class="hover:text-orange-600 transition whitespace-nowrap">{{ $t('nav.imageTools') }}</NuxtLink>
        <NuxtLink to="/tools/seo/" class="hover:text-orange-600 transition whitespace-nowrap">{{ $t('nav.seoTools') }}</NuxtLink>
        <NuxtLink to="/blog/" class="hover:text-orange-600 transition whitespace-nowrap">{{ $t('nav.blog') }}</NuxtLink>
        <NuxtLink to="/about/" class="hover:text-orange-600 transition whitespace-nowrap">{{ $t('nav.about') }}</NuxtLink>
        <LanguageSwitcher />
      </nav>
      <div class="flex items-center gap-2 lg:hidden">
        <LanguageSwitcher />
        <button class="text-gray-600" @click="mobileOpen = !mobileOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
    <nav v-if="mobileOpen" aria-label="Primary mobile" class="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
      <NuxtLink to="/tools/pdf/" class="block text-sm text-gray-600 hover:text-orange-600" @click="mobileOpen = false">{{ $t('nav.pdfTools') }}</NuxtLink>
      <NuxtLink to="/tools/image/" class="block text-sm text-gray-600 hover:text-orange-600" @click="mobileOpen = false">{{ $t('nav.imageTools') }}</NuxtLink>
      <NuxtLink to="/tools/seo/" class="block text-sm text-gray-600 hover:text-orange-600" @click="mobileOpen = false">{{ $t('nav.seoTools') }}</NuxtLink>
      <NuxtLink to="/blog/" class="block text-sm text-gray-600 hover:text-orange-600" @click="mobileOpen = false">{{ $t('nav.blog') }}</NuxtLink>
      <NuxtLink to="/about/" class="block text-sm text-gray-600 hover:text-orange-600" @click="mobileOpen = false">{{ $t('nav.about') }}</NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
const mobileOpen = ref(false)
</script>
