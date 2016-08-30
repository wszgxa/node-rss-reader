import rssParser from 'rss-parser'
/**
 * rssParseUrl
 * 封装异步操作
 */
export const rssParseUrl = function (url) {
  let promise = new Promise(function (resolve, reject){
    rssParser.parseURL(url, function (err, data) {
      if (err) reject(err)
      // 返回数据
      resolve(data)
    })
  })
  return promise
}