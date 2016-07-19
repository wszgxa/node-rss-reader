import Router from 'koa-router'
const router = Router()

router.get('/', async (ctx, next) => {
  await ctx.render('main', {
    title: 'mian'
  }, (err, html) => {
    if (err) {
      console.log(err);
    }
  });
})

module.exports = router
