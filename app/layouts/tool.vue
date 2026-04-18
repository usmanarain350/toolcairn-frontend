<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <div class="flex-1 w-full max-w-350 mx-auto px-4 py-8">
      <!-- 3-column grid: left ad | content | right ad -->
      <div class="grid grid-cols-1 lg:grid-cols-[160px_1fr_160px] gap-6">
        <!-- Left ad (hidden on mobile/tablet) -->
        <aside class="hidden lg:block">
          <AdBanner position="left" />
        </aside>

        <!-- Main content -->
        <main class="min-w-0">
          <BreadCrumb />
          <slot />
          <AdBanner position="bottom" class="mt-8" />
        </main>

        <!-- Right ad (hidden on mobile/tablet) -->
        <aside class="hidden lg:block">
          <AdBanner position="right" />
        </aside>
      </div>
    </div>

    <AppFooter />
  </div>
</template>
