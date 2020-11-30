import { nanoid } from 'nanoid'
import * as updater from './updater'

export let ids = window.__ssr || []

let elIndex = 0
export function newEl (tagName, options = {}) {
  let el = null
  const { attrs = {}, events = {}, dataset = {}, classList = [], value, html, updateOn, useSSR = true } = options

  let data = {}

  if (useSSR && window.isServer) {
    el = window.document.createElement(tagName)
    el.id = nanoid(5)
    ids.push({ id: el.id, i: elIndex })
  } else {
    const item = ids.find(({ i }) => i === elIndex)
    if (item) el = window.document.getElementById(item.id)
    if (!el) el = window.document.createElement(tagName)
  }

  if (window.isServer && !useSSR) data.append = false

  elIndex++

  //data.ssr = useSSR
  data.render = { value, html }
  //el.render = { value, html }

  el.data = data

  // Render value to element
  updateEl(el)

  // Attributes
  Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]))

  // Classlist
  classList.forEach((key) => el.classList.add(key))

  // Dataset
  Object.keys(dataset).forEach((key) => el.dataset[key] = dataset[key])

  // Events
  Object.keys(events).forEach((key) => el.addEventListener(key, events[key]))

  // Attach update keys
  if (updateOn) {
    updater.assign(updateOn, el)
  }

  return el
}

const valueTags = ['INPUT', 'TEXTAREA']
export function updateEl (el, newValue) {
  let { value, html } = el.data.render
  if (newValue) value = newValue
  if (!value) return

  if (typeof value === 'function') {
    const funcValue = value(el)
    if (funcValue) updateEl(el, funcValue)
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