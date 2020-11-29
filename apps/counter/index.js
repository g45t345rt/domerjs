import { newEl, updateEl } from 'domerjs'

let seconds = 0
const elCounter = newEl('div', {
  attrs: { id: 'counter' },
  value: () => `${seconds} seconds`
})

setInterval(() => {
  seconds++
  //const el2 = window.document.getElementById('counter')
  updateEl(elCounter)
}, 1000)

window.document.body.append(elCounter)