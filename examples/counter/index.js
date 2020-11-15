import { createApp } from 'domerjs'

const timer = {
  tag: 'div',
  state: { seconds: 0 },
  onMount: function () {
    this.state.interval = setInterval(() => {
      this.state.seconds += 1
      this.update()
    }, 1000)
  },
  onUnMount: function () {
    this.state.seconds = 0
    clearInterval(this.state.interval)
  },
  render: function () {
    const { seconds } = this.state
    return `Seconds: ${seconds}`
  }
}

createApp(timer, document.body)
