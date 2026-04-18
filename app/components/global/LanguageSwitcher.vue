<template>
  <div class="relative" ref="dropdownRef">
    <button
      class="flex items-center gap-1.5 text-sm text-gray-600 hover:text-orange-600 transition px-2 py-1 rounded-lg hover:bg-gray-50"
      @click="isOpen = !isOpen"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
      <span class="hidden sm:inline">{{ currentLocaleName }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 w-56 max-h-80 overflow-y-auto"
    >
      <div class="py-1">
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="w-full text-left px-4 py-2 text-sm transition"
          :class="loc.code === locale ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-700 hover:bg-gray-50'"
          @click="switchLocale(loc.code)"
        >
          {{ loc.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement>()

const availableLocales = computed(() => {
  return (locales.value as Array<{ code: string; name: string }>)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
})

const currentLocaleName = computed(() => {
  const current = (locales.value as Array<{ code: string; name: string }>)
    .find(l => l.code === locale.value)
  return current?.name || locale.value
})

function switchLocale(code: string) {
  const path = switchLocalePath(code as any)
  navigateTo(path)
  isOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
