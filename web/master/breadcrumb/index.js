import { newEl, router } from 'domerjs'

import styles from './styles.css'

const data = {
  '': 'Home',
  'doc': 'Documentation' 
}

const breadcrumb = newEl('div', {
  classList: [styles.breadcrumb],
  value: () => {
    const cPath = router.currentPath()
    const paths = cPath.split('/')
    return paths.map((path) => data[path]).join(' / ')
  }
})

export default breadcrumb