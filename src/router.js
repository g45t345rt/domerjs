const routes = []

export function set (path, element, parent) {
  routes.push({ path, element, parent })
}

export function apply () {
  const currentPath = window.location.pathname

  const matchPath = (p1, p2) => {
    if (Array.isArray(p1)) return p1.indexOf(p2) !== -1
    return p1 === p2
  }

  const notFound = routes.every(({ path }) => !matchPath(path, currentPath))

  routes.forEach((route) => {
    const { path, element, parent = window.document.body } = route

    if (matchPath(path, currentPath) || (notFound && matchPath(path, ''))) {
      parent.append(element)
    } else if (parent.contains(element)) element.remove()
  })
}

export function setRouteEl (el, path) {
  if (el.tagName === 'A') el.href = path
  el.addEventListener('click', (e) => {
    e.preventDefault()
    push(path)
  })
  return el
}

export function push (path) {
  const basename = '' // TODO later
  const newPath = `${basename}${path}`

  window.history.pushState({ path: newPath }, '', newPath)

  // Trigger popstate event to update routes
  //window.dispatchEvent(new Event('popstate'))
  apply()

  // Scroll to tag if any 
  const hashIndex = path.indexOf('#')
  if (hashIndex !== -1) {
    const hash = path.substring(hashIndex + 1)
    const element = window.document.getElementById(hash)
    if (element) window.scrollTo(0, element.offsetTop)
  }
}

window.addEventListener('popstate', () => apply())
