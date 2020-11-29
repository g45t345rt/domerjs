// Assign JS DOM and Fetch to server
// MUST BE ON TOP!
import './global'
import express from 'express'

import { newEl, SSR, router, fetcher } from '../../../src'
const ssr = SSR({ src: './client.js', stylesheet: './client.css' })

import '../client/index'

const port = process.env.PORT

// store icon in html to avoid making a favicon request on every history push or page fetch
const elFavicon = newEl('link', {
  attrs: { rel: 'icon', type: 'image/x-icon', href: 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAERERERERERERAAAAAAAAERAQAAAAAAEBEAEAAAAAEAEQABAAAAEAARAAAQAAEAABEAAAEAEAAAEQAAABEAAAARAAAAEQAAABEAAAEAEAAAEQAAEAABAAARAAEAAAAQABEAEAAAAAEAEQEAAAAAABAREAAAAAAAAREREREREREREAAAAAP/wAAF/6AABv9gAAd+4AAHveAAB9vgAAfn4AAH5+AAB9vgAAe94AAHfuAABv9gAAX/oAAD/8AAAAAAAA' },
  useSSR: false
})

window.document.head.append(elFavicon)

const server = express()

server.use(express.static('public'))

server.get('*', async (req, res) => {
  global.status = 200
  ssr.setUrl(req.url)

  router.apply()
  await fetcher.apply()

  res.status(global.status).send(ssr.toHtml())
})

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})