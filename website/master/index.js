import { cl, link, routeMatch } from 'domerjs'

import doc from '../doc'
import examples from '../examples'
import notfound from '../notfound'

import styles from './styles.css'

const menuTitle = (title) => ({
  tag: 'div',
  render: title,
  props: { class: cl(styles, 'menuTitle') }
})

const activeLink = ({ path, text }) => link(path, text, {
  class: function () {
    let currentPath = ''
    if (this.context.path) currentPath = this.context.path
    else currentPath = window.location.pathname
    if (currentPath === path) return cl(styles, 'activeLinkList')
    return false
  }
})

const linkList = (items) => ({
  tag: 'ul',
  render: items.map((item) => ({
    tag: 'li',
    render: activeLink(item),
  })),
  props: { class: cl(styles, 'linkList') }
})

/*
const router = routing.router(function (path) {
  if (path.startsWith('/doc')) return doc
  if (path.startsWith('/examples')) return examples
})*/

const docLinks = linkList([
  { path: '/doc#intro', text: '#Intro' },
  { path: '/doc#install', text: '#Install' },
  { path: '/doc#usage', text: '#Usage' },
  { path: '/doc#object-definition', text: '#Object definition' },
  { path: '/doc#api', text: '#API' },
  { path: '/doc#dev', text: '#Development' },
])

const examplesLinks = linkList([
  { path: '/examples', text: 'Helloworld (simple)' },
  { path: '/examples/counter', text: 'Counter (state)' },
  { path: '/examples/todomvc', text: 'Todo (app)' },
  { path: '/examples/router', text: 'Router (routing)' },
  { path: '/examples/localization', text: 'Context (localization)' },
  { path: '/examples/external', text: 'External (markdown)' },
  { path: '/examples/ssr', text: 'Server-side Rendering' }
])

const menu = {
  tag: 'div',
  props: {
    class: cl(styles, 'menu')
  },
  render: [
    menuTitle('domerjs'),
    linkList([{ path: '/', text: 'Home' }]),
    menuTitle('Doc'),
    docLinks,
    menuTitle('Examples'),
    examplesLinks
  ]
}

const content = {
  tag: 'div',
  render: function () {
    if (routeMatch('/doc/test')) return { tag: 'div', render: 'test' }
    if (routeMatch('/doc')) return doc

    if (routeMatch('/examples')) return examples
    return { tag: 'div', render: 'example not found' }
  },
  props: { class: cl(styles, 'content') }
}

const master = {
  tag: 'div',
  render: [
    menu,
    content
  ],
  props: { class: cl(styles, 'app') }
}

export default master