const add = (list) => ({
  tag: 'input',
  props: { type: 'button', value: 'add' },
  events: {
    click: function () {
      list.push('new')
    }
  }
})

export default add