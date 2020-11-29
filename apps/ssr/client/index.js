//import 'regenerator-runtime/runtime'

import { newEl, router, fetcher } from '../../../src'

import styles from './styles.css'

import page1 from './page1'
import page2 from './page2'

import notFound from './notfound'
import master from './master'

const app = newEl('div', { dataset: { id: 'app' } })

router.setRoot(app)

router.assign('', notFound)
router.assign(['/', '/page1'], page1, master)
router.assign('/page2', page2, master)

fetcher.apply()

window.document.body.append(app)
