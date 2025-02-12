<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  cta: {
    type: Array as PropType<string[]>,
    required: false,
  },
  secondary: {
    type: Array as PropType<string[]>,
    required: false,
  },
  snippet: {
    type: String,
    required: false,
  },
  video: {
    type: Array as PropType<string[]>,
    required: false,
  },
})
</script>

<template>
<section class="py-20 sm:py-24 lg:py-32">
  <div class="md:grid gap-8 lg:grid-cols-5 mx-auto w-full sm:px-6 lg:px-0 px-0 max-w-7xl">
    <div class="lg:col-span-3 mb-10 lg:mb-0">
      <p v-if="$slots.top" class="mb-2 text-center lg:text-left">
        <Markdown :use="$slots.top" unwrap="p" />
      </p>

      <h1 class="u-text-gray-900 text-center text-4xl leading-25 font-extrabold tracking-tight sm:text-5xl lg:text-left lg:text-6xl" style="line-height: 1.3;">
        <Markdown :use="$slots.title" unwrap="p" />
      </h1>

      <p class="u-text-gray-500 mt-4 max-w-3xl text-center text-lg lg:text-left">
        <Markdown :use="$slots.description" unwrap="p" />
      </p>

      <div v-if="$slots.extra" class="mt-6">
        <Markdown :use="$slots.extra" unwrap="p" />
      </div>

      <div class="mt-6 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-6 lg:justify-start">
        <template v-if="!$slots.actions">
        <ButtonLink v-if="cta" class="!mb-0" bold size="large" :href="cta[1] as any">
          {{ cta[0] }}
        </ButtonLink>

        <a v-if="secondary" :href="secondary[1] as any" class="u-text-gray-500 hover:u-text-gray-700 py-px font-medium">
          {{ secondary[0] }}
        </a>
        </template>
        <Markdown v-else :use="$slots.actions" unwrap="p" />
      </div>
    </div>

    <div class="block-hero__right lg:col-span-2">
      <slot name="right">
        <Markdown :use="$slots.right" unwrap="p" />
      </slot>
    </div>
  </div>
</section>
</template>

<style scoped>
.block-hero__right :deep(.prose-code) {
  max-height: 350px;
  overflow: auto;
}
</style>
