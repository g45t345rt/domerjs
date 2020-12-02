import { nanoid } from 'nanoid'
import { emptyChilds } from './helpers'
import * as updater from './updater'

const ID_SIZE = 6
export let ids = window.__ssr || []
const elements = []

let elIndex = 0
export function newEl (tagName, options = {}) {
  // value, html
  const { attrs = {}, events = {}, dataset = {}, classList = [], updateOn } = options
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

  elements.push({ el, options })
  elIndex++

  // Render value to element
  updateEl(el)

  // Attributes
  Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]))

  // Classlist
  if (typeof classList === 'string') el.classList.add(classList)
  else if (Array.isArray(classList)) classList.forEach((key) => el.classList.add(key))

  // Dataset
  Object.keys(dataset).forEach((key) => el.dataset[key] = dataset[key])

  // Events
  Object.keys(events).forEach((key) => el.addEventListener(key, events[key]))

  // Attach update keys
  if (updateOn) updater.assign(updateOn, el)

  return el
}

export function newElClass (classList, value, tagName = 'div') {
  return newEl(tagName, { classList, value })
}

function getElementOptions (el, index = false) {
  const elMatch = (el1, el2) => el1.__id === el2.__id
  if (index) return elements.findIndex((item) => elMatch(item.el, el))
  else {
    const data = elements.find((item) => elMatch(item.el, el))
    if (data) return data.options
  }
}

function setElementOptions (el, newOptions) {
  const index = getElementOptions(el, true)
  if (index !== -1) {
    elements[index].options = { ...elements[index].options, ...newOptions }
  }
}

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

const valueTags = ['INPUT', 'TEXTAREA']
export function updateEl (el, newOptions) {
  if (newOptions) setElementOptions(el, newOptions)
  const { value, html } = getElementOptions(el)
  renderEl(el, value, html)
}