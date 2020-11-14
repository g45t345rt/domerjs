function getAttrValue (entry, key) {
  const { props = {} } = entry
  if (typeof props[key] === 'function') return props[key].bind(entry).call()
  return props[key]
}

function updateElementProps (entry) {
  const { props = {}, element } = entry

  Object.keys(props).forEach((key) => {
    const newValue = getAttrValue(entry, key)
    if (newValue === false) element.removeAttribute(key)
    else element.setAttribute(key, newValue)
  })
}

function setElementEvents (entry) {
  entry.listeners = []
  Object.keys(entry).forEach((key) => {
    let element = null
    if (key === 'events') element = entry.element
    if (key === 'windowEvents') element = window
    if (key === 'documentEvents') element = document
    if (!element) return

    const eventProps = entry[key]
    Object.keys(eventProps).forEach((eventKey) => {
      const eventFunc = eventProps[eventKey].bind(entry)
      entry.listeners.push({ element, eventKey, eventFunc })
      element.addEventListener(eventKey, eventFunc)
    })
  })
}

function clearElementEvents (entry) {
  entry.listeners.forEach((listener) => {
    const { element, eventKey, eventFunc } = listener
    element.removeEventListener(eventKey, eventFunc)
  })
  entry.listeners = []
}

function setUpdateFunc (entry, context) {
  entry.update = function () {
    if (!this.mounted) return
    traverse(this, null, context)
    if (typeof entry.onUpdate === 'function') entry.onUpdate()
  }
}

function setStateFunc (entry) {
  entry.setState = function (props) {
    Object.keys(props).forEach((key) => {
      this.state[key] = props[key]
    })
    this.update()
  }
}

function setGetFirstParentFunc (entry) {
  entry.getFirstParent = function (func) {
    if (!this.parent || !this.parent.getFirstParent) return null
    if (func(this.parent)) return this.parent
    return this.parent.getFirstParent(func)
  }
}

function childrenToArray (children) {
  let childs = []
  if (Array.isArray(children)) {
    // simple child array
    childs = children
  } else if (children && typeof children === 'object') {
    if (children.tag) {
      // if tag then object is actually a template definition
      childs.push(children)
    } else {
      // object contains multiple template definition assigned by keys
      childs = Object.values(children)
    }
  }

  return childs
}

function mount (entry, parent, context) {
  if (entry.mounted) return
  // Assign default properties
  if (parent) entry.parent = parent
  if (!entry.context) entry.context = context
  if (!entry.state) entry.state = {}

  // Create element from DOM
  entry.element = document.createElement(entry.tag)
  entry.mounted = true

  // Register events
  setElementEvents(entry)

  // Set helper functions
  setUpdateFunc(entry, context)
  setStateFunc(entry)
  setGetFirstParentFunc(entry)

  if (typeof entry.onMount === 'function') entry.onMount()
}

function unmount (entry) {
  if (!entry.mounted) return
  if (typeof entry.onUnMount === 'function') entry.onUnMount()
  clearElementEvents(entry)
  entry.parent = null
  entry.element = null
  entry.mounted = false

  // Unmount childs recursive
  childrenToArray(entry.children).forEach((child) => unmount(child))
}

function append (entry) {
  if (entry.appended) return

  entry.parent.element.appendChild(entry.element)
  entry.appended = true

  if (typeof entry.onAppend === 'function') entry.onAppend()
}

function detach (entry) {
  if (!entry.appended) return
  if (typeof entry.onDetach === 'function') entry.onDetach()
  entry.parent.element.removeChild(entry.element)
  entry.appended = false
  // Detach childs recursive
  childrenToArray(entry.children).forEach((child) => detach(child))
}

function funcRender (entry, render) {
  if (typeof render === 'function') {
    const result = entry.render()
    //if (typeof result !== 'function') entry.children = result
    return funcRender(entry, result)
  }

  return render
}

const textRenderTypes = ['string', 'number']
// Recursive function that compute the tree
function traverse (entry, parent, context) {
  // Apply all definition from entry obj [if not already mounted]
  mount(entry, parent, context)

  // Set element attributes everytime we traverse or update the entry (template)
  updateElementProps(entry)

  const oldChildren = entry.children
  // Apply render might change entry.children
  //applyRender(entry, entry.render)
  const toRender = funcRender(entry, entry.render)
  if (toRender) entry.children = toRender

  const oldChildrenArray = childrenToArray(oldChildren)
  const newChildrenArray = childrenToArray(entry.children)

  // Detach and unmount old childs
  oldChildrenArray.forEach((oldChild) => {
    // Detach all child because they might not be in the same order
    detach(oldChild)

    // Unmount childs not return by render
    const matchChild = newChildrenArray.find((newChild) => {
      return newChild.element && oldChild.element.isEqualNode(newChild.element)
    })

    if (!matchChild) {
      //detach(oldChild)
      unmount(oldChild)
    }
  })

  if (textRenderTypes.indexOf(typeof oldChildren) !== -1 && textRenderTypes.indexOf(typeof entry.children) === -1) {
    if (entry.html) entry.element.innerHTML = ''
    else entry.element.textContent = ''
    //entry.appended = false
  }

  // When children is a string or number
  if (textRenderTypes.indexOf(typeof entry.children) !== -1 && (entry.children !== oldChildren || !entry.appended)) {
    if (entry.html) entry.element.innerHTML = entry.children
    else entry.element.textContent = entry.children
  }

  // Apply childs
  newChildrenArray.forEach((child) => {
    traverse(child, entry, context)
  })

  if (toRender === false) detach(entry)
  else append(entry)
}

function createApp (entry, rootElement, context = {}) {
  const parent = { element: rootElement }
  traverse(entry, parent, context)
}

// Helpers
function cl (styles, ...classNames) {
  return classNames.map((className) => {
    return styles[className]
  }).join(' ')
}

function camelToDash (str) {
  return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()
}

function st (styles) {
  let str = ''
  Object.keys(styles).forEach((key) => {
    str += `${camelToDash(key)}:${styles[key]};`
  })
  return str
}

// NODOM (SSR)
function propsToString (entry) {
  let s = ''
  const { props = {} } = entry
  Object.keys(props).forEach((key) => {
    let sKey = key
    if (sKey === 'className') sKey = 'class'
    s += ` ${sKey}="${getAttrValue(entry, key)}"`
  })

  return s
}

const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']

function createHtml (entry, parent) {
  if (parent && !entry.parent) entry.parent = parent

  const propsString = propsToString(entry)
  const { tag, render } = entry

  if (selfClosingTags.indexOf(tag) !== -1) {
    return `<${tag}${propsString}/>`
  } else {
    let childHtml = ''

    if (typeof render === 'string') {
      childHtml += render
    }

    let children = entry.children
    if (typeof render === 'function') {
      const result = entry.render()
      if (typeof result === 'string') childHtml += result
      else children = result
    }

    const childs = childrenToArray(children)
    childs.forEach((child) => childHtml += createHtml(child, entry))

    //if (!tag) return childHtml
    return `<${tag}${propsString}>${childHtml}</${tag}>`
  }
}

import { routeMatch, link, pushRoute, setBaseroute } from './presets/router'

export {
  createApp,
  createHtml,
  cl,
  st,
  routeMatch,
  link,
  pushRoute,
  setBaseroute
}