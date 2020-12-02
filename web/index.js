import { router } from 'domerjs' // Parcel bundler alias in package.json
router.setBaseUrl('/domerjs')

import 'regenerator-runtime/runtime' // required for JSDOM
import 'normalize.css'
import './font.css'
import './styles.css'

import home from './home'
import doc from './doc'
import master, { page } from './master'
import notfound from './notfound'

const pages = ['/doc']
router.set(pages, master)
router.set(pages, doc, page)

router.set('/', home)
router.set('', notfound)

router.apply()
