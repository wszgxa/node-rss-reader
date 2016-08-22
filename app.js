import Koa from 'koa'
import path from 'path'
import logger from 'koa-logger'
import json from 'koa-json'
import koaBody from 'koa-body'
import convert from 'koa-convert'
// import views from 'koa-views'
import render from 'koa-ejs'
import co from 'co'
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
// 
app.use(async (ctx, next) => {
  await next()
  if(ctx.err != undefined ) {
    ctx.body = resMsg(false, ctx.err)
  }
})
// app.use(views(__dirname + '/views', {
//   extension: 'hbs',
//   map: {
//     hbs: 'handlebars'
//   }
// }))
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true
})
app.context.render = co.wrap(app.context.render);

app.use(convert(koaBody()))

app.use(logger())
app.use(json())
app.use(source.routes())
app.use(indexView.routes())

app.listen(process.env.PORT | 3000)
console.log(`Server up and running! On port ${process.env.PORT || 3000}!`)