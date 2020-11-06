import { el, cl } from 'domer'

import styles from './styles.css'
import img from '../images/jslogo.png'

const logo = el('img', null, { src: img, width: 100, class: cl(styles, 'logo') })

const title = el('div', 'domer', { class: cl(styles, 'title') })

const slogan = el('div', 'Minuscule JavaScript library for creating declarative user interfaces.', { class: cl(styles, 'slogan') })

const links = el('div', [
  el('a', 'Documentation', { class: cl(styles, 'link', 'docLink') }),
  el('a', 'Examples', { class: cl(styles, 'link', 'exaLink') }),
  el('a', 'Github', { class: cl(styles, 'link', 'githubLink'), href: 'https://github.com' })
], { class: cl(styles, 'links') })

const featureItem = ({ title, description }) => el('div',
  [
    el('div', title, { class: cl(styles, 'featureTitle') }),
    el('div', description, { class: cl(styles, 'featureDescription') })
  ],
  { class: cl(styles, 'featureItem') }
)

const features = el('div', [
  featureItem({
    title: 'Tiny, simple & applicable',
    description: 'Not more than 5kb to help you create an organized web application.'
  }),
  featureItem({
    title: 'Declarative structure',
    description: 'Write what your app is rather than describing how to render things.'
  }),
  featureItem({
    title: 'Straigth up DOM and Javascript',
    description: `Knowledge of DOM and javascript is all you need. You don't need to learn complex workflow.`
  })
], { class: cl(styles, 'features') })

export default el('div', [
  logo,
  title,
  slogan,
  links,
  features
], { class: cl(styles, 'home') })
