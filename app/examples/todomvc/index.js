import shortid from 'shortid'
import { cl } from 'domer'

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
        const { list } = this.parent.children
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
  children: 'TODOS'
}

const app = {
  tag: 'div',
  props: {
    class: cl(styles, 'app')
  },
  children: { title, todoInput, list, stats }
}

export default app