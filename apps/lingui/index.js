import 'regenerator-runtime/runtime'

import { setupI18n } from '@lingui/core'
import { t } from '@lingui/macro'

import { newEl, updateEl, updateSet, update, setElKey } from 'domerjs'

import { messages as en } from './locales/en'
import { messages as fr } from './locales/fr'

let trans = setupI18n({
  locale: 'en',
  messages: { en, fr }
})

updateSet('language', (el) => {
  const { dataset } = el
  if (dataset.transId) updateEl(el, trans._(dataset.transId))
  else updateEl(el)
})

const elChangeLanguage = newEl('input', {
  attrs: { type: 'button' },
  value: () => trans._(t`Change language`),
  events: {
    click: function () {
      trans.activate(trans.locale === 'en' ? 'fr' : 'en')
      update('language')
    }
  }
})

// this is an example if you use dataset instead of value function to update language
const elTitle = newEl('h1', {
  dataset: { transId: t`This is a title` },
  //value: () => trans._(t`This is a title`)
})


const elDescription = newEl('p', {
  value: () => trans._(t`This is a description.`),
  updateKeys: 'language'
})

setElKey('language', [elChangeLanguage, elTitle])
update('language')

document.body.append(elChangeLanguage, elTitle, elDescription)

