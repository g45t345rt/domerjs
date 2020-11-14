import { createApp } from 'domerjs'

import newList from './list'
import newAdd from './add'
import newRemove from './remove'
//import newStats from './stats'

const newListItem = () => {
  const list = newList({
    defaultItems: ['one', 'two'],
    onUpdate: function ()  {
      stats.update()
    },
    renderItems: function (item) {
      return { tag: 'div', render: item }
    }
  })

  const input = { tag: 'input' }

  const add = {
    tag: 'input',
    props: { type: 'button', value: 'Add' },
    events: {
      click: function () {
        const { value } = input.element
        if (!value) return
        list.push(value)
        input.element.value = ''
        remove.update()
      }
    }
  }

  const remove = {
    tag: 'input',
    props: { type: 'button', value: () => list.state.items.length },
    events: {
      click: function () {
        list.pop()
        remove.update()
      }
    },
    render: function () {
      if (list.state.items.length === 0) return false // hide input
      return true
    }
  }

  return {
    tag: 'div',
    state: list.state,
    render: [input, add, list, remove]
  }
}

const addList = {
  tag: 'input',
  props: { type: 'button', value: 'add list' },
  events: {
    click: function () {
      multiList.state.lists.push(newListItem())
      multiList.update()
    }
  }
}

const removeList = {
  tag: 'input',
  props: { type: 'button', value: 'remove list' },
  events: {
    click: function () {
      multiList.state.lists.pop()
      multiList.update()
    }
  }
}

const multiList = {
  tag: 'div',
  state: { lists: [] },
  onUpdate: function () {
    stats.update()
  },
  render: function () {
    return [...this.state.lists]
  }
}

const stats = {
  tag: 'div',
  render: function () {
    // get lists total
    // get total items from all lists
    let itemCount = 0
    multiList.state.lists.forEach((list) => {
      const { items } = list.state
      itemCount += items.length
    })
    return `${multiList.state.lists.length} lists - ${itemCount} items`
  }
}

const app = {
  tag: 'div',
  render: function () {
    return [addList, multiList, removeList, stats]
  }
}

createApp(app, document.getElementById('app'), {})
