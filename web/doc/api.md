# API

### Element

```js
function newEl(tagName, options)

// Options definition
{
  value: [func, number, string],
  html: bool, // render value as html
  attrs: object, // dom attributes,
  dataset: object,
  events: object // dom events
}

```

Create dom element based on options

---

```js
function updateEl(el, newValue)
```

Update element with current value function or with newValue


### Router

```js
function cl(styles, ...classNames)
```
Convert class object list to string class names

---

```js
function st(styles)
```
Convert object style to string style names
