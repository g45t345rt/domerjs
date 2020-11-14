const list = ({ defaultItems, renderItems, ...props }) => ({
  tag: 'div',
  state: {
    items: defaultItems || []
  },
  render: function () {
    return this.state.items.map((item) => renderItems(item))
  },
  push: function (newValue) {
    this.state.items.push(newValue)
    this.update()
  },
  pop: function () {
    this.state.items.pop()
    this.update()
  },
  ...props
})

export default list
