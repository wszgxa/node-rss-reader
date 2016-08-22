import Router from 'koa-router'

const router = Router()

router.prefix('/')

router.get('/', async (ctx, next) => {
  let userName = 'hehe'
  await ctx.render('index', {
    name: userName,
    title: 'lalal'
  })
})
module.exports = router
