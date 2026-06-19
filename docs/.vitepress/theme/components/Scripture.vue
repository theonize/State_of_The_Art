<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  // Passage reference, e.g. "Genesis 1:26-27" or "Micah 6:8".
  ref: string
  // Translation code understood by Bible Gateway (NIV, ESV, NRSVUE, KJV...).
  version?: string
}>()

const version = computed(() => props.version || 'NIV')

const link = computed(() => {
  const search = encodeURIComponent(props.ref)
  const v = encodeURIComponent(version.value)
  return `https://www.biblegateway.com/passage/?search=${search}&version=${v}`
})
</script>

<template>
  <div class="scripture">
    <div class="scripture__head">
      <a
        class="scripture__ref"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="scripture__book">{{ ref }}</span>
        <span class="scripture__ver">{{ version }}</span>
        <span class="scripture__open" aria-hidden="true">&#8599;</span>
      </a>
    </div>
    <blockquote v-if="$slots.default" class="scripture__text">
      <slot />
    </blockquote>
  </div>
</template>

<style scoped>
.scripture {
  margin: 1.25rem 0;
}
.scripture__head {
  margin-bottom: 0.4rem;
}
.scripture__ref {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1) !important;
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: none !important;
  transition: background 0.15s ease;
}
.scripture__ref:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white) !important;
}
.scripture__ver {
  font-size: 0.7rem;
  font-weight: 700;
  opacity: 0.7;
  letter-spacing: 0.04em;
}
.scripture__open {
  font-size: 0.8rem;
}
.scripture__text {
  margin: 0;
  border-left: 3px solid var(--vp-c-brand-soft);
  font-style: italic;
  color: var(--vp-c-text-1);
}
</style>
