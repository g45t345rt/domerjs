import { newEl, router } from 'domerjs'

export const docs = [
  { path: '/doc#intro', text: '#Intro' },
  { path: '/doc#install', text: '#Install' },
  { path: '/doc#usage', text: '#Usage' },
  { path: '/doc#object-definition', text: '#Object definition' },
  { path: '/doc#api', text: '#API' },
  { path: '/doc#dev', text: '#Development' },
]

export const examples = [
  { path: '/examples#hello world', text: '#Helloworld' },
  { path: '/examples#counter', text: '#Counter' },
  { path: '/examples#router', text: '#Router' },
  { path: '/examples#localization', text: '#Localization' },
  { path: '/examples#markdown', text: '#Markdown' },
  { path: '/examples#todo mvc', text: '#TODO MVC' }
]

export const linkEl = ({ path, text }) => {
  const el = newEl('a', { value: text })
  router.setRouteEl(el, path)
  return el
}
