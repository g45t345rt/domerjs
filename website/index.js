import feather from 'feather-icons'

import { createApp, routing } from 'domerjs' // Parcel bundler alias in package.json

import 'regenerator-runtime/runtime' // required for JSDOM
import 'normalize.css'
import './font.css'
import './styles.css'

import home from './home'
import master from './master'

const routes = ['/examples', '/doc']

const appRouter = routing.router(function (path) {
  if (path === '/') return home
  if (routes.find((route) => path.startsWith(route))) return master
  return null
})

const app = {
  tag: 'div',
  render: appRouter
}

const context = { lang: 'en' }
createApp(app, document.getElementById('app'), { context })

feather.replace()