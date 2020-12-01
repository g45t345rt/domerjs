import { newEl, router } from 'domerjs'
import styles from './styles.css'

import { docs, examples, linkEl } from './links'

const menu = newEl('div', { attrs: { class: styles.menu } })

const menuTitle = (title) => newEl('div', { value: title, attrs: { class: styles.menuTitle } })

// DOC
const docLinks = docs.map((data) => linkEl(data))

const docMenuItem = newEl('div', { attrs: { class: styles.menuItem } })
docMenuItem.append(menuTitle('Doc'))
docMenuItem.append(...docLinks)

const backHome = newEl('a', {
  value: 'Back home',
  attrs: { class: styles.backHome }
})
router.setRouteEl(backHome, '/')

// EXAMPLES
const exLinks = examples.map((data) => linkEl(data))

const exMenuItem = newEl('div', { attrs: { class: styles.menuItem } })
exMenuItem.append(menuTitle('Examples'))
exMenuItem.append(...exLinks)

menu.append(backHome, docMenuItem, exMenuItem)

export default menu