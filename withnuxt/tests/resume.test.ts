import { describe, it, expect } from 'vitest'
import { meta, resume, profiles, services, sections, ui } from '../app/data/resume'

const langs = ['es', 'ca', 'en'] as const

describe('Resume data', () => {
  it('covers the three languages', () => {
    expect(Object.keys(resume).sort()).toEqual(['ca', 'en', 'es'])
    expect(Object.keys(ui).sort()).toEqual(['ca', 'en', 'es'])
  })

  it.each(langs)('%s has complete CV content', (lang) => {
    const data = resume[lang]
    expect(data.experience.length).toBeGreaterThan(0)
    expect(data.education.length).toBeGreaterThan(0)
    expect(data.softSkills.length).toBeGreaterThan(0)
    expect(data.hardSkills.length).toBeGreaterThan(0)
    expect(data.languages).toHaveLength(3)
    expect(data.additional.length).toBeGreaterThan(0)
  })

  it('exposes shared meta for downloads', () => {
    expect(meta.pdfUrl).toBe('/resume/cv/sergio-jurado.pdf')
  })

  it.each(langs)('%s has the five CV sections and four services', (lang) => {
    expect(sections[lang].map(s => s.id)).toEqual([
      'perfil',
      'experiencia',
      'formacion',
      'skills',
      'extra',
    ])
    expect(services[lang]).toHaveLength(4)
  })

  it.each(langs)('%s profiles are complete', (lang) => {
    for (const id of ['logistica', 'fullstack', 'generico'] as const) {
      const profile = profiles[id][lang]
      expect(profile.title).toBeTruthy()
      expect(profile.skills.length).toBeGreaterThan(0)
      expect(profile.experience.length).toBeGreaterThan(0)
    }
  })
})
