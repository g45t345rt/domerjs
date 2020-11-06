import { Remarkable } from 'remarkable'
const md = new Remarkable()

const title = (text) => ({
  tag: 'h3',
  render: text
})

const inputDesc = {
  tag: 'div',
  render: 'Enter some markdown'
}

const input = {
  tag: 'textarea',
  render: function () {
    return editor.state.markdownText
  },
  events: {
    input: function (e) {
      const { value } = e.target
      editor.setState({ markdownText: value })
    }
  }
}

const inputArea = {
  tag: 'div',
  children: [
    title('Input'),
    inputDesc,
    input
  ]
}

const outputText = {
  tag: 'div',
  html: true,
  render: function () {
    return md.render(editor.state.markdownText)
  }
}

const outputArea = {
  tag: 'div',
  children: [
    title('Output'),
    outputText
  ]
}

const editor = {
  tag: 'div',
  state: {
    markdownText: 'Hello, **world**!s'
  },
  children: [
    inputArea,
    outputArea
  ]
}

export default editor