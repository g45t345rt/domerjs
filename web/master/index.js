import { newEl } from 'domerjs'
import styles from './styles.css'

import menu from './menu'

const master = newEl('div', { attrs: { class: styles.master } })
master.append(menu)

export default master