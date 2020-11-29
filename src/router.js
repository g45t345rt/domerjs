const routes = []

let defaultRoot = window.document.body
export function setRoot (newRoot) {
  defaultRoot = newRoot
}

function updateRoutes (args = { i: 0, routeFound: false, lock: [] }) {
  const root = defaultRoot
  const { i } = args
  if (i > routes.length - 1) return

  const route = routes[i]
  const { path, el, parent } = route

  if (path === window.location.pathname || args.updateEmpty) {
    args.routeFound = true
    //args.updateEmpty = false

    if (!root.isEqualNode(parent)) {
      args.lock.push(parent)
      if (!root.contains(parent)) root.append(parent) //root.appendChild(parent)
    }

    args.lock.push(el)
    if (!parent.contains(el)) {
      parent.append(el)
      //parent.appendChild(el)
      el.dispatchEvent(new window.Event('routeAttach'))
    }
  } else {
    const isElLock = args.lock.some((l) => el.isEqualNode(l))
    if (!isElLock && parent.contains(el)) {
      //parent.removeChild(el)
      el.remove()
      el.dispatchEvent(new window.Event('routeDetach'))
    }

    const isParentLock = args.lock.some((l) => parent.isEqualNode(l))
    if (!isParentLock && !root.isEqualNode(parent) && root.contains(parent)) root.removeChild(parent)
  }

  if (path === '') {
    const nextRoute = routes[i + 1]
    if (nextRoute && nextRoute.path !== '') {
      // make sure empty routes are at the end
      routes.splice(i, 1)
      routes.push(route)
      args.i--
    } else {
      if (!args.routeFound) {
        args.updateEmpty = true
        args.i--
      }
    }
  }

  args.i++
  updateRoutes(args)
}

window.addEventListener('popstate', function () {
  updateRoutes()
})

export function assign (path, el, parent = defaultRoot) {
  if (Array.isArray(path)) {
    path.forEach((p) => assign(p, el, parent))
  } else routes.push({ el, path, parent })
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
  updateRoutes()

  // Scroll to tag if any 
  const hashIndex = path.indexOf('#')
  if (hashIndex !== -1) {
    const hash = path.substring(hashIndex + 1)
    const element = window.document.getElementById(hash)
    if (element) window.scrollTo(0, element.offsetTop)
  }
}

export function apply () {
  updateRoutes()
}