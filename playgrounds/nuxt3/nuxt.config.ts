import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig(async () => {
  return {
    modules: [
      'nuxt-windicss',
      'nuxt-schema-org',
    ],
    schemaOrg: {
      debug: true,
      canonicalHost: 'https://harlanshamburgers.com/',
    },
  }
})
