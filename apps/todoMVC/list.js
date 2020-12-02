import { newEl, helpers, updateEl, update } from 'domerjs'

import styles from './styles.css'

export let items = [{ key: 'asdasd', value: 'test', done: true }]

export function setItems (newItems) {
  items = newItems
}

export let filterKey = 'all'
export function setFilterKey (newFilterKey) {
  filterKey = newFilterKey
}

const listItem = (data) => {
  const item = newEl('div', {
    attrs: { class: styles.item }
  })

  const remove = newEl('div', {
    attrs: { class: styles.close },
    events: {
      click: () => {
        items = items.filter((item) => item.key !== data.key)
        update('items')
      }
    }
  })

  const itemValueDiv = newEl('div', { attrs: { style: 'width:100%' } })

  const editItemValue = newEl('input', {
    attrs: { style: 'margin-left: 10px;' },
    value: data.value,
    events: {
      keydown: (e) => {
        const close = () => {
          editItemValue.remove()
          itemValueDiv.append(itemValue)
        }

        // Enter
        if (e.keyCode === 13) {
          data.value = e.target.value
          updateEl(list)
          close()
        }

        // Esc
        if (e.keyCode === 27) {
          close()
        }
      }
    },
    /*documentEvents: {
      click: function (e) {
        console.log(e)
        // Close edit input if clicking outside
        const outsideClick = !e.target.isEqualNode(this.element)

        if (outsideClick) {

        }
      }
    }*/
  })

  const itemValue = newEl('div', {
    attrs: { class: styles.value },
    value: (el) => {
      if (data.done) el.style.textDecoration = 'line-through'
      else el.style.textDecoration = 'none'

      return data.value
    },
    events: {
      dblclick: (e) => {
        itemValue.remove()
        itemValueDiv.append(editItemValue)
        editItemValue.focus()
      }
    }
  })

  const checkbox = newEl('input', {
    attrs: { type: 'checkbox' },
    events: {
      change: () => {
        data.done = checkbox.checked
        update('items')
      }
    }
  })

  if (data.done) checkbox.checked = data.done

  itemValueDiv.append(itemValue)
  item.append(remove, itemValueDiv, checkbox)
  return item
}

const list = newEl('div', {
  value: (el) => {
    helpers.emptyChilds(el)

    const filteredItems = items.filter((data) => {
      const { done } = data
      if (filterKey === 'active' && !done) return true
      if (filterKey === 'completed' && done) return true
      if (filterKey === 'all') return true
    })

    el.append(...filteredItems.map((item) => listItem(item)))
  },
  updateKeys: 'items'
})

export default list