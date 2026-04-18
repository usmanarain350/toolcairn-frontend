<template>
  <nav class="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
    <ol class="flex items-center gap-1.5">
      <li>
        <NuxtLink to="/" class="hover:text-orange-600 transition">{{ $t('nav.home') }}</NuxtLink>
      </li>
      <li v-for="(crumb, index) in crumbs" :key="crumb.path" class="flex items-center gap-1.5">
        <span class="text-gray-300">/</span>
        <NuxtLink
          v-if="index < crumbs.length - 1"
          :to="crumb.path"
          class="hover:text-orange-600 transition capitalize"
        >
          {{ crumb.label }}
        </NuxtLink>
        <span v-else class="text-gray-700 font-medium capitalize">{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const crumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments.map((segment, index) => ({
    label: segment.replace(/-/g, ' '),
    path: '/' + segments.slice(0, index + 1).join('/'),
  }))
})
</script>
