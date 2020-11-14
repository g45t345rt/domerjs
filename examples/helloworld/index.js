import { createApp } from 'domerjs'

const helloWorld = {
  tag: 'div',
  render: 'Hello world'
}

createApp(helloWorld, document.getElementById('app'), {})