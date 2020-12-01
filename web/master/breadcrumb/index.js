import { newEl } from 'domerjs'

import styles from './styles.css'

const data = {
  '': 'Home',
  'doc': 'Documentation' 
}

const breadcrumb = newEl('div', {
  classList: [styles.breadcrumb],
  value: () => {
    const currentPath = window.location.pathname
    const paths = currentPath.split('/')
    return paths.map((path) => data[path]).join(' / ')
  }
})

export default breadcrumb