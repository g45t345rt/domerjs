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
})

function pushRoute (entry, path) {
  window.history.pushState({ path }, '', path)
  const router = entry.getFirstParent((parent) => parent.router === true)
  if (router) router.update()
}

const link = (href, text, props) => ({
  tag: 'a',
  props: { href, ...props },
  render: text,
  events: {
    click: function (e) {
      e.preventDefault()
      pushRoute(this, href)

      // Scroll to tag title 
      const hashIndex = href.indexOf('#')
      if (hashIndex !== -1) {
        const hash = href.substring(hashIndex + 1)
        const element = document.getElementById(hash)
        if (element) window.scrollTo(0, element.offsetTop)
      }
    }
  }
})

export default {
  router,
  link,
  pushRoute
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
