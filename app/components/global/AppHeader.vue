<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2 text-xl font-bold text-orange-500 hover:text-orange-600 transition">
        <span class="text-2xl">🔥</span>
        <span>{{ $t('site.name') }}</span>
      </NuxtLink>
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        <NuxtLink to="/tools/pdf/compress" class="hover:text-orange-500 transition">{{ $t('nav.pdfTools') }}</NuxtLink>
        <NuxtLink to="/tools/developer/json-formatter" class="hover:text-orange-500 transition">{{ $t('nav.developer') }}</NuxtLink>
        <NuxtLink to="/tools/utility/qr-code" class="hover:text-orange-500 transition">{{ $t('nav.utility') }}</NuxtLink>
        <NuxtLink to="/tools/seo/meta-tag-generator" class="hover:text-orange-500 transition">{{ $t('nav.seo') }}</NuxtLink>
        <LanguageSwitcher />
      </nav>
      <div class="flex items-center gap-2 md:hidden">
        <LanguageSwitcher />
        <button class="text-gray-600" @click="mobileOpen = !mobileOpen">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      </div>
    </div>
    <div v-if="mobileOpen" class="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
      <NuxtLink to="/tools/pdf/compress" class="block text-sm text-gray-600 hover:text-orange-500" @click="mobileOpen = false">{{ $t('nav.pdfTools') }}</NuxtLink>
      <NuxtLink to="/tools/developer/json-formatter" class="block text-sm text-gray-600 hover:text-orange-500" @click="mobileOpen = false">{{ $t('nav.developer') }}</NuxtLink>
      <NuxtLink to="/tools/utility/qr-code" class="block text-sm text-gray-600 hover:text-orange-500" @click="mobileOpen = false">{{ $t('nav.utility') }}</NuxtLink>
      <NuxtLink to="/tools/seo/meta-tag-generator" class="block text-sm text-gray-600 hover:text-orange-500" @click="mobileOpen = false">{{ $t('nav.seo') }}</NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const mobileOpen = ref(false)
</script>
