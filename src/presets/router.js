let basename = ''

/*
const router = (func) => ({
  router: true,
  tag: 'div',
  render: function () {
    const { pathname } = window.location
    return func(pathname)
  },
  windowEvents: {
    popstate: function () {
      // TODO: Maybe check if path is assigned to this router
      this.update()
    }
  }
})*/

function routeMatchArray (paths) {
  return paths.some((props) => routeMatch(props))
}

function routeMatch (props) {
  if (typeof props === 'string') return routeMatch({ path: props })
  if (Array.isArray(props)) return routeMatchArray(props)

  const { path, exact = true } = props

  const { pathname } = window.location
  if (!pathname.startsWith(basename)) return false
  const currentPath = pathname.replace(basename, '')

  if (exact) return currentPath === path
  return currentPath.startsWith(path)
}

const setBaseroute = (base) => basename = base

function pushRoute (path) {
  const newPath = `${basename}${path}`
  window.history.pushState({ path: newPath }, '', newPath)
  window.dispatchEvent(new Event('popstate'))
  //const router = entry.getFirstParent((parent) => parent.router === true)
  //if (router) router.update()

  // Scroll to tag if any 
  const hashIndex = path.indexOf('#')
  if (hashIndex !== -1) {
    const hash = path.substring(hashIndex + 1)
    const element = document.getElementById(hash)
    if (element) window.scrollTo(0, element.offsetTop)
  }
}

const link = (href, text, props) => ({
  tag: 'a',
  props: { href, ...props },
  render: text,
  events: {
    click: function (e) {
      e.preventDefault()
      pushRoute(href)
    }
  }
})

export {
  //router,
  link,
  pushRoute,
  //match,
  routeMatch,
  setBaseroute
}

/*
export default (func) => {
  const router = {
    tag: 'div',
    render: function () {
      const { pathname } = window.location
      return func(pathname)
    },
    windowEvents: {
      popstate: function () {
        this.update()
      }
    },
    link: function (path, text) {
      return {
        tag: 'a',
        props: { href: path },
        render: text,
        events: {
          click: function (e) {
            e.preventDefault()
            window.history.pushState({ path }, '', path)
            router.update()
          }
        }
      }
    }
  }

  return router
}*/
