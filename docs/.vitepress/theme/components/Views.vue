<script setup lang="ts">
defineProps<{
  // Optional framing line above the set of views.
  title?: string
}>()
</script>

<template>
  <div class="views">
    <div class="views__head">
      <span class="views__icon" aria-hidden="true">&#9878;</span>
      {{ title || 'Faithful Christians have held a range of views. Weigh them:' }}
    </div>
    <slot />
  </div>
</template>

<style scoped>
.views {
  margin: 1.5rem 0;
  padding: 1rem 1.1rem 0.4rem;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
.views__head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.6rem;
  color: var(--vp-c-text-1);
}
.views__icon {
  color: var(--vp-c-brand-1);
  font-size: 1.1rem;
}
</style>
