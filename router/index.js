import Router from 'koa-router'
import { rssParseUrl } from '../lib/rss-parser'
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
    title: '主页'
  })
  next()
})
router.get('/add-url', async (ctx, next) => {
  await ctx.render('add_url', {
    title: '添加订阅URL'
  })
  next()
})
router.post('/add-url', async (ctx, next) => {
  let data = ctx.request.body
  let rssData = await rssParseUrl(data.url)
    .then((res) => { return res })
    .catch((err) => { return 'fail' })

  if (rssData === 'fail') {
    ctx.render('add_url', {
      title: '添加订阅URl',
      statuCode: 0,
      status: '失败'
    })
  } else {
    let rssInfo = {
      title: rssData.feed.title,
      link: rssData.feed.link,
      feedUrl: rssData.feed.feedUrl
    }
    ctx.render('add_url', {
      title: '添加订阅URL',
      statuCode: 1,
      status: '成功',
      rssInfo: rssInfo
    })
  }
  next()

})
module.exports = router
