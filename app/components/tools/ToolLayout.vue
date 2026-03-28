<template>
  <div>
    <AdBanner position="top" class="mb-6" />

    <div class="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        <slot name="title" />
      </h1>
      <p class="text-gray-500 mb-6">
        <slot name="subtitle" />
      </p>

      <slot />
    </div>

    <div v-if="$slots.seo" class="mt-10 prose prose-gray max-w-none">
      <slot name="seo" />
    </div>

    <div v-if="$slots.related" class="mt-10">
      <h2 class="text-xl font-bold text-gray-900 mb-4">{{ $t('common.relatedTools') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <slot name="related" />
      </div>
    </div>
  </div>
</template>
