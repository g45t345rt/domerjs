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
}
