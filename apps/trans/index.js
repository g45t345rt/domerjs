import { newEl, helpers, update } from 'domerjs'
import translations from './trans.json'

const { replaceStringArgs } = helpers

let currentLanguage = 'en'

const getTrans = (key, args = {}) => {
  if (translations[key]) {
    const trans = translations[key][currentLanguage]
    return replaceStringArgs(trans, args)
  }

  console.warn(`No translation found for ${key}`)
  return key
}

const elChangeLanguage = newEl('input', {
  attrs: { type: 'button' },
  value: () => getTrans('changeLanguage'),
  events: {
    click: () => {
      currentLanguage === 'en' ? currentLanguage = 'fr' : currentLanguage = 'en'
      update('trans')
    }
  },
  updateKeys: 'trans'
})

const elTitle = newEl('h1', {
  value: () => getTrans('title'),
  updateKeys: 'trans'
})

const elDescription = newEl('p', {
  value: () => getTrans('description', { first: '__', last: '__' }),
  updateKeys: 'trans'
})

window.document.body.append(elChangeLanguage, elTitle, elDescription)
