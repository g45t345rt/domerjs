import { newEl, router } from 'domerjs'
import styles from './styles.css'

const elMaster = newEl('div', { attrs: { id: 'master' } })

const elMenu = newEl('div', { attrs: { class: styles.menu } })
const { setRouteEl } = router

const elLinkPage1 = newEl('a', { value: 'Page 1' })
setRouteEl(elLinkPage1, '/')

const elLinkPage2 = newEl('a', { value: 'Page 2' })
setRouteEl(elLinkPage2, '/page2')

const elLinkPage3 = newEl('a', { value: 'Page 3 (not found)' })
setRouteEl(elLinkPage3, '/page3')


elMenu.append(elLinkPage1, elLinkPage2, elLinkPage3)
elMaster.append(elMenu)

export default elMaster
