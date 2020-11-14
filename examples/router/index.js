import { cl, routing, createApp } from 'domerjs'

import styles from './styles.css'

const page = (text) => ({
  tag: 'div',
  render: text
})

const appRouter = routing.router((path) => {
  if (path === '/') return page('This is page one.')
  if (path === '/two') return page('This is page two.')
  if (path === '/three') return page('This is page three.')
})

const { link } = routing

const menuLink = (path, text) => {
  const newLink = link(path, text)
  newLink.props.class = cl(styles, 'menuLink')
  return newLink
}

const links = {
  tag: 'div',
  render: [
    menuLink('/', 'ONE'),
    menuLink('/two', 'TWO'),
    menuLink('/three', 'THREE')
  ]
}

const app = {
  tag: 'div',
  render: [links, appRouter]
}

createApp(app, document.getElementById('app'), {})
