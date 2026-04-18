<template>
  <NuxtLink
    :to="tool.path"
    class="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-orange-300 transition group"
  >
    <div class="text-3xl mb-3">{{ tool.icon }}</div>
    <h3 class="font-semibold text-gray-900 group-hover:text-orange-600 transition">{{ tool.name }}</h3>
    <p class="text-sm text-gray-500 mt-1">{{ tool.description }}</p>
    <span class="inline-block mt-3 text-xs font-medium text-orange-700 bg-orange-50 px-2 py-1 rounded-full">
      {{ tool.category }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  tool: {
    name: string
    description: string
    icon: string
    path: string
    category: string
  }
}>()
</script>
