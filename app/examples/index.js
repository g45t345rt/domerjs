import { cl, createRouter } from 'domer'

import styles from './styles.css'

import todomvc from './todomvc'
import router from './router'
import localization from './localization'
import helloword from './helloworld'
import counter from './counter'
import external from './external'
import ssr from './ssr'

const appRouter = createRouter((path) => {
  if (path === '/todomvc') return { todomvc }
  if (path === '/router') return { router }
  if (path === '/localization') return { localization }
  if (path === '/helloworld') return { helloword }
  if (path === '/counter') return { counter }
  if (path === '/external') return { external }
  if (path === '/ssr') return { ssr }
  return null
})

const menuTitle = {
  tag: 'div',
  props: {
    class: cl(styles, 'menuTitle')
  },
  render: 'Examples'
}

const { link } = appRouter
const linkLi = (path, text) => ({
  tag: 'li',
  children: [link(path, text)]
})

const linkList = {
  tag: 'ul',
  children: [
    linkLi('/helloworld', 'Helloworld (simple)'),
    linkLi('/counter', 'Counter (state)'),
    linkLi('/todomvc', 'Todo (app)'),
    linkLi('/router', 'Router (routing)'),
    linkLi('/localization', 'Context (localization)'),
    linkLi('/external', 'External (markdown)'),
    linkLi('/ssr', 'Server-side Rendering')
  ]
}

const menu = {
  tag: 'div',
  props: {
    class: cl(styles, 'menu')
  },
  children: [
    menuTitle,
    linkList
  ]
}

const content = {
  tag: 'div',
  props: {
    class: cl(styles, 'content')
  },
  children: [appRouter]
}

const examples = {
  tag: 'div',
  props: {
    class: cl(styles, 'app')
  },
  children: [
    menu,
    content
  ]
}

export default examples
