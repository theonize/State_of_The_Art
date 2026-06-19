<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { withBase } from 'vitepress'

// The canonical chapter list — keep in step with the sidebar in config.mts.
const chapters = [
  { id: 'kingdom', title: 'The Kingdom of God', link: '/foundations/kingdom' },
  {
    id: 'image-of-god',
    title: 'Made in the Image of God',
    link: '/foundations/image-of-god'
  },
  {
    id: 'human-rights',
    title: 'Human Rights & Human Dignity',
    link: '/issues/human-rights'
  },
  {
    id: 'childrens-rights',
    title: 'The Rights & Protection of Children',
    link: '/issues/childrens-rights'
  },
  {
    id: 'nationalism-kingdom-dominion',
    title: 'Nationalism, Kingdom & Dominion',
    link: '/issues/nationalism-kingdom-dominion'
  },
  { id: 'advocacy', title: 'Advocacy & Public Witness', link: '/issues/advocacy' },
  {
    id: 'heresy',
    title: 'Heresy, Orthodoxy & Discernment',
    link: '/issues/heresy'
  },
  {
    id: 'power-and-abuse',
    title: 'Power, Abuse & Accountability',
    link: '/issues/power-and-abuse'
  },
  {
    id: 'creation-care',
    title: 'Creation, Stewardship & Dominion',
    link: '/issues/creation-care'
  },
  {
    id: 'technology',
    title: 'Technology, AI & the Human Person',
    link: '/issues/technology'
  },
  {
    id: 'neighbor',
    title: 'The Neighbor: Race, Migration & Reconciliation',
    link: '/issues/neighbor'
  },
  {
    id: 'wealth-and-poverty',
    title: 'Wealth, Poverty & the Common Good',
    link: '/issues/wealth-and-poverty'
  },
  {
    id: 'sexuality',
    title: 'Sexuality, Marriage & the Body',
    link: '/issues/sexuality'
  },
  {
    id: 'life-and-death',
    title: 'Life & Death: Bioethics at the Edges',
    link: '/issues/life-and-death'
  },
  {
    id: 'truth',
    title: 'Truth, Misinformation & the Digital Age',
    link: '/issues/truth'
  },
  {
    id: 'religious-liberty',
    title: 'Religious Liberty, Persecution & Pluralism',
    link: '/issues/religious-liberty'
  },
  {
    id: 'suffering',
    title: 'Suffering, Mental Health & Lament',
    link: '/issues/suffering'
  },
  {
    id: 'war-and-peace',
    title: 'War, Peace & the Use of Force',
    link: '/issues/war-and-peace'
  },
  { id: 'work-and-rest', title: 'Work, Rest & Sabbath', link: '/issues/work-and-rest' },
  {
    id: 'marriage-and-family',
    title: 'Marriage, Family & Singleness',
    link: '/issues/marriage-and-family'
  },
  {
    id: 'death-and-hope',
    title: 'Death, Grief & Christian Hope',
    link: '/issues/death-and-hope'
  },
  {
    id: 'church-unity',
    title: 'The Unity & Division of the Church',
    link: '/issues/church-unity'
  },
  { id: 'science-and-faith', title: 'Science, Faith & Wonder', link: '/issues/science-and-faith' },
  {
    id: 'worship-and-formation',
    title: 'Worship, Formation & the Consumer Church',
    link: '/issues/worship-and-formation'
  },
  { id: 'women-and-ministry', title: 'Women, Men & Ministry', link: '/issues/women-and-ministry' },
  {
    id: 'addiction-and-recovery',
    title: 'Addiction, Recovery & Grace',
    link: '/issues/addiction-and-recovery'
  },
  { id: 'disability', title: 'Disability & the Church', link: '/issues/disability' },
  {
    id: 'mission-and-evangelism',
    title: 'Mission & Evangelism in a Post-Christian Age',
    link: '/issues/mission-and-evangelism'
  },
  { id: 'aging', title: 'Aging, Honor & the Elderly', link: '/issues/aging' }
]

const STORE = 'sota:progress:v1'
const doneMap = ref<Record<string, { done: boolean }>>({})

function refresh() {
  try {
    doneMap.value = JSON.parse(localStorage.getItem(STORE) || '{}')
  } catch {
    doneMap.value = {}
  }
}

const completed = computed(
  () => chapters.filter((c) => doneMap.value[c.id]?.done).length
)
const pct = computed(() => Math.round((completed.value / chapters.length) * 100))

function reset() {
  try {
    localStorage.removeItem(STORE)
  } catch {
    /* ignore */
  }
  refresh()
}

onMounted(() => {
  refresh()
  window.addEventListener('sota:progress', refresh)
  window.addEventListener('storage', refresh)
})
onUnmounted(() => {
  window.removeEventListener('sota:progress', refresh)
  window.removeEventListener('storage', refresh)
})
</script>

<template>
  <div class="dash">
    <div class="dash__top">
      <div>
        <div class="dash__count">{{ completed }} / {{ chapters.length }}</div>
        <div class="dash__label">chapters complete</div>
      </div>
      <button v-if="completed > 0" class="dash__reset" type="button" @click="reset">
        Reset
      </button>
    </div>
    <div class="dash__bar" role="progressbar" :aria-valuenow="pct">
      <div class="dash__fill" :style="{ width: pct + '%' }"></div>
    </div>
    <ul class="dash__list">
      <li v-for="c in chapters" :key="c.id" class="dash__item">
        <a :href="withBase(c.link)" class="dash__link">
          <span
            class="dash__check"
            :class="{ 'is-done': doneMap[c.id]?.done }"
            aria-hidden="true"
            >{{ doneMap[c.id]?.done ? '✓' : '' }}</span
          >
          {{ c.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dash {
  margin: 1.5rem 0;
  padding: 1.25rem 1.4rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.dash__top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
.dash__count {
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1;
  color: var(--vp-c-brand-1);
}
.dash__label {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-top: 0.2rem;
}
.dash__reset {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  background: none;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
  cursor: pointer;
}
.dash__reset:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
.dash__bar {
  height: 10px;
  border-radius: 999px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}
.dash__fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  border-radius: 999px;
  transition: width 0.35s ease;
}
.dash__list {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.35rem;
}
.dash__item {
  margin: 0;
}
.dash__link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 0.4rem;
  border-radius: 6px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 0.92rem;
}
.dash__link:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
}
.dash__check {
  flex: none;
  display: inline-grid;
  place-items: center;
  width: 1.15rem;
  height: 1.15rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 5px;
  font-size: 0.75rem;
  color: var(--vp-c-white);
}
.dash__check.is-done {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
</style>
