<template>
  <div v-if="showAd" class="ad-banner" :class="sizeClass">
    <ins
      class="adsbygoogle"
      style="display: block"
      :data-ad-client="pub"
      :data-ad-slot="slotId"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </div>
  <div
    v-else-if="!pub"
    class="ad-banner bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm"
    :class="sizeClass"
  >
    <span>Ad Space — {{ position }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  position: 'top' | 'bottom' | 'left' | 'right' | 'sidebar'
}>()

const config = useRuntimeConfig()
const pub = (config.public.adsense?.publisher as string) || ''
const slotMap = (config.public.adsense?.slots as Record<string, string>) || {}
const slotId = computed(() => slotMap[props.position] || slotMap.top || '')
const consent = ref(false)

const showAd = computed(() => Boolean(pub && slotId.value) && consent.value)

onMounted(() => {
  const readConsent = () => {
    consent.value = localStorage.getItem('tc_consent') === 'granted'
  }
  readConsent()
  window.addEventListener('tc-consent', readConsent)
})

function loadAdsScript() {
  if (!pub || document.getElementById('adsbygoogle-plugin')) return
  const s = document.createElement('script')
  s.id = 'adsbygoogle-plugin'
  s.async = true
  s.crossOrigin = 'anonymous'
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pub}`
  document.head.appendChild(s)
}

watch(showAd, (v) => {
  if (!v) return
  loadAdsScript()
  nextTick(() => {
    try {
      const adsbygoogle = (window as any).adsbygoogle || ((window as any).adsbygoogle = [])
      adsbygoogle.push({})
    } catch {
      /* no-op */
    }
  })
}, { immediate: true })

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