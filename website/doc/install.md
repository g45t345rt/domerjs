# Install

## NPM

I've always use NPM when building applications so I added the project to the npm public repository.
```
npm install domerjs
```

### ECMAScript

You can use the new ECMAScript import

```js
import { createApp, createHtml, cl, st } from "domerjs";
```

## Server side rendering

You can use domerjs server side by calling the `createHtml()` function. It's a simple function that traverse the tree and compute the objects into html code. If you want to use DOM inside render function I suggest using [domjs](https://github.com/jsdom/jsdom).



