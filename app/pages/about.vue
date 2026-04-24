<template>
  <article class="max-w-3xl mx-auto px-4 py-10 prose prose-gray">
    <BreadCrumb />
    <h1>About Toolcairn</h1>
    <p>
      Toolcairn is a free collection of online tools for everyday tasks — compressing PDFs,
      resizing images, generating QR codes, formatting JSON and more. Everything runs in your
      browser. No signup. No ads tracking you around the web. No files kept longer than needed
      to deliver the result.
    </p>
    <h2>Why we built it</h2>
    <p>
      Most online utility sites are slow, covered in dark-pattern upsells or demand an account
      to do basic things. Toolcairn is a push in the other direction: fast, simple, and free.
    </p>
    <h2>Contact</h2>
    <p>
      Questions or a tool you wish existed?
      <a href="mailto:hello@toolcairn.com">hello@toolcairn.com</a>.
    </p>
  </article>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About',
  description: 'Toolcairn is a free collection of online tools that run in your browser — no signup, no tracking, no uploads kept longer than needed.',
  ogTitle: 'About Toolcairn',
  ogDescription: 'A free collection of online tools that run in your browser — no signup, no tracking.',
  ogUrl: 'https://toolcairn.com/about',
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://toolcairn.com/about' }],
})
</script>
