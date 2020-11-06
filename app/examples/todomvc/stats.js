import { cl } from "domer"

import styles from './styles.css'

const displayCount = {
  tag: 'div',
  render: function () {
    const { list } = this.getParent(2).children
    const { items } = list.state
    const done = items.filter((item) => item.done).length
    return `${items.length} items - ${done} done`
  }
}

const clearCompleted = {
  tag: 'input',
  props: {
    type: 'button',
    value: 'Clear completed'
  },
  events: {
    click: function (e) {
      const { displayCount } = this.parent.children
      const { list } = this.getParent(2).children
      const { items } = list.state
      list.setState({ items: items.filter((x) => !x.done) })
      displayCount.update()
    }
  }
}

const filterItem = (key, name) => ({
  tag: 'div',
  props: {
    class: function () {
      const { list } = this.getParent(3).children
      const { filterKey } = list.state

      const classes = ['filterItem']
      if (filterKey === key) classes.push('active')
      return cl(styles, ...classes)
    }
  },
  render: name,
  events: {
    click: function () {
      const { list } = this.getParent(3).children
      list.setState({ filterKey: key })
      this.parent.update()
    }
  }
})

const filters = {
  tag: 'div',
  props: { class: cl(styles, 'filters') },
  children: [
    filterItem('all', 'All'),
    filterItem('active', 'Active'),
    filterItem('completed', 'Completed')
  ]
}

const stats = {
  tag: 'div',
  props: { class: cl(styles, 'stats') },
  render: function () {
    return {
      displayCount,
      filters,
      clearCompleted
    }
  }
}

export default stats