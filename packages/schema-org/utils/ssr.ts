import type { VNode } from 'vue-demi'

export const shallowVNodesToText = (nodes: VNode[]) => {
  let text = ''

  for (const node of nodes) {
    if (typeof node.children === 'string')
      text += node.children.trim()
  }
  return text
}
