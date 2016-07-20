import Koa from 'koa'
import path from 'path'
import logger from 'koa-logger'
import json from 'koa-json'
import koaBody from 'koa-body'
import convert from 'koa-convert'
import source from './router/source'

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
  }
})
// 
app.use(async (ctx, next) => {
  await next()
  if(ctx.err != undefined ) {
    ctx.body = resMsg(false, ctx.err)
  }
})
app.use(convert(koaBody()))

app.use(logger())
app.use(json())
app.use(source.routes())

app.listen(process.env.PORT | 3000)
console.log(`Server up and running! On port ${process.env.PORT || 3000}!`)