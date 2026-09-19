<script setup lang="ts">
import { meta, profiles, services, type ProfileId } from '~/data/resume'

const route = useRoute()
const { lang, t } = useLang()

const profileIds: ProfileId[] = ['logistica', 'fullstack', 'generico']
const redirects = ['about', 'shop']

const page = computed(() => String(route.params.page))
const isProfile = computed(() => profileIds.includes(page.value as ProfileId))
const profile = computed(() => (isProfile.value ? profiles[page.value as ProfileId][lang.value] : null))

const pageTitle = computed(() => {
  if (profile.value) return profile.value.title
  return page.value === 'services' ? t.value.servicesTitle : t.value.contactTitle
})

useResumeSeo(pageTitle.value, `${page.value}/`)

if (redirects.includes(String(route.params.page))) {
  await navigateTo(`/resume/${lang.value}/`, { redirectCode: 301 })
}

const whatsappUrl = `https://wa.me/${meta.whatsapp}?text=${encodeURIComponent(t.value.whatsappPrefill)}`
</script>

<template>
  <div>
    <!-- Servicios -->
    <section v-if="page === 'services'" class="py-16 lg:py-20">
      <div class="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p class="mb-5 inline-flex items-center gap-2 font-mono text-xs text-sky-400">
          <span class="size-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
          {{ t.servicesSubtitle }}
        </p>
        <h1 class="mb-3 text-[clamp(1.9rem,4vw,2.6rem)] font-bold tracking-tight text-white-50">{{ t.servicesTitle }}</h1>
        <p class="max-w-2xl text-white-400">{{ t.servicesIntro }}</p>

        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="service in services[lang]"
            :key="service.title"
            class="reveal rounded-xl border border-dark-700/70 bg-dark-800/60 p-5 transition-all hover:-translate-y-0.5 hover:border-dark-600"
          >
            <h2 class="font-semibold text-white-100">{{ service.title }}</h2>
            <p class="mt-2 text-sm text-white-400">{{ service.description }}</p>
          </article>
        </div>

        <div class="reveal relative mt-12 overflow-hidden rounded-2xl border border-dark-700/70 bg-dark-800/60 p-8 text-center">
          <div class="cta-glow pointer-events-none absolute inset-0 opacity-25" />
          <div class="relative">
            <p class="mb-6 text-white-400">{{ t.contactSubtitle }}</p>
            <div class="flex flex-wrap justify-center gap-3">
              <NuxtLink
                :to="resumePath(lang, 'contact')"
                class="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white-50 transition-colors hover:bg-rose-400"
              >
                <UIcon name="i-lucide-mail" class="size-4" />
                {{ t.nav.contact }}
              </NuxtLink>
              <NuxtLink
                :to="resumePath(lang)"
                class="inline-flex items-center gap-2 rounded-xl border border-dark-600 bg-dark-900/50 px-5 py-2.5 text-sm font-semibold text-white-200 transition-colors hover:border-rose-400 hover:text-white-50"
              >
                <UIcon name="i-lucide-arrow-right" class="size-4" />
                {{ t.nav.cv }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contacto -->
    <section v-else-if="page === 'contact'" class="py-16 lg:py-20">
      <div class="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p class="mb-5 inline-flex items-center gap-2 font-mono text-xs text-sky-400">
          <span class="size-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
          {{ t.contactSubtitle }}
        </p>
        <h1 class="mb-3 text-[clamp(1.9rem,4vw,2.6rem)] font-bold tracking-tight text-white-50">{{ t.contactTitle }}</h1>
        <p class="max-w-2xl text-white-400">{{ t.contactIntro }}</p>

        <div class="mt-10 grid gap-10 md:grid-cols-2 md:items-start">
          <div class="reveal grid gap-3">
            <a
              :href="`mailto:${meta.email}`"
              class="flex items-center gap-3 rounded-xl border border-dark-700/70 bg-dark-800/60 px-4 py-3 text-sm transition-all hover:translate-x-1 hover:border-dark-600"
            >
              <UIcon name="i-lucide-mail" class="size-4 text-teal-400" />
              {{ meta.email }}
            </a>
            <a
              :href="`tel:${meta.phone.replace(/\s/g, '')}`"
              class="flex items-center gap-3 rounded-xl border border-dark-700/70 bg-dark-800/60 px-4 py-3 text-sm transition-all hover:translate-x-1 hover:border-dark-600"
            >
              <UIcon name="i-lucide-phone" class="size-4 text-teal-400" />
              {{ meta.phone }}
            </a>
            <span class="flex items-center gap-3 rounded-xl border border-dark-700/70 bg-dark-800/60 px-4 py-3 text-sm">
              <UIcon name="i-lucide-map-pin" class="size-4 text-teal-400" />
              {{ meta.location }}
            </span>
            <a
              :href="meta.linkedin"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-3 rounded-xl border border-dark-700/70 bg-dark-800/60 px-4 py-3 text-sm transition-all hover:translate-x-1 hover:border-dark-600"
            >
              <UIcon name="i-simple-icons-linkedin" class="size-4 text-teal-400" />
              LinkedIn
            </a>
            <a
              :href="meta.github"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-3 rounded-xl border border-dark-700/70 bg-dark-800/60 px-4 py-3 text-sm transition-all hover:translate-x-1 hover:border-dark-600"
            >
              <UIcon name="i-simple-icons-github" class="size-4 text-teal-400" />
              GitHub
            </a>
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-3 rounded-xl border border-dark-700/70 bg-dark-800/60 px-4 py-3 text-sm transition-all hover:translate-x-1 hover:border-dark-600"
            >
              <UIcon name="i-simple-icons-whatsapp" class="size-4 text-teal-400" />
              {{ t.whatsappCta }} · {{ t.whatsappSub }}
            </a>
          </div>

          <form
            class="reveal flex flex-col gap-3"
            :action="`mailto:${meta.email}`"
            method="POST"
            enctype="text/plain"
          >
            <p class="text-white-400">{{ t.orWrite }}</p>
            <input
              name="nombre"
              :placeholder="t.formName"
              required
              class="w-full rounded-xl border border-dark-700/70 bg-dark-800/60 px-4 py-3 text-sm text-white-100 placeholder:text-white-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
            >
            <input
              name="email"
              type="email"
              :placeholder="t.formEmail"
              required
              class="w-full rounded-xl border border-dark-700/70 bg-dark-800/60 px-4 py-3 text-sm text-white-100 placeholder:text-white-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
            >
            <textarea
              name="mensaje"
              :placeholder="t.formMsg"
              rows="5"
              required
              class="w-full rounded-xl border border-dark-700/70 bg-dark-800/60 px-4 py-3 text-sm text-white-100 placeholder:text-white-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
            />
            <button
              type="submit"
              class="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white-50 transition-colors hover:bg-rose-400"
            >
              <UIcon name="i-lucide-send" class="size-4" />
              {{ t.send }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Perfil -->
    <section v-else-if="profile" class="py-16 lg:py-20">
      <div class="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <p class="mb-5 inline-flex items-center gap-2 font-mono text-xs text-sky-400">
          <span class="size-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
          {{ meta.name }} · {{ meta.location }}
        </p>
        <h1 class="mb-2 text-[clamp(1.9rem,4vw,2.6rem)] font-bold tracking-tight text-white-50">{{ profile.title }}</h1>
        <p class="mb-4 text-lg font-medium text-sky-400">{{ profile.role }}</p>
        <p class="text-white-400">{{ profile.description }}</p>

        <h2 class="reveal mt-12 mb-4 flex items-center gap-3 text-2xl font-bold tracking-tight text-white-50">
          <UIcon name="i-lucide-user" class="size-6 text-rose-400" />
          {{ t.sectionProfile }}
        </h2>
        <p class="reveal leading-relaxed text-white-200">{{ profile.about }}</p>

        <h2 class="reveal mt-12 mb-4 flex items-center gap-3 text-2xl font-bold tracking-tight text-white-50">
          <UIcon name="i-lucide-sparkles" class="size-6 text-rose-400" />
          {{ t.profileSkills }}
        </h2>
        <div class="reveal flex flex-wrap gap-2">
          <span
            v-for="skill in profile.skills"
            :key="skill"
            class="rounded-full border border-dark-700/70 bg-dark-800/60 px-3 py-1.5 font-mono text-xs text-white-300"
          >
            {{ skill }}
          </span>
        </div>

        <h2 class="reveal mt-12 mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight text-white-50">
          <UIcon name="i-lucide-briefcase" class="size-6 text-rose-400" />
          {{ t.profileExperience }}
        </h2>
        <div class="space-y-9">
          <article
            v-for="exp in profile.experience"
            :key="`${exp.company}-${exp.period}`"
            class="reveal relative border-l-2 border-teal-700/50 pl-6"
          >
            <span class="absolute -left-[0.47rem] top-1.5 size-3 rounded-full bg-teal-500 ring-4 ring-teal-500/15" />
            <div class="rounded-xl border border-transparent p-4 transition-colors hover:border-dark-700/70 hover:bg-dark-800/60">
              <div class="mb-1 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 class="text-lg font-semibold text-white-100">{{ exp.role }}</h3>
                <span class="font-mono text-xs text-white-500">{{ exp.period }}</span>
              </div>
              <p class="mb-2.5 text-sm text-sky-400">{{ exp.company }}</p>
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

        <div class="reveal mt-12 flex flex-wrap gap-3">
          <NuxtLink
            :to="resumePath(lang)"
            class="inline-flex items-center gap-2 rounded-xl border border-dark-600 bg-dark-800/50 px-5 py-2.5 text-sm font-semibold text-white-200 transition-colors hover:border-rose-400 hover:text-white-50"
          >
            <UIcon name="i-lucide-arrow-right" class="size-4" />
            {{ t.backToCv }}
          </NuxtLink>
          <a
            :href="`mailto:${meta.email}`"
            class="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white-50 transition-colors hover:bg-rose-400"
          >
            <UIcon name="i-lucide-mail" class="size-4" />
            {{ t.profileContact }}
          </a>
          <a
            :href="meta.pdfUrl"
            download="CV_sergio-jurado.pdf"
            class="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-sky-400 transition-colors hover:text-white-50"
          >
            <UIcon name="i-lucide-download" class="size-4" />
            {{ t.downloadPdf }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
