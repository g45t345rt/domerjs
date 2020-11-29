import 'regenerator-runtime/runtime'

import { setupI18n } from '@lingui/core'
import { t } from '@lingui/macro'

import { newEl, updater, updateEl } from 'domerjs'

import { messages as en } from './locales/en'
import { messages as fr } from './locales/fr'

let trans = setupI18n({
  locale: 'en',
  messages: { en, fr }
})

updater.set('language', (el) => {
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
      updater.apply('language')
    }
  }
})

const elTitle = newEl('h1', {
  dataset: { transId: t`This is a title` },
  //value: () => trans._(t`This is a title`)
})


const elDescription = newEl('p', {
  value: () => trans._(t`This is a description.`),
  updateOn: 'language' // or use updateOn directly
})

updater.assign('language', [elChangeLanguage, elTitle])
updater.apply('language')

window.document.body.append(elChangeLanguage, elTitle, elDescription)

