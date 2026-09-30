<script setup lang="ts">
const show = ref(false)
onMounted(() => { show.value = !localStorage.getItem('tc_consent') })
function choose(v: 'granted' | 'denied') {
  localStorage.setItem('tc_consent', v)
  const s = { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v }
  ;(window as any).gtag?.('consent', 'update', s)
  show.value = false
}
</script>

<template>
  <div v-if="show" class="fixed bottom-4 inset-x-4 z-50 mx-auto max-w-xl rounded-xl bg-white p-4 shadow-lg border text-sm flex flex-col sm:flex-row gap-3 items-center">
    <p class="flex-1">We use cookies for analytics and ads to keep Toolcairn free.</p>
    <div class="flex gap-2">
      <button class="px-3 py-1.5 rounded border" @click="choose('denied')">Reject</button>
      <button class="px-3 py-1.5 rounded bg-black text-white" @click="choose('granted')">Accept</button>
    </div>
  </div>
</template>