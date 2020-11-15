import { cl, createApp, link, routeMatch } from 'domerjs'

import styles from './styles.css'

import notfound from './notfound'

const page = (text) => ({
  tag: 'div',
  render: text
})

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
    menuLink('/three', 'THREE'),
    menuLink('/sdfgsdfg', 'Not found')
  ]
}

const page1 = page('This is page one.')
const page2 = page('This is page two.')
const page3 = page('This is page three.')

const app = {
  tag: 'div',
  render: function () {
    if (routeMatch('/')) return [links, page1]
    if (routeMatch('/two')) return [links, page2]
    if (routeMatch('/three')) return [links, page3]
    return notfound
  },
  windowEvents: {
    popstate: function () {
      this.update()
    }
  }
}

createApp(app, document.body)
