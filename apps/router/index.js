import { router, newEl } from 'domerjs'

import elMaster from './master'
import elNotFound from './pages/notFound'
import elPage1 from './pages/page1'
import elPage2 from './pages/page2'

const test = newEl('div', { attrs: { id: 'testa' }, value: 'asdasd' })

router.assign(['/', '/page1'], elPage1, elMaster)
router.assign('/page2', elPage2, elMaster)

router.assign('', test)
router.assign('', elNotFound)

router.apply()
