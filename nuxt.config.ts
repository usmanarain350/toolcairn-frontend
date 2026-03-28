// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@pinia/nuxt',
  ],

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'id', name: 'Bahasa Indonesia', file: 'id.json' },
      { code: 'bs', name: 'Bosanski', file: 'bs.json' },
      { code: 'da', name: 'Dansk', file: 'da.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'et', name: 'Eesti', file: 'et.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'ga', name: 'Gaeilge', file: 'ga.json' },
      { code: 'hr', name: 'Hrvatski', file: 'hr.json' },
      { code: 'it', name: 'Italiano', file: 'it.json' },
      { code: 'lv', name: 'Latviešu', file: 'lv.json' },
      { code: 'lt', name: 'Lietuvių', file: 'lt.json' },
      { code: 'hu', name: 'Magyar', file: 'hu.json' },
      { code: 'mt', name: 'Malti', file: 'mt.json' },
      { code: 'nl', name: 'Nederlands', file: 'nl.json' },
      { code: 'no', name: 'Norsk', file: 'no.json' },
      { code: 'pl', name: 'Polski', file: 'pl.json' },
      { code: 'pt', name: 'Português', file: 'pt.json' },
      { code: 'ro', name: 'Română', file: 'ro.json' },
      { code: 'sk', name: 'Slovenčina', file: 'sk.json' },
      { code: 'sl', name: 'Slovenščina', file: 'sl.json' },
      { code: 'fi', name: 'Suomi', file: 'fi.json' },
      { code: 'sv', name: 'Svenska', file: 'sv.json' },
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json' },
      { code: 'tr', name: 'Türkçe', file: 'tr.json' },
      { code: 'is', name: 'Íslenska', file: 'is.json' },
      { code: 'cs', name: 'Čeština', file: 'cs.json' },
      { code: 'el', name: 'Ελληνικά', file: 'el.json' },
      { code: 'bg', name: 'Български', file: 'bg.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'uk', name: 'Українська', file: 'uk.json' },
      { code: 'he', name: 'עברית', file: 'he.json', dir: 'rtl' },
      { code: 'ar', name: 'العربية', file: 'ar.json', dir: 'rtl' },
      { code: 'mr', name: 'मराठी', file: 'mr.json' },
      { code: 'hi', name: 'हिन्दी', file: 'hi.json' },
      { code: 'bn', name: 'বাংলা', file: 'bn.json' },
      { code: 'pa', name: 'ਪੰਜਾਬੀ', file: 'pa.json' },
      { code: 'te', name: 'తెలుగు', file: 'te.json' },
      { code: 'th', name: 'ไทย', file: 'th.json' },
      { code: 'zh', name: '中文', file: 'zh.json' },
      { code: 'ja', name: '日本語', file: 'ja.json' },
      { code: 'ko', name: '한국어', file: 'ko.json' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'i18n/locales',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  site: {
    url: 'https://toolflare.nl',
    name: 'ToolFlare',
    description: 'Free Online Tools — No Signup Required',
    defaultLocale: 'en',
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api/v1',
    },
  },

  routeRules: {
    '/tools/**': { prerender: false },
  },
})
