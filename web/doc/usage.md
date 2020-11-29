# Usage

## Simple helloworld

```js
import { newEl } from 'domerjs'

// Declarative object
const helloworld = newEl({
  tag: 'div',
  value: 'Hello world'
})

document.body.append(helloworld)
```
