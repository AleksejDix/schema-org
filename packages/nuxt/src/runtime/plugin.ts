import { createSchemaOrg, useVueUseHead } from '@vueuse/schema-org'
import { defineNuxtPlugin } from '#app'
import { useRoute, watchEffect } from '#imports'
import meta from '#build/schemaOrg.config.mjs'

export default defineNuxtPlugin((nuxtApp) => {
  const head = nuxtApp.vueApp._context.provides.usehead
  const schemaOrg = createSchemaOrg({
    provider: {
      useRoute,
      setupDOM: useVueUseHead(head),
      provider: 'nuxt',
    },
    ...meta.config,
  })
  nuxtApp.vueApp.use(schemaOrg)

  schemaOrg.setupDOM()
  watchEffect(() => { schemaOrg.generateSchema() })
})
