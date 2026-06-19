<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = defineProps<{
  // Passage reference, e.g. "Genesis 1:26-27" or "Micah 6:8".
  // NB: must NOT be named `ref` — Vue reserves `ref` as a template-ref
  // attribute and would not pass it through as a prop.
  passage: string
  // Translation code understood by Bible Gateway (NIV, ESV, NRSVUE, KJV...).
  version?: string
}>()

const slots = useSlots()
const hasText = computed(() => !!slots.default)

const version = computed(() => props.version || 'NIV')

const link = computed(() => {
  const search = encodeURIComponent(props.passage ?? '')
  const v = encodeURIComponent(version.value)
  return `https://www.biblegateway.com/passage/?search=${search}&version=${v}`
})
</script>

<template>
  <!--
    Bare reference: render an INLINE anchor so it is valid inside a <p>
    (a block element here would be reparsed out of the paragraph by the
    browser and can cause SSR hydration mismatches).
  -->
  <a
    v-if="!hasText"
    class="scripture-ref"
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="scripture-ref__book">{{ passage }}</span>
    <span class="scripture-ref__ver">{{ version }}</span>
    <span class="scripture-ref__open" aria-hidden="true">&#8599;</span>
  </a>

  <!-- With quoted text: a block card, always used on its own line. -->
  <div v-else class="scripture">
    <div class="scripture__head">
      <a
        class="scripture-ref"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="scripture-ref__book">{{ passage }}</span>
        <span class="scripture-ref__ver">{{ version }}</span>
        <span class="scripture-ref__open" aria-hidden="true">&#8599;</span>
      </a>
    </div>
    <blockquote class="scripture__text">
      <slot />
    </blockquote>
  </div>
</template>

<style scoped>
/* Inline reference chip — safe within paragraphs. */
.scripture-ref {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  padding: 0.05rem 0.55rem;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1) !important;
  font-weight: 600;
  font-size: 0.82rem;
  line-height: 1.5;
  text-decoration: none !important;
  white-space: nowrap;
  transition: background 0.15s ease;
}
.scripture-ref:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white) !important;
}
.scripture-ref__ver {
  font-size: 0.68rem;
  font-weight: 700;
  opacity: 0.7;
  letter-spacing: 0.04em;
}
.scripture-ref__open {
  font-size: 0.72rem;
}

/* Block quote card — used on its own line when passage text is provided. */
.scripture {
  margin: 1.25rem 0;
}
.scripture__head {
  margin-bottom: 0.4rem;
}
.scripture__text {
  margin: 0;
  border-left: 3px solid var(--vp-c-brand-soft);
  font-style: italic;
  color: var(--vp-c-text-1);
}
</style>
