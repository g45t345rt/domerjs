import { newEl, router } from 'domerjs'
import styles from './styles.css'

const menu = newEl('div', { attrs: { class: styles.menu } })

const docs = [
  { path: '/doc#intro', text: '#Intro' },
  { path: '/doc#install', text: '#Install' },
  { path: '/doc#usage', text: '#Usage' },
  { path: '/doc#object-definition', text: '#Object definition' },
  { path: '/doc#api', text: '#API' },
  { path: '/doc#dev', text: '#Development' },
]

const examples = [
  { path: '/examples#hello world', text: '#Helloworld' },
  { path: '/examples#counter', text: '#Counter' },
  { path: '/examples#router', text: '#Router' },
  { path: '/examples#localization', text: '#Localization' },
  { path: '/examples#markdown', text: '#Markdown' },
  { path: '/examples#todo mvc', text: '#TODO MVC' }
]

const linkEl = ({ path, text }) => {
  const el = newEl('a', { value: text })
  router.setRouteEl(el, path)
  return el
}

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