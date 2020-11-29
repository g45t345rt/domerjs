import { newEl } from '../../../src'

const elPage = newEl('div')

const elTitle = newEl('h1', {
  value: 'Page 1 title'
})

const elDescription = newEl('p', {
  value: 'page1page1page1',
  events: {
    click: () => {
      alert('page1')
    }
  }
})

elPage.append(elTitle, elDescription)

export default elPage