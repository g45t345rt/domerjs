import { createApp, routeMatch, setBaseroute } from 'domerjs' // Parcel bundler alias in package.json

if (process.env.NODE_ENV === 'production') {
  setBaseroute('/domerjs')
}

import 'regenerator-runtime/runtime' // required for JSDOM
import 'normalize.css'
import './font.css'
import './styles.css'

import home from './home'
import master from './master'
import notfound from './notfound'

const routes = ['/examples', '/doc']

const app = {
  tag: 'div',
  render: function () {
    if (routeMatch('/')) return home
    if (routeMatch(routes)) return master

    return notfound
  },
  windowEvents: {
    popstate: function () {
      this.update()
    }
  }
}

createApp(app, document.getElementById('app'))
