import { nanoid } from 'nanoid'
import { emptyChilds } from './helpers'

const ID_SIZE = 6
export let ids = window.__ssr || []
const renders = []

let elIndex = 0
export function newEl (tagName, options = {}) {
  const { attrs = {}, events = {}, dataset = {}, classList = [], value, html, updateKeys } = options
  let el = null

  if (window.isServer) {
    el = window.document.createElement(tagName)
    el.__id = nanoid(ID_SIZE)

    // Store id definition for client side
    el.dataset.ssrId = el.__id
    ids.push({ id: el.__id, i: elIndex })
  } else {
    const item = ids.find(({ i }) => i === elIndex)
    if (item) {
      el = window.document.querySelector(`[data-ssr-id="${item.id}"]`)
      if (el) el.__id = item.id
    }

    if (!el) {
      el = window.document.createElement(tagName)
      el.__id = nanoid(ID_SIZE)
    }
  }

  // Attributes
  Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]))

  // Classlist
  if (typeof classList === 'string') el.classList.add(classList)
  else if (Array.isArray(classList)) classList.forEach((key) => el.classList.add(key))

  // Dataset
  Object.keys(dataset).forEach((key) => el.dataset[key] = dataset[key])

  // Events
  Object.keys(events).forEach((key) => el.addEventListener(key, events[key]))

  if (updateKeys) setElKey(updateKeys, el)

  // Saving essential information for ssr and updater
  renders.push({ el, value, html })
  elIndex++

  // Render value to element
  updateEl(el)

  return el
}

export function newElClass (classList, value, tagName = 'div') {
  return newEl(tagName, { classList, value })
}

const elMatch = (el1, el2) => el1.__id === el2.__id

const valueTags = ['INPUT', 'TEXTAREA']
function renderEl (el, value, html) {
  if (!value) return

  if (typeof value === 'function') {
    const funcValue = value(el)
    if (funcValue) renderEl(el, funcValue, html)
    return
  }

  // Array or object = element
  if (typeof value === 'object') {
    emptyChilds(el)
    if (Array.isArray(value)) value.forEach((v) => el.append(v))
    else el.append(value)
    return
  }

  if (valueTags.indexOf(el.tagName) !== -1) {
    el.value = value
    return
  }

  if (html) {
    el.innerHTML = value
    return
  }

  el.textContent = value
}

// updateEl(el, { value: '<div>asdas</div>', html: true })
export function updateEl (el, value, html) {
  const render = renders.find((r) => elMatch(r.el, el))
  if (value) {
    render.value = value
    if (value) render.html = html
  }

  renderEl(el, render.value, render.html)
}

const updates = []
const keys = {}

export function setElKey (key, el) {
  if (Array.isArray(key)) key.forEach((k) => setElKey(k, el))
  else if (Array.isArray(el)) el.forEach((e) => setElKey(key, e))
  else updates.push({ key, el })
}

export function updateSet (key, updateFunc) {
  keys[key] = { updateFunc }
}

export function update (key, updateFunc) {
  let func = updateFunc
  const update = keys[key]
  if (update) func = update.updateFunc

  updates.filter((update) => update.key === key).forEach(({ el }) => {
    if (typeof func === 'function') func(el) // custom update
    else updateEl(el) // or use element update
  })
}
