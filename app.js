import Koa from 'koa'
import path from 'path'
import logger from 'koa-logger'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import co from 'co'
import convert from 'koa-convert'
import koaNunjucks from 'koa-nunjucks-2'
// router
import source from './router/api/source'
import indexView from './router/index'

import router from 'koa-router'
import { resMsg, koaErr } from './helper.js'
const app = new Koa()
// 错误处理
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.body = resMsg(false, err.message)
    ctx.status = err.status || 500
    console.log(err)
  }
})
// 接口错误处理
app.use(async (ctx, next) => {
  await next()
  if(ctx.err != undefined ) {
    ctx.body = resMsg(false, ctx.err)
  }
})

app.use(koaNunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    autoescape: true,
    watch: true
  }
}));


app.use(bodyParser())

app.use(logger())
app.use(json())
app.use(source.routes())
app.use(indexView.routes())

app.listen(process.env.PORT | 3000)
console.log(`Server up and running! On port ${process.env.PORT || 3000}!`)