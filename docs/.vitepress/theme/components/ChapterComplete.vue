<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{
  // Stable chapter id, e.g. "human-rights".
  id: string
  // Human-readable title stored alongside, for the dashboard.
  title: string
}>()

const STORE = 'sota:progress:v1'
const done = ref(false)

function read(): Record<string, { done: boolean; title: string; at: number }> {
  try {
    return JSON.parse(localStorage.getItem(STORE) || '{}')
  } catch {
    return {}
  }
}

onMounted(() => {
  const all = read()
  done.value = !!all[props.id]?.done
})

function toggle() {
  done.value = !done.value
  const all = read()
  if (done.value) {
    all[props.id] = { done: true, title: props.title, at: Date.now() }
  } else {
    delete all[props.id]
  }
  try {
    localStorage.setItem(STORE, JSON.stringify(all))
    window.dispatchEvent(new CustomEvent('sota:progress'))
  } catch {
    /* ignore */
  }
}
</script>

<template>
  <div class="cc">
    <button
      class="cc__btn"
      type="button"
      :class="{ 'is-done': done }"
      @click="toggle"
    >
      <span class="cc__box" aria-hidden="true">{{ done ? '✓' : '' }}</span>
      {{ done ? 'Chapter complete' : 'Mark this chapter complete' }}
    </button>
    <p class="cc__note">
      Progress is saved privately in your browser and shown on the
      <a :href="withBase('/')">home page</a>.
    </p>
  </div>
</template>

<style scoped>
.cc {
  margin: 2rem 0 0.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--vp-c-divider);
}
.cc__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  transition: all 0.15s ease;
}
.cc__btn:hover {
  background: var(--vp-c-brand-soft);
}
.cc__btn.is-done {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  border-color: var(--vp-c-brand-1);
}
.cc__box {
  display: inline-grid;
  place-items: center;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid currentColor;
  border-radius: 5px;
  font-size: 0.8rem;
  line-height: 1;
}
.cc__note {
  margin: 0.6rem 0 0;
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}
</style>
