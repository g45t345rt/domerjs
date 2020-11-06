import cr from './presets/router'
export const createRouter = cr

function getAttrValue (entry, key) {
  const { props = {} } = entry
  if (typeof props[key] === 'function') return props[key].bind(entry).call()
  return props[key]
}

function updateElementProps (entry) {
  const { props = {}, element } = entry

  Object.keys(props).forEach((key) => {
    element.setAttribute(key, getAttrValue(entry, key))
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
      const eventFunc = eventProps[eventKey]
      entry.listeners.push({ element, eventKey, eventFunc })
      element.addEventListener(eventKey, eventFunc.bind(entry))
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

function setUpdateFunc (entry, options) {
  entry.update = function () {
    if (!this.mounted) return
    traverse(this, null, options)
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

function setGetParentFunc (entry) {
  entry.getParent = function (count) {
    let parent = this.parent
    count--
    while (count--) {
      parent = parent.parent
    }
    return parent
  }
}

function childrenToArray (children) {
  let childs = []
  if (Array.isArray(children)) {
    // simple child array
    childs = children
  } else if (typeof children === 'object') {
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

function mount (entry, parent, options) {
  if (entry.mounted) return
  // Assign default properties
  if (parent) entry.parent = parent
  if (options.context) entry.context = options.context
  if (!entry.state) entry.state = {}

  // Create element from DOM
  entry.element = document.createElement(entry.tag)
  entry.mounted = true

  // Register events
  setElementEvents(entry)

  // Set helper functions
  setUpdateFunc(entry, options)
  setStateFunc(entry)
  setGetParentFunc(entry)

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
}

function detach (entry) {
  if (!entry.appended) return
  entry.parent.element.removeChild(entry.element)
  entry.appended = false
  // Detach childs recursive
  childrenToArray(entry.children).forEach((child) => detach(child))
}

function applyRender (entry, render) {
  if (!render) return
  if (typeof render === 'function') {
    return applyRender(entry, entry.render())
  }

  if (typeof render === 'string') {
    if (entry.html) entry.element.innerHTML = render
    else entry.element.textContent = render
    return
  }

  //const { html, value } = render
  const oldChildren = entry.children
  entry.children = render

  const oldChildrenArray = childrenToArray(oldChildren)
  const newChildrenArray = childrenToArray(entry.children)

  oldChildrenArray.forEach((oldChild) => {
    // Detach all child because they might not be in the same order
    detach(oldChild)

    // Unmount childs not return by render
    const matchChild = newChildrenArray.find((newChild) => {
      return newChild.element && oldChild.element.isEqualNode(newChild.element)
    })

    if (!matchChild) unmount(oldChild)
  })
}

// Recursive function that compute the tree
function traverse (entry, parent, options) {
  // Apply all definition from entry obj [if not already mounted]
  mount(entry, parent, options)

  // Set element attributes everytime we traverse or update the entry (template)
  updateElementProps(entry)

  applyRender(entry, entry.render)

  // IMPORTANT - entry.children might be modified by applyRender
  const childrenArray = childrenToArray(entry.children)
  childrenArray.forEach((child) => {
    traverse(child, entry, options)
  })

  // Append to DOM [if not already appended]
  append(entry)
}

export function createApp (entry, rootElement, options) {
  const parent = { element: rootElement }
  traverse(entry, parent, options)
}

// Helpers
export function cl (styles, ...classNames) {
  return classNames.map((className) => {
    return styles[className]
  }).join(' ')
}

function camelToDash (str) {
  return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()
}

export function st (styles) {
  let str = ''
  Object.keys(styles).forEach((key) => {
    str += `${camelToDash(key)}:${styles[key]};`
  })
  return str
}

export function el (tag, renderOrChilds, props) {
  const entry = { tag }
  if (renderOrChilds) {
    if (typeof renderOrChilds === 'string' || typeof renderOrChilds === 'function') entry.render = renderOrChilds
    else entry.children = renderOrChilds
  }
  if (props) entry.props = props
  return entry
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

export function createHtml (entry, parent) {
  if (parent && !entry.parent) entry.parent = parent
  if (!entry.getParent) setGetParentFunc(entry)

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
