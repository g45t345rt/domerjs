import { router, newEl } from 'domerjs'

import elMaster from './master'
import elNotFound from './pages/notFound'
import elPage1 from './pages/page1'
import elPage2 from './pages/page2'

const test = newEl('div', { attrs: { id: 'testa' }, value: 'asdasd' })

const pages = ['/', '/page1', '/page2']
router.set(pages, elMaster)
router.set(['/', '/page1'], elPage1, elMaster)
router.set('/page2', elPage2, elMaster)

// not found
router.set('', test)
router.set('', elNotFound)

router.apply()
