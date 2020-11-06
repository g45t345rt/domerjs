import feather from 'feather-icons'

import { createApp, createRouter } from 'domer' // Parcel bundler alias in package.json

import 'normalize.css'
import './font.css'
import './styles.css'

import home from './home'
import examples from './examples'

const appRouter = createRouter(function (path) {
  if (path === '/') return { home }
  if (path === '/examples') return { examples }
})

const app = {
  tag: 'div',
  children: appRouter
}

const context = { lang: 'en' }
createApp(app, document.getElementById('app'), { context })

feather.replace()