import { cl, st } from 'domer'

import styles from './styles.css'

const removeItem = ({ key }) => ({
  tag: 'div',
  props: {
    class: cl(styles, 'close')
  },
  events: {
    click: function () {
      const list = this.getParent(2)
      const { items } = list.state
      list.setState({ items: items.filter((x) => x.key !== key) })

      const { stats } = this.getParent(3).children
      stats.update()
    }
  }
})

const checked = ({ key, done }) => {
  const props = {
    type: 'checkbox'
  }

  if (done) props.checked = true

  return {
    tag: 'input',
    props,
    events: {
      change: function (e) {
        const done = e.target.checked

        const list = this.parent.parent
        const { items } = list.state
        const item = items.find((x) => x.key === key)
        item.done = done
        list.update()

        const { stats } = this.getParent(3).children
        stats.update()
      }
    }
  }
}

const editItemValue = ({ key, value }) => ({
  tag: 'input',
  props: { value },
  onLoad: function () {
    this.element.focus()
    const end = value.length
    this.element.setSelectionRange(end, end)
  },
  events: {
    keydown: function (e) {
      // Enter
      if (e.keyCode === 13) {
        const { items } = this.getParent(3).state
        const item = items.find((x) => x.key === key)
        item.value = e.target.value
        this.parent.setState({ edit: false })
      }

      // Esc
      if (e.keyCode === 27) {
        this.parent.setState({ edit: false })
      }
    }
  },
  documentEvents: {
    click: function (e) {
      // Close edit input if clicking outside
      const outsideClick = !e.target.isEqualNode(this.element)

      if (outsideClick) {
        this.parent.setState({ edit: false })
      }
    }
  }
})

const itemValue = (data) => ({
  tag: 'div',
  props: {
    class: cl(styles, 'value'),
    style: function () {
      if (data.done) return st({ textDecoration: 'line-through' })
    }
  },
  state: { edit: false },
  render: function () {
    const { edit } = this.state
    if (!edit) return data.value
    return [editItemValue(data)]
  },
  events: {
    dblclick: function (e) {
      const { edit } = this.state
      if (edit) return

      this.setState({ edit: true })
    }
  }
})

const item = (data) => ({
  tag: 'div',
  props: {
    class: cl(styles, 'item')
  },
  children: [
    checked(data),
    itemValue(data),
    removeItem(data)
  ]
})

const list = {
  tag: 'div',
  state: { items: [{ key: 'asdasd', value: 'test', done: true }], filterKey: 'all' },
  render: function () {
    const { items, filterKey } = this.state

    const filteredItems = items.filter((data) => {
      const { done } = data
      if (filterKey === 'active' && !done) return true
      if (filterKey === 'completed' && done) return true
      if (filterKey === 'all') return true
    })

    return filteredItems.map((data) => item(data))
  }
}

export default list