<template>
  <footer class="bg-gray-900 text-gray-400 py-8 mt-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-white font-bold text-lg mb-3">🔥 {{ $t('site.name') }}</h3>
          <p class="text-sm">{{ $t('footer.description') }}</p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-3">{{ $t('footer.popularTools') }}</h4>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/tools/pdf/compress" class="hover:text-orange-400 transition">{{ $t('tools.pdfCompressor.name') }}</NuxtLink></li>
            <li><NuxtLink to="/tools/utility/qr-code" class="hover:text-orange-400 transition">{{ $t('tools.qrCode.name') }}</NuxtLink></li>
            <li><NuxtLink to="/tools/developer/json-formatter" class="hover:text-orange-400 transition">{{ $t('tools.jsonFormatter.name') }}</NuxtLink></li>
            <li><NuxtLink to="/tools/utility/password-generator" class="hover:text-orange-400 transition">{{ $t('tools.passwordGenerator.name') }}</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-3">{{ $t('footer.categories') }}</h4>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/tools/pdf" class="hover:text-orange-400 transition">{{ $t('nav.pdfTools') }}</NuxtLink></li>
            <li><NuxtLink to="/tools/image" class="hover:text-orange-400 transition">{{ $t('nav.imageTools') }}</NuxtLink></li>
            <li><NuxtLink to="/tools/seo" class="hover:text-orange-400 transition">{{ $t('nav.seoTools') }}</NuxtLink></li>
            <li><NuxtLink to="/blog" class="hover:text-orange-400 transition">{{ $t('nav.blog') }}</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-orange-400 transition">{{ $t('nav.about') }}</NuxtLink></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
        <p>&copy; {{ new Date().getFullYear() }} {{ $t('site.name') }}. {{ $t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>
