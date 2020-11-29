import { newEl } from 'domerjs'
import styles from './styles.css'

const showModal = newEl('input', {
  attrs: { type: 'button' },
  value: 'Open modal',
  events: {
    click: () => {
      newModal({
        title: 'asdasdgsdfgsdfg',
        body: 'wretojkng wperijtgnejrwtngpio ejrntbpjnertpjbnertnbpejrnt bpok'
      })
    }
  }
})

const modals = newEl('div')

const newModal = (item) => {
  //if (modals.children.length > 0) return

  const closeModal = () => {
    modal.remove()
    shadow.remove()
  }

  const shadow = newEl('div', {
    attrs: { class: styles.shadow },
    events: {
      click: closeModal
    }
  })

  const modal = newEl('div', {
    attrs: { class: styles.modal }
  })

  const close = newEl('input', {
    attrs: { type: 'button' },
    value: 'Close',
    events: {
      click: closeModal
    }
  })

  const title = newEl('h2', {
    value: item.title
  })

  const description = newEl('div', {
    value: item.body
  })

  const subModal = newEl('input', {
    attrs: { type: 'button' },
    value: 'Open sub modal',
    events: {
      click: () => newModal({ title: 'subsubsub', body: 'asdgq erokmfgwe kormgfp[wo ekmrfpwmer pomwer[pokfm' })
    }
  })

  modal.append(close, title, description, subModal)
  modals.append(shadow, modal)
}

document.body.append(showModal, modals)