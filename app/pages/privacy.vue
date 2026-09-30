<template>
  <article class="max-w-3xl mx-auto px-4 py-10 prose prose-gray">
    <BreadCrumb />
    <h1>Privacy Policy</h1>
    <p class="text-sm text-gray-500">{{ $t('legal.lastUpdated') }}: September 30, 2026</p>

    <p>
      Toolcairn (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) provides free online tools that
      run in your browser. This Privacy Policy explains what information we collect, how we use
      it, and the choices you have. By using <a href="https://toolcairn.com/">toolcairn.com</a>,
      you agree to the practices described here.
    </p>

    <h2>Information we collect</h2>
    <p>
      Most of our tools process your files and text entirely in your browser. Images, PDFs, and
      JSON you upload are sent to our servers only when the conversion requires it, are used to
      produce your result, and are not kept longer than needed to deliver that result.
    </p>
    <p>
      Like most websites, we and our advertising partners automatically collect limited
      information when you visit, such as your approximate location, browser type, device type,
      pages you visit, and how long you stay.
    </p>

    <h2>Cookies</h2>
    <p>
      We use cookies and similar technologies to remember your preferences and to understand how
      the site is used. When you first visit, you can Accept or Reject non-essential cookies. Our
      consent banner powers this choice through Google Consent Mode, which adjusts the behavior of
      Google Analytics and Google AdSense based on your selection.
    </p>

    <h2>Google Analytics</h2>
    <p>
      We use Google Analytics 4, a web analytics service provided by Google LLC, to understand how
      visitors use our tools. Analytics cookies collect information such as pages visited and time
      spent. Google uses this data subject to its
      <a href="https://policies.google.com/privacy" rel="noopener" target="_blank">Privacy Policy</a>.
      You can learn more about how Google uses your data at
      <a href="https://policies.google.com/technologies/partner-sites" rel="noopener" target="_blank">
        How Google uses information from sites or apps that use our services</a>.
    </p>

    <h2>Advertising (Google AdSense)</h2>
    <p>
      We display ads using Google AdSense. Third-party vendors, including Google, use cookies to
      serve ads based on your prior visits to this and other websites. Google&apos;s use of
      advertising cookies enables it and its partners to serve ads to you based on your visits to
      our site and/or other sites on the Internet.
    </p>
    <ul>
      <li>
        Google&apos;s use of advertising cookies is governed by Google&apos;s own privacy policy
        and by the
        <a href="https://policies.google.com/privacy" rel="noopener" target="_blank">Google Privacy &amp; Terms</a>.
      </li>
      <li>
        You can opt out of personalized advertising by visiting
        <a href="https://adssettings.google.com" rel="noopener" target="_blank">
          Google Ads Settings</a>.
      </li>
      <li>
        You can learn about your choices from the
        <a href="https://www.aboutads.info/choices/" rel="noopener" target="_blank">
          Digital Advertising Alliance opt-out</a> or the
        <a href="https://www.youronlinechoices.com/" rel="noopener" target="_blank">
          European Interactive Digital Advertising Alliance</a>.
      </li>
    </ul>
    <p>
      AdSense cookies are only enabled after you accept non-essential cookies in our consent
      banner. If you have rejected them, we instruct Google not to run personalized advertising.
    </p>

    <h2>How we use information</h2>
    <ul>
      <li>To provide and operate our tools.</li>
      <li>To measure site usage and improve quality.</li>
      <li>To keep Toolcairn free by funding it through advertising.</li>
      <li>To respond to contact requests.</li>
    </ul>

    <h2>Data retention and security</h2>
    <p>
      Files submitted for conversion are retained only as long as required to generate the output
      and are then deleted. We use industry-standard security measures to protect data transmitted
      to us, including HTTPS encryption. No method of transmission over the Internet is 100%
      secure, but we work to protect your information.
    </p>

    <h2>Your rights</h2>
    <p>
      Depending on where you live (for example, in the EU/EEA/UK under the GDPR, or in California
      under the CCPA), you may have the right to access, correct, delete, or restrict processing of
      your personal data, and to withdraw consent at any time. To exercise any of these rights,
      contact us using the details below.
    </p>

    <h2>Children</h2>
    <p>
      Toolcairn is not directed to children under 13 (or the applicable age in your country), and
      we do not knowingly collect personal information from them. If you believe a child has
      provided us personal information, contact us so we can delete it.
    </p>

    <h2>Changes to this policy</h2>
    <p>
      We may update this Privacy Policy from time to time. Changes are posted on this page with a
      new &quot;last updated&quot; date, so please check back periodically.
    </p>

    <h2>Contact us</h2>
    <p>
      Questions about this Privacy Policy? Email us at
      <a href="mailto:admintoolcairn@gmail.com">admintoolcairn@gmail.com</a> or
      <NuxtLink to="/contact">contact us</NuxtLink>.
    </p>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()

useSeoMeta({
  title: 'Privacy Policy',
  description: 'How Toolcairn collects and uses data, including cookies, Google Analytics and Google AdSense. Your choices and rights explained.',
  ogTitle: 'Privacy Policy — Toolcairn',
  ogDescription: 'How Toolcairn collects and uses data, including cookies, Google Analytics and Google AdSense.',
  ogUrl: `https://toolcairn.com${route.path}`,
  ogType: 'website',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://toolcairn.com/privacy' }],
})
</script>