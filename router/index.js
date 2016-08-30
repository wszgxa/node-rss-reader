import Router from 'koa-router'
import rssParse from 'rss-parser'
const rssUrl = 'http://hiluluke.cn/atom.xml'
const router = Router()

router.prefix('/')

router.get('/', async (ctx, next) => {
  let userName = 'hehe'
  let rssRes = await rssParse.parseURL(rssUrl, function(err, parsed) {
    console.log(parsed);
    return parsed
  }) 
  await ctx.render('index', {
    name: userName,
    title: 'lalal'
  })
})
module.exports = router
