import { expect } from 'vitest'
import { getCurrentInstance } from 'vue'
import type { WebPage } from '../nodes/WebPage'
import { PrimaryWebPageId, defineWebPage, defineWebPagePartial } from '../nodes/WebPage'
import { createMockClient, useSetup } from '../../.test'

describe('createSchemaOrg', () => {
  it('can be created', () => {
    useSetup(() => {
      const client = createMockClient()

      const vm = getCurrentInstance()
      const routeCtx = client.setupRouteContext(vm!)

      expect(routeCtx.canonicalHost).toEqual('https://example.com/')
      expect(client.graphNodes.length).toEqual(0)
    })
  })

  it('can add nodes', () => {
    useSetup(() => {
      const client = createMockClient()

      const vm = getCurrentInstance()
      const routeCtx = client.setupRouteContext(vm!)

      client.addNodesAndResolveRelations(routeCtx, [
        defineWebPagePartial(),
      ])

      expect(client.graphNodes).toMatchInlineSnapshot(`
        [
          {
            "@id": "https://example.com/#webpage",
            "@type": "WebPage",
            "potentialAction": [
              {
                "@type": "ReadAction",
                "target": [
                  "https://example.com/",
                ],
              },
            ],
            "url": "https://example.com/",
          },
        ]
      `)
      expect(client.graphNodes.length).toEqual(1)
    })
  })

  it('can remove nodes', () => {
    useSetup(() => {
      const client = createMockClient()

      const vm = getCurrentInstance()
      const routeCtx = client.setupRouteContext(vm!)

      client.addNodesAndResolveRelations(routeCtx, [
        defineWebPage({
          '@id': '#my-webpage',
          'name': 'test',
        }),
      ])
      expect(client.graphNodes.length).toEqual(1)

      client.removeContext(routeCtx)

      expect(client.graphNodes.length).toEqual(0)
    })
  })

  it('can find node', () => {
    useSetup(() => {
      const client = createMockClient()

      const vm = getCurrentInstance()
      const routeCtx = client.setupRouteContext(vm!)

      client.addNodesAndResolveRelations(routeCtx, [
        defineWebPage({
          '@id': '#my-webpage',
          'name': 'test',
        }),
      ])

      const node = client.findNode('#my-webpage')

      expect(node?.['@id']).toEqual('https://example.com/#my-webpage')
    })
  })

  it('can handle hierarchy', () => {
    useSetup(() => {
      const client = createMockClient()

      const vm = getCurrentInstance()
      const routeCtx = client.setupRouteContext(vm!)

      client.addNodesAndResolveRelations(routeCtx, [
        defineWebPagePartial(),
      ])

      let node = client.findNode<WebPage>(PrimaryWebPageId)
      expect(node?.['@id']).toEqual('https://example.com/#webpage')
      expect(node?.name).toBeUndefined()
      expect(client.graphNodes.length).toEqual(1)

      routeCtx.uid = 100

      client.addNodesAndResolveRelations(routeCtx, [
        defineWebPage({
          '@type': 'FAQPage',
          'name': 'FAQ',
        }),
      ])

      expect(client.graphNodes.length).toEqual(1)
      node = client.findNode(PrimaryWebPageId)
      expect(node?.['@id']).toEqual('https://example.com/#webpage')
      expect(node?.name).toEqual('FAQ')
      expect(node?.['@type']).toEqual(['WebPage', 'FAQPage'])
    })
  })
})
