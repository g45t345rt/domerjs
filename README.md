# domerjs

Create small to big applications while keeping every logic inside declative objects.

domerjs is essentially just a bunch of helper functions for creating declarative user interfaces. It forces you to write code while decoupling the HTML hierarchy tree. I personnaly think it organized your code without really thinking about it.

It does not implement any virtual DOM.
For Server Side Rendering you need to use JSDOM.

## Install
````
npm i domerjs
````

## Basic usage (es6)
````
import { newEl } from 'domerjs'

// Declarative object
const helloworld = newEl('div', {
  value: 'Hello world'
})

document.body.append(helloworld)
````

This is a simple helloworld app but you can create complex apps without changing the structure. Here is a list of basic to more complete examples: https://domerjs.com/examples

## Why?

There is a lot of web framework out there but I wanted something that basically does 3 things
- Still use DOM but with conditional rendering
- Automatically assign attributes and events to elements while keeping things organized
- Light in size and avoid class instantiation

## Definitions

Functions
````
// Main functions
newEl(tagName, options)

// Router

// SSR

````

## Is it fast?

There is no virtual dom so it's as fast as DOM itself. Plus, you control what gets updated so you don't have underground logic you don't about that can affect the performance.

## Documentation

Full docs at https://domerjs.com/doc or check out the doc folder in the Github repo

## Server-side rendering

Use JSDOM to mock DOM on the server and on request return the document html.

See the ssr example in the apps folder
Terminal 1 `npm run apps-ssr-client` Watch & bundle client side code into one js file
Terminal 2 `npm run apps-ssr-server` Watch & bundle server side code into one js file
Terminal 3 `npm run apps-ssr` Run single server js file with nodejs (nodemon watch files)

## License

MIT