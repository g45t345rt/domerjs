import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'

if (!global.window) {
  const jsdom = new JSDOM()
  global.window = jsdom.window
  global.window.isServer = true
  global.jsdom = jsdom
}

if (!global.fetch) {
  global.fetch = (url, options) => {
    let newUrl = url
    const relativeUrlRegex = /^https?:\/\/|^\/\//i
    if (!relativeUrlRegex.test(url)) {
      // Node only use absolute url
      if (port) newUrl = `http://localhost:${process.env.PORT}${newUrl}`
      else newUrl = `http://localhost${newUrl}`
    }

    return fetch(newUrl, options)
  }
}