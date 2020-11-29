export const cache = window.__cache || []
const attachedFetch = []

let defaultRefresh = 100000

export function setOptions (options) {
  if (typeof options.refresh === 'number') defaultRefresh = options.refresh
}

export function attach (url, func, refresh = defaultRefresh) {
  attachedFetch.push({ url, func, refresh })
}

export function detach (url) {
  const index = attachedFetch.findIndex((x) => x.url === url)
  if (index !== -1) attachedFetch.splice(index, 1)
}

export function apply () {
  const fetches = attachedFetch.map(({ url, func, refresh }) => get(url, func, refresh))
  return Promise.all(fetches)
}

export function get (url, func, refresh = defaultRefresh) {
  return new Promise((resolve) => {
    const cacheItem = cache.find((c) => c.url === url)
    if (cacheItem && Date.now() - refresh < cacheItem.time) {
      resolve(func(cacheItem.data))
      return
    }
  
    fetch(url).then((res) => {
      res.json().then((data) => {
        if (!cacheItem) cache.push({ url, data, time: Date.now() })
        else {
          cacheItem.data = data
          cacheItem.time = Date.now()
        }
  
        resolve(func(data))
      })
    })
  })
}