import { cl, link } from 'domerjs'

import styles from './styles.css'
import img from '../images/jslogo.png'

const logo = { tag: 'img', props: { src: img, width: 100, class: cl(styles, 'logo') } }

const title = { tag: 'div', render: 'domerjs', props: { class: cl(styles, 'title') } }

const slogan = { tag: 'div', render: 'Minuscule JavaScript library for creating declarative user interfaces.', props: { class: cl(styles, 'slogan') } }

const links = {
  tag: 'div',
  render: [
    link('/doc', 'Documentation', { class: cl(styles, 'link', 'docLink') }),
    link('/examples', 'Examples', { class: cl(styles, 'link', 'exaLink') }),
    { tag: 'a', render: 'Github', props: { class: cl(styles, 'link', 'githubLink'), href: 'https://github.com/g45t345rt/domerjs' } }
  ],
  props: { class: cl(styles, 'links') }
}

const featureItem = ({ title, description }) => ({
  tag: 'div',
  render: [
    { tag: 'div', render: title, props: { class: cl(styles, 'featureTitle') } },
    { tag: 'div', render: description, props: { class: cl(styles, 'featureDescription') } }
  ],
  props: { class: cl(styles, 'featureItem') }
})

const features = {
  tag: 'div',
  render: [
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
  ],
  props: { class: cl(styles, 'features') }
}

const usingDomerjs = { tag: 'div', render: 'The entire website is working with domerjs!', props: { class: cl(styles, 'usingDomerjs') } }

const home = {
  tag: 'div',
  render: [
    logo,
    title,
    slogan,
    links,
    features,
    usingDomerjs
  ],
  props: { class: cl(styles, 'home') }
}

export default home
