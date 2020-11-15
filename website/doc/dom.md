# DOM Equivalent

```
  import { createApp } from 'domerjs'

  const helloworld = {
    tag: 'div,
    render: 'Hello world!'
  }

  createApp(helloworld, document.body)
```

```
  document.body.textContent = 'Hello world!'
```