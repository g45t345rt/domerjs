import { newEl, router } from 'domerjs'
import styles from './styles.css'

const notFound = newEl('div', { attrs: { class: styles.notFound } })

const title = newEl('h1', { value: '404 | Page not found' })

const description = newEl('p', { value: 'The page you are looking for does not exists.' })

const backButton = newEl('button', { value: 'Go to home page' })
router.setRouteEl(backButton, '/')

notFound.append(title, description, backButton)
export default notFound