<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
      <BreadCrumb />
      <slot />
      <AdBanner position="bottom" class="mt-8" />
    </main>
    <AppFooter />
  </div>
</template>
