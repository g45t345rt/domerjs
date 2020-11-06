import { cl, createRouter } from 'domer'

import styles from './styles.css'

const page = (text) => ({
  tag: 'div',
  render: text
})

const appRouter = createRouter((path) => {
  const relativePath = path.replace('/router', '')
  if (relativePath === '') return [page('This is page one.')]
  if (relativePath === '/two') return [page('This is page two.')]
  if (relativePath === '/three') return [page('This is page three.')]
})

const { link } = appRouter

const menuLink = (path, text) => {
  const newLink = link(path, text)
  newLink.props.class = cl(styles, 'menuLink')
  return newLink
}
const links = {
  tag: 'div',
  children: [
    menuLink('/router', 'ONE'),
    menuLink('/router/two', 'TWO'),
    menuLink('/router/three', 'THREE')
  ]
}

const app = {
  tag: 'div',
  children: [links, appRouter]
}

export default app