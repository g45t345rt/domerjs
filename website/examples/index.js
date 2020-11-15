import { cl } from 'domerjs'

import styles from './styles.css'

const jsfiddle = [
  {
    name: 'Hello world',
    description: 'Simple hello world example.',
    url: '//jsfiddle.net/2nfsox06/embed/js,result/dark/'
  },
  {
    name: 'Counter',
    description: 'Displays incrementing number every seconds.',
    url: '//jsfiddle.net/jtc0e1zg/embed/js,result/dark/'
  },
  {
    name: 'Localization',
    description: 'Multiple languages implemention within a single page app.',
    url: '//jsfiddle.net/jdpLy0eo/embed/js,result/dark/'
  },
  {
    name: 'Router',
    description: 'Use domerjs helper functions to create routing logic.',
    url: '//jsfiddle.net/m32d10ah/embed/js,result/dark/'
  },
  {
    name: 'Markdown',
    description: 'Simple usage of external JS library like Remarkable.',
    url: '//jsfiddle.net/1b0mk46z/embed/js,result/dark/'
  },
  {
    name: 'TODO MVC',
    description: `Check out the syntax required to create the TODO app and see if you're interested in domerjs.`,
    url: '//jsfiddle.net/yotnsz0p/embed/js,css,result/dark/'
  }
]

const script = (url) => ({ tag: 'script', props: { src: url } })
const title = (name) => ({ tag: 'h2', props: { id: name.toLowerCase() }, render: name })
const description = (desc) => ({ tag: 'p', render: desc })

const example = ({ name, url, description: desc }) => ({
  tag: 'div',
  props: { class: cl(styles, 'example') },
  render: [
    title(name),
    description(desc),
    script(url)
  ]
})

const page = jsfiddle.map((props) => example(props))

export default {
  tag: 'div',
  render: page
}