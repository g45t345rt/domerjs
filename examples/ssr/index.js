import pretty from 'pretty'

import { createHtml, createApp } from 'domerjs'

import counter from '../counter'
import helloWorld from '../helloworld'
import todomvc from '../todomvc'

const option = (value, selected) => ({
  tag: 'option',
  props: selected ? { value, selected } : { value },
  render: value
})

const changeApp = {
  tag: 'select',
  props: {
    value: 'helloworld'
  },
  render: [
    option('helloworld', true),
    option('counter'),
    option('todo')
  ],
  events: {
    change: function (e) {
      const { value } = e.target
      const { displayHtml } = this.parent.children
      let html = '' 
      if (value === 'helloworld') html = createHtml(helloWorld)
      if (value === 'counter') html = createHtml(counter)
      if (value === 'todo') html = createHtml(todomvc)
      displayHtml.setState({ html })
    }
  }
}

const displayHtml = {
  tag: 'pre',
  state: { html: '' },
  render: function () {
    return pretty(this.state.html)
  }
}

const ssr = {
  tag: 'div',
  render: {
    changeApp,
    displayHtml
  }
}

createApp(ssr, document.getElementById('app'), {})
