<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  // Stable id so a reader's answer persists across visits.
  id: string
  // The reflection prompt/question.
  prompt: string
  // Optional smaller helper line under the prompt.
  hint?: string
}>()

const storageKey = `sota:reflect:${props.id}`
const text = ref('')
const saved = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  try {
    text.value = localStorage.getItem(storageKey) || ''
  } catch {
    /* storage may be unavailable; degrade gracefully */
  }
})

watch(text, (val) => {
  try {
    localStorage.setItem(storageKey, val)
    saved.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (saved.value = false), 1200)
  } catch {
    /* ignore */
  }
})

function clear() {
  text.value = ''
  try {
    localStorage.removeItem(storageKey)
  } catch {
    /* ignore */
  }
}
</script>

<template>
  <div class="reflect">
    <div class="reflect__label">
      <span class="reflect__icon" aria-hidden="true">&#9998;</span>
      Reflect &amp; Respond
    </div>
    <p class="reflect__prompt">{{ prompt }}</p>
    <p v-if="hint" class="reflect__hint">{{ hint }}</p>
    <textarea
      v-model="text"
      class="reflect__input"
      rows="4"
      placeholder="Write your thoughts here. They are saved privately in your browser — only you can see them."
    ></textarea>
    <div class="reflect__foot">
      <span class="reflect__status" :class="{ 'is-saved': saved }">
        {{ saved ? 'Saved to this device' : 'Private to your browser' }}
      </span>
      <button v-if="text" class="reflect__clear" type="button" @click="clear">
        Clear
      </button>
    </div>
  </div>
</template>

<style scoped>
.reflect {
  margin: 1.5rem 0;
  padding: 1.1rem 1.25rem;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}
.reflect__label {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.6rem;
}
.reflect__prompt {
  margin: 0 0 0.35rem;
  font-weight: 600;
  line-height: 1.6;
}
.reflect__hint {
  margin: 0 0 0.6rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}
.reflect__input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font: inherit;
  line-height: 1.6;
  resize: vertical;
}
.reflect__input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}
.reflect__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}
.reflect__status {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}
.reflect__status.is-saved {
  color: var(--vp-c-brand-1);
}
.reflect__clear {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
}
.reflect__clear:hover {
  color: var(--vp-c-brand-1);
}
</style>
