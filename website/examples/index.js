import * as domerjs from 'domerjs'
import { Remarkable }  from 'remarkable'

import styles from './styles.css'

import helloworld from './helloworld.data'
import counter from './counter.data'
import markdown from './markdown.data'
import exRouter from './router.data'
import localization from './localization.data'

window.Remarkable = Remarkable
window.domerjs = domerjs
window.styles = styles

const { cl, routing } = domerjs

const router = routing.router(function (path) {
  const root = (subPath) => `/examples${subPath}`
  const relativePath = path.replace('/examples', '')
  //if (path === root('/todomvc')) return editor()
  //if (path === root('/router')) return routerex
  if (relativePath === '') return editor(helloworld)
  if (relativePath === '/localization') return editor(localization)
  if (relativePath === '/counter') return editor(counter)
  if (relativePath === '/external') return editor(markdown)
  if (relativePath === '/router') return editor(exRouter)
  //if (path === root('/ssr')) return ssr
  return null
})

const inputTitle = {
  tag: 'h3',
  render: 'Input'
}

const inputTextarea = {
  tag: 'textarea',
  props: { class: styles.inputTextarea },
  state: { code: '' },
  render: function () {
    return this.state.code
  },
  /*
  onAppend: async function () {
    const response = await fetch(helloworld)
    const code = await response.text()
    this.setState({ code })
  },*/
  events: {
    change: function (e) {
      this.setState({ code: e.target.value })
    }
  }
}

const runInput = {
  tag: 'input',
  props: {
    value: 'run',
    type: 'button',
    class: styles.runInput
  },
  events: {
    click: function () {
      outputCode.element.innerHTML = ''
      try {
        eval(inputTextarea.state.code)
      } catch (err) {
        outputCode.setState({ err })
      }
    }
  }
}

const input = {
  tag: 'div',
  props: { class: cl(styles, 'card', 'input') },
  render: [inputTitle, inputTextarea, runInput]
}

const outputTile = {
  tag: 'h3',
  render: 'Output'
}

const outputError = ({ message }) => ({
  tag: 'div',
  props: { style: 'color:red;' },
  render: message
})

const outputCode = {
  tag: 'div',
  state: { err: '' },
  props: {
    id: 'output'
  },
  render: function () {
    const { err } = this.state
    if (err) return outputError(err)
  }
}

const output = {
  tag: 'div',
  props: {
    class: cl(styles, 'card', 'output')
  },
  render: [outputTile, outputCode]
}

const editor = (file) => ({
  tag: 'div',
  state: { code: '' },
  onAppend: async function () {
    const response = await fetch(file)
    const code = await response.text()
    inputTextarea.setState({ code })
  },
  props: { class: cl(styles, 'editor') },
  render: [input, output]
})

const examples = {
  tag: 'div',
  props: {
    id: 'app_example'
  },
  render: router
}

export default examples
