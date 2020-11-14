# API

### Main functions

```js
function createApp(root, element, options)
```

Render root object and childrens recursively and append at dom element

---

```js
function createHtml(root, options)
```

Convert root object and childrens recursively into html string (SSR)


### Helper functions

```js
function cl(styles, ...classNames)
```
Convert class object list to string class names

---

```js
function st(styles)
```
Convert object style to string style names
