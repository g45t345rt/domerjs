import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import styles from './styles.css'

import mdInstall from './install.md'
import mdIntro from './intro.md'
import mdUsage from './usage.md'
import mdDef from './def.md'
import mdAPI from './api.md'
import mdDev from './dev.md'

const displayMd = (html) => ({
  tag: 'div',
  render: html,
  html: true,
  onAppend: function () {
    this.element.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
})

const doc = {
  tag: 'div',
  render: [
    displayMd(mdIntro),
    displayMd(mdInstall),
    displayMd(mdUsage),
    displayMd(mdDef),
    displayMd(mdAPI),
    displayMd(mdDev)
  ]
}

export default doc