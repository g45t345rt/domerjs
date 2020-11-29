import { newEl } from 'domerjs'

const elPage = newEl('div')

const elTitle = newEl('h1', { value: 'Page 2' })

const elDescription = newEl('p', { value: 'This is the page 2'})

elPage.append(elTitle, elDescription)
export default elPage