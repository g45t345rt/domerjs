import { updateEl } from './element'

const updates = []
const keys = {}

export function assign (key, el) {
  if (Array.isArray(key)) key.forEach((k) => assign(k, el))
  else if (Array.isArray(el)) el.forEach((e) => assign(key, e))
  else updates.push({ key, el })
}

export function set (key, updateFunc) {
  keys[key] = { updateFunc }
}

export function apply (key, updateFunc) {
  let func = updateFunc
  const update = keys[key]
  if (update) func = update.updateFunc

  updates.filter((update) => update.key === key).forEach(({ el }) => {
    if (typeof func === 'function') func(el) // custom update
    else updateEl(el) // or use element update
  })
}
