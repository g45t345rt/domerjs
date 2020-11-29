import { newEl, router } from 'domerjs'

import styles from './styles.css'
import img from '../images/jslogo.png'

const logo = newEl('img', {
  attrs: { src: img, width: 100, class: styles.logo }
})

const title = newEl('div', {
  attrs: { class: styles.title },
  value: 'domerjs'
})

const slogan = newEl('div', {
  attrs: { class: styles.slogan },
  value: 'Collection of helper functions for creating declarative user interfaces.'
})

const docLink = newEl('a', {
  value: 'Documentation',
  attrs: { class: `${styles.link} ${styles.docLink}` }
})
router.setRouteEl(docLink, '/doc')

const exaLink = newEl('a', {
  value: 'Examples',
  attrs: { class: `${styles.link} ${styles.exaLink}` }
})
router.setRouteEl(exaLink, '/examples')

const githubLink = newEl('a', {
  value: 'Gihub',
  attrs: { class: `${styles.link} ${styles.githubLink}`, href: 'https://github.com/g45t345rt/domerjs' }
})

const links = newEl('div', { attrs: { class: styles.links } })
links.append(docLink, exaLink, githubLink)

function featureItem ({ title, description }) {
  return newEl('div', {
    value: () => {
      return `<div>
        <div class="${styles.featureTitle}">${title}</div>
        <div class="${styles.featureDescription}">${description}</div>
      </div>`
    },
    html: true,
    attrs: { class: styles.featureItem }
  })
}

const features = newEl('div', { attrs: { class: styles.features } })

features.append(
  featureItem({
    title: 'Tiny, simple & applicable',
    description: 'Not more than 5kb to help you create an organized web application.'
  }),
  featureItem({
    title: 'Includes presets',
    description: 'Routing, Server side rendering, fetch caching and other useful functions.'
  }),
  featureItem({
    title: 'Straigth up DOM and Javascript',
    description: `Knowledge of DOM and javascript is all you need. You don't need to learn complex workflow.`
  }))

const usingDomerjs = newEl('div', {
  attrs: { class: styles.usingDomerjs },
  value: 'The entire website is working with domerjs!'
})

const home = newEl('div', { attrs: { class: styles.home } })
home.append(logo, title, slogan, links, features, usingDomerjs)

export default home
