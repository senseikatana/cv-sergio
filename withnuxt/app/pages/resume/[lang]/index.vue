<script setup lang="ts">
import { meta, profiles, profileIds, sections } from '~~/data/resume'

const { lang, t, r } = useLang()

const tabs = computed(() => sections[lang.value])

useResumeSeo(r.value.title)

const whatsappUrl = `https://wa.me/${meta.whatsapp}?text=${encodeURIComponent(t.value.whatsappPrefill)}`

const activeSection = ref('perfil')
let observer: IntersectionObserver | null = null

onMounted(() => {
  const ids = tabs.value.map(s => s.id)
  const elements = ids
    .map(id => document.getElementById(id))
    .filter((el): el is HTMLElement => Boolean(el))

  if (!('IntersectionObserver' in window) || !elements.length) return

  const visible = new Map<string, boolean>()
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => visible.set(entry.target.id, entry.isIntersecting))
      const active = ids.filter(id => visible.get(id)).pop()
      if (active) activeSection.value = active
    },
    { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
  )

  elements.forEach(el => observer!.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="scroll-mt-36">
    <!-- Hero -->
    <section class="relative overflow-hidden py-16 lg:py-24">
      <div class="absolute inset-0 bg-gradient-to-br from-dark-900 to-dark-950" />
      <div class="hero-glow absolute inset-0 opacity-40" />

      <div class="relative mx-auto flex w-full max-w-6xl flex-col-reverse gap-10 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-16">
        <div class="flex-1">
          <p class="mb-5 inline-flex items-center gap-2 font-mono text-xs text-sky-400">
            <span class="size-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
            senseikatana.com/resume/{{ lang }}
          </p>

          <h1 class="mb-3 text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-white-50">
            {{ t.heroGreeting }} <em class="not-italic text-rose-400">{{ r.name }}</em>
          </h1>

          <p class="mb-4 text-lg font-medium text-sky-400 md:text-xl">{{ r.title }}</p>
          <p class="mb-7 max-w-2xl text-white-400">{{ t.heroIntro }}</p>

          <div class="mb-6 flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-1.5 rounded-full border border-dark-700/70 bg-dark-800/50 px-2.5 py-1 text-xs text-white-400">
              <UIcon name="i-lucide-map-pin" class="size-3.5 text-teal-400" />
              {{ r.location }}
            </span>
            <a
              :href="`tel:${meta.phone.replace(/\s/g, '')}`"
              class="inline-flex items-center gap-1.5 rounded-full border border-dark-700/70 bg-dark-800/50 px-2.5 py-1 text-xs text-white-400 transition-colors hover:border-dark-600 hover:text-white-50"
            >
              <UIcon name="i-lucide-phone" class="size-3.5 text-teal-400" />
              {{ meta.phone }}
            </a>
            <a
              :href="`mailto:${meta.email}`"
              class="inline-flex items-center gap-1.5 rounded-full border border-dark-700/70 bg-dark-800/50 px-2.5 py-1 text-xs text-white-400 transition-colors hover:border-dark-600 hover:text-white-50"
            >
              <UIcon name="i-lucide-mail" class="size-3.5 text-teal-400" />
              {{ meta.email }}
            </a>
            <a
              :href="meta.linkedin"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1.5 rounded-full border border-dark-700/70 bg-dark-800/50 px-2.5 py-1 text-xs text-white-400 transition-colors hover:border-dark-600 hover:text-white-50"
            >
              <UIcon name="i-simple-icons-linkedin" class="size-3.5 text-teal-400" />
              LinkedIn
            </a>
          </div>

          <p v-if="r.note" class="mb-7 flex items-center gap-1.5 text-xs text-white-500">
            <UIcon name="i-lucide-info" class="size-3.5 text-sky-400" />
            {{ r.note }}
          </p>

          <div class="flex flex-wrap gap-3">
            <a
              :href="meta.pdfUrl"
              download="CV_sergio-jurado.pdf"
              class="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white-50 transition-colors hover:bg-rose-400"
            >
              <UIcon name="i-lucide-download" class="size-4" />
              {{ t.downloadPdf }}
            </a>
            <a
              href="#perfiles"
              class="inline-flex items-center gap-2 rounded-xl border border-dark-600 bg-dark-800/50 px-5 py-2.5 text-sm font-semibold text-white-200 transition-colors hover:border-rose-400 hover:text-white-50"
            >
              {{ t.viewProfiles }}
            </a>
          </div>
        </div>

        <div class="shrink-0 self-start">
          <img
            src="/resume/cv/sergio-jurado.jpg"
            :alt="`Retrato de ${r.name}`"
            width="1154"
            height="1732"
            class="h-60 w-46 rounded-[1.25rem] border border-dark-600 object-cover shadow-2xl transition-transform hover:-translate-y-1 hover:-rotate-1 md:h-72 md:w-56"
          >
        </div>
      </div>
    </section>

    <!-- Tabs -->
    <nav
      class="sticky top-16 z-40 border-y border-dark-700/70 bg-dark-950/90 py-2.5 backdrop-blur-md"
      :aria-label="t.nav.cv"
    >
      <div class="scrollbar-thin mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-5 pb-0.5 sm:px-8">
        <a
          v-for="section in tabs"
          :key="section.id"
          :href="`#${section.id}`"
          class="inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors"
          :class="activeSection === section.id
            ? 'border-rose-400 bg-rose-500/10 text-white-50'
            : 'border-dark-700/70 bg-dark-800/50 text-white-400 hover:border-dark-600 hover:text-white-50'"
          :aria-current="activeSection === section.id ? 'true' : undefined"
        >
          <span class="font-mono text-[0.7rem] text-rose-400">{{ section.label }}</span>
          <UIcon :name="`i-lucide-${section.icon}`" class="size-4 text-sky-400" />
          {{ section.title }}
        </a>
      </div>
    </nav>

    <!-- Perfil -->
    <section id="perfil" class="scroll-mt-36 bg-dark-950 py-16">
      <div class="reveal mx-auto w-full max-w-3xl px-5 sm:px-8">
        <h2 class="mb-5 flex items-center gap-3 text-2xl font-bold tracking-tight text-white-50 md:text-3xl">
          <UIcon name="i-lucide-user" class="size-6 text-rose-400" />
          {{ t.sectionProfile }}
        </h2>
        <p class="text-lg leading-relaxed text-white-200">{{ r.summary }}</p>
      </div>
    </section>

    <!-- Experiencia -->
    <section id="experiencia" class="scroll-mt-36 bg-dark-900 py-16">
      <div class="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <h2 class="reveal mb-2 flex items-center gap-3 text-2xl font-bold tracking-tight text-white-50 md:text-3xl">
          <UIcon name="i-lucide-briefcase" class="size-6 text-rose-400" />
          {{ t.sectionExperience }}
        </h2>
        <p class="reveal mb-9 text-white-400">{{ t.experienceSubtitle }}</p>

        <div class="space-y-9">
          <article
            v-for="exp in r.experience"
            :key="`${exp.company}-${exp.period}`"
            class="reveal relative border-l-2 border-teal-700/50 pl-6"
          >
            <span class="absolute -left-[0.47rem] top-1.5 size-3 rounded-full bg-teal-500 ring-4 ring-teal-500/15" />
            <div class="rounded-xl border border-transparent p-4 transition-colors hover:border-dark-700/70 hover:bg-dark-800/60">
              <div class="mb-1 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 class="text-lg font-semibold text-white-100">{{ exp.role }}</h3>
                <span class="font-mono text-xs text-white-500">{{ exp.period }}</span>
              </div>
              <p class="mb-1.5 text-sm text-sky-400">{{ exp.company }}</p>
              <p class="mb-2.5 text-sm text-white-400">{{ exp.description }}</p>
              <ul class="space-y-2">
                <li
                  v-for="item in exp.highlights"
                  :key="item"
                  class="flex gap-2 text-sm leading-relaxed text-white-200"
                >
                  <UIcon name="i-lucide-check" class="mt-0.5 size-4 shrink-0 text-teal-400" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Formación -->
    <section id="formacion" class="scroll-mt-36 bg-dark-950 py-16">
      <div class="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2 class="reveal mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-white-50 md:text-3xl">
          <UIcon name="i-lucide-graduation-cap" class="size-6 text-rose-400" />
          {{ t.sectionEducation }}
        </h2>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="edu in r.education"
            :key="`${edu.degree}-${edu.period}`"
            class="reveal rounded-xl border border-dark-700/70 bg-dark-800/60 p-5 transition-all hover:-translate-y-0.5 hover:border-dark-600"
          >
            <div class="mb-1 flex items-baseline justify-between gap-3">
              <h3 class="font-semibold text-white-100">{{ edu.degree }}</h3>
              <span class="shrink-0 font-mono text-xs text-white-500">{{ edu.period }}</span>
            </div>
            <p class="text-sm text-sky-400">{{ edu.institution }}</p>
            <p v-if="edu.note" class="mt-1 text-sm text-white-500">{{ edu.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section id="skills" class="scroll-mt-36 bg-dark-900 py-16">
      <div class="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <h2 class="reveal mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-white-50 md:text-3xl">
          <UIcon name="i-lucide-sparkles" class="size-6 text-rose-400" />
          {{ t.sectionSkills }}
        </h2>

        <div class="mb-10 grid gap-10 md:grid-cols-2">
          <div class="reveal">
            <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-white-100">
              <UIcon name="i-lucide-heart" class="size-4 text-rose-400" />
              {{ t.softSkills }}
            </h3>
            <ul class="space-y-3">
              <li v-for="skill in r.softSkills" :key="skill" class="flex gap-2 text-sm text-white-200">
                <UIcon name="i-lucide-heart" class="mt-0.5 size-4 shrink-0 text-rose-400" />
                <span>{{ skill }}</span>
              </li>
            </ul>
          </div>
          <div class="reveal">
            <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-white-100">
              <UIcon name="i-lucide-wrench" class="size-4 text-sky-400" />
              {{ t.hardSkills }}
            </h3>
            <ul class="space-y-3">
              <li v-for="skill in r.hardSkills" :key="skill" class="flex gap-2 text-sm text-white-200">
                <UIcon name="i-lucide-wrench" class="mt-0.5 size-4 shrink-0 text-sky-400" />
                <span>{{ skill }}</span>
              </li>
            </ul>
          </div>
        </div>

        <h3 class="reveal mb-4 flex items-center gap-2 text-lg font-semibold text-white-100">
          <UIcon name="i-lucide-languages" class="size-4 text-sky-400" />
          {{ t.languages }}
        </h3>
        <div class="reveal flex flex-wrap gap-3">
          <div
            v-for="language in r.languages"
            :key="language.name"
            class="rounded-xl border border-dark-700/70 bg-dark-800/60 px-4 py-2 text-sm"
          >
            <span class="font-medium text-white-100">{{ language.name }}</span>
            <span class="text-white-500"> · {{ language.level }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Disponibilidad -->
    <section id="extra" class="scroll-mt-36 bg-dark-950 py-16">
      <div class="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <h2 class="reveal mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-white-50 md:text-3xl">
          <UIcon name="i-lucide-info" class="size-6 text-rose-400" />
          {{ t.sectionAvailability }}
        </h2>
        <ul class="reveal space-y-4">
          <li
            v-for="item in r.additional"
            :key="item"
            class="flex gap-3 leading-relaxed text-white-200"
          >
            <UIcon name="i-lucide-circle-check" class="mt-1 size-5 shrink-0 text-emerald-400" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Perfiles + CTA -->
    <section id="perfiles" class="scroll-mt-36 bg-dark-900 py-16">
      <div class="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2 class="reveal mb-2 flex items-center gap-3 text-2xl font-bold tracking-tight text-white-50 md:text-3xl">
          <UIcon name="i-lucide-briefcase" class="size-6 text-rose-400" />
          {{ t.profilesTitle }}
        </h2>
        <p class="reveal mb-8 text-white-400">{{ t.profilesSubtitle }}</p>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="id in profileIds"
            :key="id"
            :to="resumePath(lang, id)"
            class="reveal group flex flex-col rounded-xl border border-dark-700/70 bg-dark-800/60 p-5 transition-all hover:-translate-y-0.5 hover:border-dark-600"
          >
            <h3 class="font-semibold text-white-100">{{ profiles[id][lang].title }}</h3>
            <p class="mt-1 text-sm text-white-400">{{ profiles[id][lang].description }}</p>
            <span class="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-rose-400 transition-all group-hover:gap-2.5">
              {{ t.viewProfile }}
              <UIcon name="i-lucide-arrow-right" class="size-4" />
            </span>
          </NuxtLink>
        </div>

        <div class="reveal relative mt-12 overflow-hidden rounded-2xl border border-dark-700/70 bg-dark-800/60 p-8 text-center">
          <div class="cta-glow pointer-events-none absolute inset-0 opacity-25" />
          <div class="relative">
            <p class="mb-6 text-white-400">{{ t.ctaText }}</p>
            <div class="flex flex-wrap justify-center gap-3">
              <a
                :href="meta.pdfUrl"
                download="CV_sergio-jurado.pdf"
                class="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white-50 transition-colors hover:bg-rose-400"
              >
                <UIcon name="i-lucide-download" class="size-4" />
                {{ t.downloadPdf }}
              </a>
              <a
                :href="`mailto:${meta.email}`"
                class="inline-flex items-center gap-2 rounded-xl border border-dark-600 bg-dark-900/50 px-5 py-2.5 text-sm font-semibold text-white-200 transition-colors hover:border-rose-400 hover:text-white-50"
              >
                <UIcon name="i-lucide-mail" class="size-4" />
                {{ t.sendEmail }}
              </a>
              <a
                :href="whatsappUrl"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-sky-400 transition-colors hover:text-white-50"
              >
                <UIcon name="i-simple-icons-whatsapp" class="size-4" />
                {{ t.whatsappCta }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
