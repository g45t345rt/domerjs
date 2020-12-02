import { newEl, update } from 'domerjs'

import styles from './styles.css'

import { filterKey, items, setFilterKey, setItems } from './list'

const displayCount = newEl('div', {
  value: () => {
    const done = items.filter((item) => item.done).length
    return `${items.length} items - ${done} done`
  },
  updateKeys: 'items'
})

const clearCompleted = newEl('input', {
  attrs: {
    type: 'button',
    value: 'Clear completed'
  },
  events: {
    click: () => {
      setItems(items.filter((item) => !item.done))
      update('items')
    }
  }
})

const filterItem = (key, text) => {
  return newEl('div', {
    //attrs: { class: styles.filterItem },
    classList: [styles.filterItem],
    value: (el) => {
      if (filterKey === key) el.classList.add(styles.activeFilterItem)
      else el.classList.remove(styles.activeFilterItem)
      return text
    },
    events: {
      click: () => {
        setFilterKey(key)
        update('items')
        //updateEl(item)
        update('filter')
      }
    },
    updateKeys: 'filter'
  })
}

const filters = newEl('div', { attrs: { class: styles.filters } })
filters.append(
  filterItem('all', 'All'),
  filterItem('completed', 'Completed'),
  filterItem('active', 'Active')
)

const stats = newEl('div', { attrs: { class: styles.stats } })
stats.append(displayCount, filters, clearCompleted)

export default stats