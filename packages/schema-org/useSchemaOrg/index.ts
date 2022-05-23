import { getCurrentInstance, inject, onBeforeUnmount, watch, watchEffect } from 'vue'
import { PROVIDE_KEY } from '../createSchemaOrg'
import type { Arrayable, SchemaOrgClient, UseSchemaOrgInput } from '../types'

export function injectSchemaOrg() {
  const schemaOrg = inject<SchemaOrgClient>(PROVIDE_KEY)

  if (!schemaOrg)
    throw new Error('[@vueuse/schema-org] Failed to find plugin, you may have forgotten to apply app.use(schemaOrg)')

  return schemaOrg
}

export function useSchemaOrg(input: Arrayable<UseSchemaOrgInput>) {
  const schemaOrg = injectSchemaOrg()

  const vm = getCurrentInstance()
  const ctx = schemaOrg.setupRouteContext(vm!)
  schemaOrg.addNodesAndResolveRelations(ctx, input)

  watch(
    schemaOrg.options.provider.name === 'vitepress'
      // @ts-expect-error untyped
      ? () => schemaOrg.options.provider.useRoute().data.relativePath
      : schemaOrg.options.provider.useRoute(),
    () => {
      schemaOrg.removeContext(ctx)
      schemaOrg.addNodesAndResolveRelations(ctx, input)
      schemaOrg.generateSchema()
    })

  // allow computed data to trigger new schema
  watchEffect(() => {
    schemaOrg.generateSchema()
  })

  // clean up nodes on unmount, client side only
  onBeforeUnmount(() => {
    schemaOrg.removeContext(ctx)
    schemaOrg.generateSchema()
  })
}
