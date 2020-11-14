import list from "../todomvc/list"

export default (entry) => ({
  tag: 'div',
  render: function () {
    let itemCount = 0
    const { lists } = entry.state
    lists.forEach((list) => {
      const { items } = list.state
      itemCount += items.length
    })
    return `${lists.length} list - ${itemCount} items`
  }
})