<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <BreadCrumb />
    <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
    <p class="text-lg text-gray-500 mb-10">
      Have a question, found a bug, or want to request a tool? We read every message.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div class="bg-white rounded-xl border border-gray-200 p-6">
        <h2 class="font-semibold text-gray-900 mb-2">📧 General inquiries</h2>
        <p class="text-sm text-gray-500 mb-3">Questions about Toolcairn, our tools, or partnerships.</p>
        <a href="mailto:admintoolcairn@gmail.com" class="text-orange-600 font-medium hover:underline">
          admintoolcairn@gmail.com
        </a>
      </div>
      <div class="bg-white rounded-xl border border-gray-200 p-6">
        <h2 class="font-semibold text-gray-900 mb-2">📄 Privacy &amp; legal</h2>
        <p class="text-sm text-gray-500 mb-3">
          Requests about your data, privacy, or rights.
          <NuxtLink to="/privacy" class="text-orange-600 hover:underline">Privacy Policy</NuxtLink>.
        </p>
        <a href="mailto:admintoolcairn@gmail.com" class="text-orange-600 font-medium hover:underline">
          admintoolcairn@gmail.com
        </a>
      </div>
    </div>

    <form
      class="bg-white rounded-xl border border-gray-200 p-6 md:p-8 space-y-5"
      @submit.prevent="onSubmit"
    >
      <h2 class="text-xl font-bold text-gray-900">Send us a message</h2>

      <div v-if="status === 'success'" class="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm">
        Thanks! Your message has been sent. We usually reply within 2 business days.
      </div>
      <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
        {{ errorMessage }}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label for="contact-name" class="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
          <input
            id="contact-name"
            v-model="form.name"
            type="text"
            required
            class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Full Name"
          />
        </div>
        <div>
          <label for="contact-email" class="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            required
            class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label for="contact-subject" class="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
        <input
          id="contact-subject"
          v-model="form.subject"
          type="text"
          required
          class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Enter your subject"
        />
      </div>
      <div>
        <label for="contact-message" class="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
        <textarea
          id="contact-message"
          v-model="form.message"
          rows="5"
          class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-y"
          placeholder="Message"
        />
      </div>
      <button
        type="submit"
        :disabled="submitting"
        class="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ submitting ? 'Sending…' : 'Send message' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitting = ref(false)
const status = ref<'idle' | 'success' | 'error'>('idle')
const errorMessage = ref('')

async function onSubmit() {
  submitting.value = true
  status.value = 'idle'
  errorMessage.value = ''

  const payload = {
    form_id: '211904',
    fields: {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      submit: true,
      conditional_fields_results: {
        name: true,
        email: true,
        subject: true,
        message: true,
        submit: true,
      },
    },
    url: window.location.href,
  }

  try {
    await $fetch('/api/forms/submit', {
      method: 'POST',
      body: payload,
    })
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (err: any) {
    status.value = 'error'
    errorMessage.value = err?.data?.message || err?.statusMessage || 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}

useSeoMeta({
  title: 'Contact',
  description: 'Contact Toolcairn — ask a question, report a bug, or request a new tool. We read every message.',
  ogTitle: 'Contact — Toolcairn',
  ogDescription: 'Ask a question, report a bug, or request a new tool.',
  ogUrl: `https://toolcairn.com${route.path}`,
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://toolcairn.com/contact' }],
})
</script>