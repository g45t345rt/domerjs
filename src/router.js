const routes = []
let baseUrl = ''

export function set (path, element, parent) {
  routes.push({ path, element, parent })
}

export function setBaseUrl (newBaseUrl) {
  baseUrl = newBaseUrl
}

const matchPath = (p1, p2) => {
  if (Array.isArray(p1)) return p1.indexOf(p2) !== -1
  return p1 === p2
}

export function currentPath () {
  return window.location.pathname.replace(baseUrl, '')
}

export function apply () {
  const cPath = currentPath()
  const notFound = routes.every(({ path }) => !matchPath(path, cPath))

  routes.forEach((route) => {
    const { path, element, parent = document.body } = route

    if (matchPath(path, cPath) || (notFound && matchPath(path, ''))) {
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
  const newPath = `${baseUrl}${path}`

  window.history.pushState({ path: newPath }, '', newPath)

  // Trigger popstate event to update routes
  //window.dispatchEvent(new Event('popstate'))
  apply()

  // Scroll to tag if any 
  const hashIndex = path.indexOf('#')
  if (hashIndex !== -1) {
    const hash = path.substring(hashIndex + 1)
    const element = document.getElementById(hash)
    if (element) window.scrollTo(0, element.offsetTop)
  }
}

window.addEventListener('popstate', () => apply())
