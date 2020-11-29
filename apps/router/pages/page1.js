import { newEl } from 'domerjs'

const elPage = newEl('div')

const elTitle = newEl('h1', { value: 'Page 1' })

const elDescription = newEl('p', { value: 'This is the page 1'})

elPage.append(elTitle, elDescription)
export default elPage