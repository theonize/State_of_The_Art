<script setup lang="ts">
defineProps<{
  // The name of the position, shown in the clickable header.
  label: string
  // Open by default when true.
  open?: boolean
}>()
</script>

<template>
  <details class="view" :open="open">
    <summary class="view__summary">
      <span class="view__chev" aria-hidden="true">&#9656;</span>
      <span class="view__label">{{ label }}</span>
    </summary>
    <div class="view__body">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.view {
  margin: 0 0 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  overflow: hidden;
}
.view__summary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.85rem;
  cursor: pointer;
  font-weight: 600;
  list-style: none;
  user-select: none;
}
.view__summary::-webkit-details-marker {
  display: none;
}
.view__chev {
  color: var(--vp-c-brand-1);
  transition: transform 0.18s ease;
  font-size: 0.8rem;
}
.view[open] .view__chev {
  transform: rotate(90deg);
}
.view__body {
  padding: 0.2rem 0.95rem 0.85rem;
  border-top: 1px solid var(--vp-c-divider);
}
.view__body :deep(p:first-child) {
  margin-top: 0.6rem;
}
.view__body :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
