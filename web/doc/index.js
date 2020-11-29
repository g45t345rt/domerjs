import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import { newEl } from 'domerjs'

import styles from './styles.css'

import mdInstall from './install.md'
import mdIntro from './intro.md'
import mdUsage from './usage.md'
import mdDef from './def.md'
import mdAPI from './api.md'
import mdDev from './dev.md'

const displayMd = (html) => {
  const el = newEl('div', {
    value: html,
    html: true
  })

  el.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block)
  })

  return el
}

const doc = newEl('div')
doc.append(
  displayMd(mdIntro),
  displayMd(mdInstall),
  displayMd(mdUsage),
  displayMd(mdDef),
  displayMd(mdAPI),
  displayMd(mdDev)
)

export default doc