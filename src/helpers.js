export function replaceStringArgs (str, args) {
  let newStr = str
  Object.keys(args).forEach((key) => {
    let value = ''
    if (typeof args[key] === 'function') value = args[key]()
    else value = args[key]

    newStr = newStr.replace(`{{${key}}}`, args[key])
  })
  return newStr
}

export function applyValue (value, ...args) {
  if (typeof value === 'function') {
    const result = value()
    return applyValue(result, ...args)
  }
  return value
}

export function emptyChilds (el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild)
  }
}
