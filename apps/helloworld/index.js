import { newEl } from 'domerjs'

const helloworld = newEl('div', { value: 'Hello world!' })
window.document.body.append(helloworld)