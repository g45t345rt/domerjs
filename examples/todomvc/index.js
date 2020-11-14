import shortid from 'shortid'
import { cl, createApp } from 'domerjs'

import styles from './styles.css'
import list from './list'
import stats from './stats'

const todoInput = {
  tag: 'input',
  props: {
    class: cl(styles, 'todoInput'),
    placeholder: 'What needs to be done?'
  },
  events: {
    keypress: function (e) {
      if (e.keyCode === 13) {
        if (e.currentTarget.value === '') return
        const { state: { items } } = list

        items.unshift({ key: shortid(), value: e.currentTarget.value, done: false })
        list.update()
        stats.update()
        e.currentTarget.value = ''
      }
    }
  }
}

const title = {
  tag: 'h1',
  render: 'TODOS',
  props: { class: cl(styles, 'title') }
}

const app = {
  tag: 'div',
  props: {
    class: cl(styles, 'app')
  },
  render: { title, todoInput, list, stats }
}

createApp(app, document.getElementById('app'), {})
