import { cl, link, routeMatch } from 'domerjs'

import doc from '../doc'
import examples from '../examples'

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

const docLinks = linkList([
  { path: '/doc#intro', text: '#Intro' },
  { path: '/doc#install', text: '#Install' },
  { path: '/doc#usage', text: '#Usage' },
  { path: '/doc#object-definition', text: '#Object definition' },
  { path: '/doc#api', text: '#API' },
  { path: '/doc#dev', text: '#Development' },
])

const examplesLinks = linkList([
  { path: '/examples#hello world', text: '#Helloworld' },
  { path: '/examples#counter', text: '#Counter' },
  { path: '/examples#router', text: '#Router' },
  { path: '/examples#localization', text: '#Localization' },
  { path: '/examples#markdown', text: '#Markdown' },
  { path: '/examples#todo mvc', text: '#TODO MVC' }
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
    if (routeMatch('/doc')) return doc
    if (routeMatch('/examples')) return examples
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