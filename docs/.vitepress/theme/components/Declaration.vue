<script setup lang="ts">
defineProps<{
  // Optional heading shown above the declaration. Defaults to "We Declare".
  title?: string
  // Optional short number/label, e.g. "Article 3".
  article?: string
}>()
</script>

<template>
  <aside class="declaration" role="note">
    <header class="declaration__head">
      <span class="declaration__mark" aria-hidden="true">&#10013;</span>
      <span class="declaration__title">{{ title || 'We Declare' }}</span>
      <span v-if="article" class="declaration__article">{{ article }}</span>
    </header>
    <div class="declaration__body">
      <slot />
    </div>
  </aside>
</template>

<style scoped>
.declaration {
  margin: 1.75rem 0;
  padding: 1.25rem 1.5rem 1.1rem;
  border: 1px solid var(--vp-c-brand-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    var(--vp-c-brand-soft) 0%,
    var(--vp-c-bg-soft) 100%
  );
}
.declaration__head {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  margin-bottom: 0.5rem;
}
.declaration__mark {
  color: var(--vp-c-brand-1);
  font-size: 1.1rem;
  line-height: 1;
}
.declaration__title {
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.82rem;
  color: var(--vp-c-brand-1);
}
.declaration__article {
  margin-left: auto;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.declaration__body :deep(p) {
  margin: 0.5rem 0;
  font-size: 1.05rem;
  line-height: 1.7;
}
.declaration__body :deep(p:first-child) {
  margin-top: 0;
}
.declaration__body :deep(p:last-child) {
  margin-bottom: 0;
}
.declaration__body :deep(strong) {
  color: var(--vp-c-brand-1);
}
</style>
