<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <BreadCrumb />
    <header class="mb-10">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blog</h1>
      <p class="text-lg text-gray-500">
        Guides, how-tos and occasional notes from the Toolcairn team.
      </p>
    </header>

    <section aria-label="Articles">
      <p class="text-gray-500 italic">No posts yet — check back soon.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Blog',
  description: 'Guides and how-tos for using free online tools — compressing PDFs, resizing images, generating QR codes and more.',
  ogTitle: 'Toolcairn Blog',
  ogDescription: 'Guides and how-tos for using free online tools.',
  ogUrl: 'https://toolcairn.com/blog',
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://toolcairn.com/blog' }],
})
</script>
