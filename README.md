domer is a minuscule Javascript library for creating declarative user interfaces. It will help you keep your code organized without become a mess in the long run.

It does not implement any virtual DOM.

## Install
````
npm i domer
````

## Basic usage (es6)
````
import { createApp, el } from 'domer'

// Declartive object
const helloworld = {
  tag: 'div',
  render: 'Hello world'
}

// Or function
// const helloworld = el('div, 'helloworld')

createApp(helloworld, document.body)
````

This is a simple helloworld app but you can create complex apps without really changing the workflow.

## Why?

There is a lot of web framework out there but I wanted something that basically does 3 things
- Still use DOM but with conditional rendering
- Automatically assign attributes and events to elements while keeping things organized
- Light and avoid class instantiation

## How does it work?
It's a recursive function that compute each objects in the tree while using DOM to append elements, change attributes and listen to declared events.

````
{
  // Declarative properties
  tag: string // element tagName
  render: [function, array, object, string]
  children: [array, object] // tree childs
  props: object // Set element attributes
  events: object // Set element events
  windowEvents: object // Set window events
  documentEvents: object // Set document events
  state: object // properties in the object state
  
  // Inject props
  context: object // global context accessible anywhere in the tree
  element: object // The actual DOM element
  mounted: boolean // Is mounted or not
  parent: object // tree parent object
  listeners: array // keep track of events
  state: object // default to empty object

  // Inject helper functions
  getParent: func // get parent from count `this.getParent(3)` = `this.parent.parent.parent`
  update: func // update by calling render and element props 
  setState: func // assign new props to state and update object and childs
  onMount: func // called when object is mouted
  onUnMount: func // called when object is unmounted
}
````

## Is it fast?

I mean there is no virtual dom and use DOM directly so it's as fast as DOM itself.
Calling `update()` does not render the entire app but actually renders from the position in the tree.

Let's say we have a,b,c,d,e,f,g
a contains b, c
b contains d
c contains e, f
e contains g

Calling update on
a = render entire app a,b,c,d,e,f,g
b = render b, d
c = render c, e, f, g
d = render d
e = render e, g
f = render f
g = render g

Not sure if it's clear but 

## Documentation

Full docs at domer.com or check out the doc folder in the Github repo

## Server-side rendering

It's a simple `createHtml()` function that traverse the tree and compite the html code. We actually don't need fake DOM.

## License

MIT