<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  // The question prompt.
  q: string
}>()

const open = ref(false)
</script>

<template>
  <div class="selfcheck">
    <p class="selfcheck__q">
      <span class="selfcheck__tag" aria-hidden="true">?</span>{{ q }}
    </p>
    <button
      class="selfcheck__btn"
      type="button"
      :aria-expanded="open"
      @click="open = !open"
    >
      {{ open ? 'Hide response' : 'Reveal a response' }}
    </button>
    <transition name="sc">
      <div v-show="open" class="selfcheck__a">
        <slot />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.selfcheck {
  margin: 1.25rem 0;
  padding: 0.9rem 1.1rem;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
.selfcheck__q {
  display: flex;
  gap: 0.55rem;
  margin: 0 0 0.6rem;
  font-weight: 600;
  line-height: 1.6;
}
.selfcheck__tag {
  flex: none;
  display: inline-grid;
  place-items: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  font-size: 0.85rem;
  font-weight: 700;
}
.selfcheck__btn {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border: none;
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  cursor: pointer;
}
.selfcheck__btn:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}
.selfcheck__a {
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px dashed var(--vp-c-divider);
}
.selfcheck__a :deep(p:first-child) {
  margin-top: 0;
}
.selfcheck__a :deep(p:last-child) {
  margin-bottom: 0;
}
.sc-enter-active,
.sc-leave-active {
  transition: opacity 0.2s ease;
}
.sc-enter-from,
.sc-leave-to {
  opacity: 0;
}
</style>
