import ru from './ru'
import uz from './uz'

// Texts are written in English in the code and looked up here for Russian / Uzbek.
// Anything without a translation simply stays in English.
const dictionaries = { en: {}, ru, uz }

export const languages = [
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'ru', short: 'RU', name: 'Русский' },
  { code: 'uz', short: 'UZ', name: "O'zbekcha" },
]

const KEY = 'boxcars-lang'
const read = () => {
  try {
    const saved = localStorage.getItem(KEY)
    if (dictionaries[saved]) return saved
  } catch { /* storage blocked */ }
  const browser = (navigator.language || 'en').slice(0, 2)
  return dictionaries[browser] ? browser : 'en'
}

let current = read()
const listeners = new Set()

export const getLang = () => current

export function setLang(code) {
  if (!dictionaries[code] || code === current) return
  current = code
  try { localStorage.setItem(KEY, code) } catch { /* ignore */ }
  document.documentElement.lang = code
  listeners.forEach((fn) => fn(code))
}

export const onLangChange = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/** Translate an English text. `{name}` placeholders are filled from `vars`. */
/** Rules for repeated phrases like "Used Audi" / "Audi Cars", so every brand needs no own entry. */
const patterns = {
  ru: [[/^(\d+) Doors$/,'$1 дверей'], [/^Used (.+)$/, '$1 с пробегом'], [/^(.+) Cars$/, 'Автомобили $1']],
  uz: [[/^(\d+) Doors$/,'$1 eshik'], [/^Used (.+)$/, 'Ishlatilgan $1'], [/^(.+) Cars$/, '$1 avtomobillari']],
}
function pattern(text) {
  for (const [re, to] of patterns[current] || []) if (re.test(text)) return text.replace(re, to)
  return undefined
}

export function t(text, vars) {
  if (text == null || typeof text !== 'string') return text
  let out = dictionaries[current][text] ?? pattern(text) ?? text
  if (vars) out = out.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m))
  return out
}

document.documentElement.lang = current
