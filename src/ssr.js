import { cache } from './fetcher'
import { newEl, updateEl, ids } from './element'

const { Element } = window
const append = Element.prototype.append
Element.prototype.append = function () {
  append.apply(this, [...arguments].filter((a) => !a.parentElement))
}

const appendChilds = Element.prototype.appendChild
Element.prototype.appendChild = function () {
  if (arguments.parentElement) return // don't append if child already as a parent
  appendChilds.apply(this, arguments)
}

export default (options) => {
  const { src, stylesheet, baseUrl = 'http://localhost' } = options

  const elStyle = newEl('link', {
    attrs: { rel: 'stylesheet', href: stylesheet }
  })

  const elScript = newEl('script', {
    attrs: { src }
  })

  const elSSR = newEl('script', {
    attrs: { type: 'text/javascript' }
  })

  const elCache = newEl('script', {
    attrs: { type: 'text/javascript' }
  })

  return {
    setUrl: (newUrl) => jsdom.reconfigure({ url: `http://localhost${newUrl}` }),
    toHtml () {
      const { document } = window
      updateEl(elCache, `window.__cache = ${JSON.stringify(cache)}`)
      updateEl(elSSR, `window.__ssr = ${JSON.stringify(ids)}`)

      document.head.append(elStyle)
      document.body.append(elSSR, elCache, elScript)

      return `<!DOCTYPE html>${document.documentElement.outerHTML}`
    }
  }
}
