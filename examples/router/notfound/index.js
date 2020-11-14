const goBack = {
  tag: 'input',
  props: { type: 'button', value: 'Go back' },
  events: {
    click: function () {
      history.back()
    }
  }
}

const title = { tag: 'h1', render: '404 - Not found' }

const description = { tag: 'p', render: 'The page you are looking for does not exists.' }

const notfound = {
  tag: 'div',
  render: [goBack, title, description]
}

export default notfound