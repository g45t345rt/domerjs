import { newEl, router } from 'domerjs' // Parcel bundler alias in package.json

import 'regenerator-runtime/runtime' // required for JSDOM
import 'normalize.css'
import './font.css'
import './styles.css'

import home from './home'
import doc from './doc'
import master from './master'
import notfound from './notfound'

const app = newEl('div')
router.setRoot(app)

router.assign('/doc', doc, master)
router.assign('/', home)
router.assign('', notfound)

router.apply()

window.document.body.append(app)
