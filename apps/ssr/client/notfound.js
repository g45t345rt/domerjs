import { newEl, router } from '../../../src'

const { setRouteEl } = router

const notFound = newEl('div', {
  events: {
    routeAttach: () => {
      if (window.isServer) {
        global.status = 404
      }
    }
  }
})

const title = newEl('h1', {
  value: '404 - Page not found'
})

const description = newEl('div', {
  value: 'The page you are looking for does not exists.'
})

const goBack = newEl('input', {
  attrs: { type: 'button' },
  value: 'Go home'
})

setRouteEl(goBack, '/')

notFound.append(title, description, goBack)

export default notFound