import { newEl, updateEl, newElClass } from 'domerjs'

import styles from './styles.css'

import { docs, examples, linkEl } from '../links'

let opened = false

const dropdown = newEl('div', { classList: [styles.dropdown] })
const dropdownButton = newEl('button', {
  classList: [styles.dropdownButton],
  value: (el) => {
    if (opened) {
      el.classList.add(styles.opened)
    } else {
      el.classList.remove(styles.opened)
    }

    return 'Menu'
  },
  events: {
    click: () => {
      opened = !opened
      updateEl(dropdownButton)
      updateEl(dropdownItems)
    }
  }
})

const dropdownItems = newEl('div', {
  classList: [styles.items],
  value: (el) => {
    if (opened) {
      el.style.display = 'flex'
    } else {
      el.style.display = 'none'
    }
  }
})

dropdownItems.append(
  linkEl({ path: '/', text: 'Home' }),
  newElClass(styles.divider),
  newElClass(styles.itemTitle, 'Doc'),
  ...docs.map((data) => linkEl(data)),
  newElClass(styles.divider),
  newElClass(styles.itemTitle, 'Examples'),
  ...examples.map((data) => linkEl(data))
)

dropdown.append(dropdownButton, dropdownItems)


export default dropdown
