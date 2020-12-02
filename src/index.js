import * as router from './router'
import * as fetcher from './fetcher'
import * as helpers from './helpers'
import { newEl, updateEl, newElClass, setElKey, update, updateSet } from './element'

import SSR from './ssr'

export {
  // element
  newEl,
  newElClass,
  updateEl,
  update,
  updateSet,
  setElKey,
  // others
  router,
  fetcher,
  helpers,
  SSR
}

