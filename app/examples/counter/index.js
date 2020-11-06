const timer = {
  tag: 'div',
  state: { seconds: 0 },
  onMount: function () {
    this.setState({ seconds: 0 })
    this.state.interval = setInterval(() => {
      const { seconds } = this.state
      this.setState({ seconds: seconds + 1 })
    }, 1000)
  },
  onUnMount: function () {
    clearInterval(this.state.interval)
  },
  render: function () {
    const { seconds } = this.state
    return `Seconds: ${seconds}`
  }
}

export default timer
