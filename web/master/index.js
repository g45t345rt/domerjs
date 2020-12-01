import { newEl } from 'domerjs'
import styles from './styles.css'

import menu from './menu'
import dropdownMenu from './dropdownMenu'
import breadcrumb from './breadcrumb'

const master = newEl('div', { attrs: { class: styles.master } })

export const page = newEl('div', { classList: [styles.page] })
page.append(breadcrumb)
master.append(dropdownMenu, menu, page)

export default master