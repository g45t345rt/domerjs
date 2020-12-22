import { newEl, updateEl } from 'domerjs'
import { Remarkable } from 'remarkable'

const md = new Remarkable()

const elTitle = newEl('h1', { value: 'Enter some markdown' })

const elInputTitle = newEl('h2', { value: 'Input' })

const elInput = newEl('textarea', {
  attrs: { rows: 6, cols: 30 },
  value: `Hello, **world**!s`,
  events: {
    input: (e) => {
      updateEl(elOutput)
    }
  }
})

const elOutputTitle = newEl('h2', { value: 'Output' })

const elOutput = newEl('div', {
  value: () => md.render(elInput.value),
  html: true
})

document.body.append(elTitle, elInputTitle, elInput, elOutputTitle, elOutput)