//import 'regenerator-runtime/runtime'

import { newEl, router, fetcher } from '../../../src'

import styles from './styles.css'

import page1 from './page1'
import page2 from './page2'

import notFound from './notfound'
import master from './master'

const pages = ['/', '/page1', '/page2']
router.set(pages, master)
router.set(['/', '/page1'], page1, master)
router.set('/page2', page2, master)
router.set('', notFound)

fetcher.apply()
