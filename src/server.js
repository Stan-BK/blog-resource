const koa = require('koa')
const path = require('node:path')
const fs = require('node:fs')

const PORT = 3002
const app = new koa()

app.use(async (ctx) => {
  const p = path.resolve(__dirname, '..' + ctx.url)
  ctx.body = await new Promise((resolve, reject) => fs.readFile(p, 'utf-8', (err, data) => {
    if (err != null) reject(err)
    resolve(data)
  }))
})

app.listen(PORT, () => console.log(`server run on ${PORT}`))