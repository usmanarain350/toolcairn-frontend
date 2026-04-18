<template>
  <div class="ad-banner bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm"
       :class="sizeClass">
    <span>Ad Space — {{ position }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  position: 'top' | 'bottom' | 'left' | 'right' | 'sidebar'
}>()

const sizeClass = computed(() => {
  switch (props.position) {
    case 'top': return 'h-24 w-full'
    case 'bottom': return 'h-[250px] max-w-[300px] mx-auto'
    case 'left':
    case 'right':
    case 'sidebar': return 'h-full w-full min-h-[600px] sticky top-20'
    default: return 'h-24 w-full'
  }
})
</script>
