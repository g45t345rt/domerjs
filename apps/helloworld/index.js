import { newEl } from 'domerjs'

const helloworld = newEl('div', { value: 'Hello world!' })
document.body.append(helloworld)