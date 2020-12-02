import { newEl, update } from 'domerjs'

import styles from './styles.css'

import list, { items } from './list'
import stats from './stats'

const todoInput = newEl('input', {
  attrs: {
    class: styles.todoInput,
    placeholder: 'What needs to be done?'
  },
  events: {
    keypress: function (e) {
      if (e.keyCode === 13) {
        if (e.currentTarget.value === '') return

        items.unshift({ key: Date.now(), value: e.currentTarget.value, done: false })
        update('items')
      }
    }
  }
})

const title = newEl('h1', {
  value: 'TODOS',
  attrs: { class: styles.title }
})

const data = newEl('div', {
  attrs: { class: styles.data },
  value: () => JSON.stringify(items, null, 2),
  updateKeys: 'items'
})

const app = newEl('div', { attrs: { class: styles.app } })

app.append(title, todoInput, list, stats, data)

document.body.append(app)
