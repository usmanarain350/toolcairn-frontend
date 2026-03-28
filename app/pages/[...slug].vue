<template>
  <div class="min-h-[60vh] flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-7xl font-bold text-orange-500 mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-900 mb-2">{{ $t('error404.title') }}</h2>
      <p class="text-gray-500 mb-8">{{ $t('error404.description') }}</p>
      <NuxtLink
        to="/"
        class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition"
      >
        {{ $t('error404.backHome') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('error404.seoTitle'),
})

setResponseStatus(404)
</script>
