import { installSchemaOrg } from '@vueuse/schema-org-vite/vitesse'
import { type UserModule } from '~/types'

// Setup @vueuse/schema-org
// https://schema-org.vueuse.com
export const install: UserModule = (ctx) => {
  installSchemaOrg(ctx, {
    meta: {
      host: 'https://vitesse.example.com',
    },
    debug: true,
  })
}
