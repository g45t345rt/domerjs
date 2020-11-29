import { emptyChilds, newEl, fetcher } from '../../../src'
import styles from './styles.css'

const elPage = newEl('div')

const elTitle = newEl('h1', {
  value: 'Page 2 title'
})

const elDescription = newEl('p', {
  value: 'page2page2page',
  events: {
    click: () => {
      alert('page2')
    }
  }
})

const modals = newEl('div')

const modal = (item) => {
  if (modals.children.length > 0) return

  const closeModal = () => {
    shadow.remove()
    modal.remove()
  }

  const shadow = newEl('div', {
    attrs: { class: styles.modalShadow },
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

  const comments = newEl('div')

  const loading = newEl('div', { value: 'loading...' })

  fetcher.get(`https://jsonplaceholder.typicode.com/posts/${item.id}/comments`, (data) => {
    loading.remove()
    data.forEach(({ email }) => {
      const elComment = newEl('div', { value: email })
      comments.append(elComment)
    })
  })

  comments.append(loading)
  modal.append(close, title, description, comments)
  modals.append(shadow, modal)
}

const elPosts = newEl('div')

//if (window.isServer) {
fetcher.attach(`https://jsonplaceholder.typicode.com/posts`, (data) => {
  emptyChilds(elPosts)
  data.forEach(item => {
    const elPost = newEl('div', {
      useSSR: false,
      value: `<div class="${styles.post}">
          <div class="${styles.postTitle}">${item.title}</div>
          <div>${item.body}</div>
        </div>`,
      html: true,
      events: {
        click: (e) => {
          console.log(e.target.textContent)
          modal(item)
        }
      }
    })

    elPosts.append(elPost)
  })
})
//}

elPage.append(elTitle, elDescription, elPosts, modals)

export default elPage