import Koa from 'koa'
import path from 'path'
import logger from 'koa-logger'
import bodyparser from 'koa-bodyparser'
import json from 'koa-json'
import index from './router/index'

const app = new Koa()
app.use(logger())
app.use(bodyparser({
  onerror: (err, ctx) => {
    ctx.throw('body parser error', 422)
  }
}))

app.use(json())
// 静态文件

app.use(index.routes())

app.listen(process.env.PORT | 3000)
console.log(`Server up and running! On port ${process.env.PORT || 3000}!`)