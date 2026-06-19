<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  // The short definition shown on hover/focus.
  def: string
}>()

const open = ref(false)
</script>

<template>
  <span
    class="keyterm"
    tabindex="0"
    @mouseenter="open = true"
    @mouseleave="open = false"
    @focus="open = true"
    @blur="open = false"
  >
    <span class="keyterm__word"><slot /></span>
    <span class="keyterm__pop" :class="{ 'is-open': open }" role="tooltip">
      {{ def }}
    </span>
  </span>
</template>

<style scoped>
.keyterm {
  position: relative;
  cursor: help;
  border-bottom: 1px dotted var(--vp-c-brand-1);
  outline: none;
}
.keyterm__word {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.keyterm__pop {
  position: absolute;
  left: 50%;
  bottom: 140%;
  transform: translateX(-50%) translateY(4px);
  width: max-content;
  max-width: 260px;
  padding: 0.55rem 0.7rem;
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
  color: var(--vp-c-text-1);
  font-size: 0.82rem;
  font-weight: 400;
  line-height: 1.5;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: 20;
}
.keyterm__pop.is-open {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
