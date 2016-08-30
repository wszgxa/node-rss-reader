import { SourceDetail as Detail } from '../model/source'
export function saveData (ctx, next) {
  if (ctx.event && ctx.evnet.type === 'saveDetail' ) {
    const data = ctx.event.data
    const source = data.feed.link
    let details = data.feed.entries.map(function (obj) {
      return Object.assign(obj, {
        source: source
      })
    })
    Detail.collection.insert(details, function(err, res){
      if (err) {
        console.log(err)
      } else {
        console.log('success')
      }
    })
  }
  next()
}