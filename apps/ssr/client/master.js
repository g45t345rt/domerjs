import { nanoid } from 'nanoid'
import { newEl, router } from '../../../src'

const master = newEl('div')

const { setRouteEl } = router
const linkPage1 = newEl('a', { value: 'Page 1' })
setRouteEl(linkPage1, '/page1')
const linkPage2 = newEl('a', { value: 'Page 2' })
setRouteEl(linkPage2, '/page2')
const linkPage3 = newEl('a', { value: 'Not found' })
setRouteEl(linkPage3, `/${nanoid()}`)

master.append(linkPage1, linkPage2, linkPage3)

export default master
