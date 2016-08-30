import Router from 'koa-router'
import { rssParseUrl } from '../lib/rss-parser'
import { Source, SourceDetail } from '../model/source'
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

router.get('/500', async (ctx, next) => {
  ctx.render('500', { title: '未知错误' })
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
    let source = new Source(rssInfo)
    await source.save()
      .then((res) => {
        console.log(res)
        console.log('lala')
        ctx.render('add_url', {
          title: '添加订阅URL',
          statuCode: 1,
          status: '成功',
          rssInfo: rssInfo
        })
        // 后置存储数据
        SourceDetail.saveDetails(rssData)
      })
      .catch((err) => {
        let stMsg = '失败'
        if(err.code == 11000) {
          stMsg = '已经存在该url,请勿重复加载'
        }
        console.log(err)
        ctx.render('add_url', {
          title: '添加订阅URl',
          statuCode: 0,
          status: '失败'
        })
      })
  }
  next()
})

module.exports = router
