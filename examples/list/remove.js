const remove = (list) => ({
  tag: 'input',
  props: { type: 'button', value: 'remove' },
  events: {
    click: function () {
      list.pop()
    }
  }
})

export default remove