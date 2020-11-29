import { newEl } from 'domerjs'

const elNotFound = newEl('div')

const elTitle = newEl('h1', { value: 'Page not found - 404' })

const elDescription = newEl('p', { value: 'The page you are looking for does not exists' })

elNotFound.append(elTitle, elDescription)
export default elNotFound