import Router from 'koa-router'
import { Source, SourceKind } from '../model/source.js'
import { resMsg } from '../helper.js'
const router = Router()
router.prefix('/source')

router.post('/add/kind', async (ctx, next) => {
  let data = ctx.request.body
  if (data.kind == '') {
    ctx.err = "请输入种类"
    return
  }
  console.log(ctx.request.body.kind)
  let sourceKind = new SourceKind({ kind: ctx.request.body.kind })
  await sourceKind.save((err) => {
    if (err) {
      ctx.err = err.message
    } else {
      ctx.body = resMsg(true, '添加成功')
    }
  })
})
router.get('/', (ctx, next) => {
  ctx.body = { title: 'nihao' }
})

module.exports = router
