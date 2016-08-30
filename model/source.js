import mg from './db.js'

let sourceScheme = mg.Schema({
  title: String,
  link: String,
  feedUrl: {type: String, unique: true}
})
let sourceDetailScheme = mg.Schema({
  source: String,
  title: String,
  link: String,
  pubDate: Date,
  content: String,
  contentSnippet: String
})
sourceDetailScheme.static('saveDetails', function(data, cb){
  const source = data.feed.link
  let details = data.feed.entries.map(function (obj) {
    return Object.assign(obj, {
      source: source
    })
  })
  console.log(details)
  return this.model('SourceDetail').collection.insert(details, function(err, res){
    if (err) {
      console.log(err)
    } else {
      console.log('success')
    }
  })
})
let SourceDetail = mg.model('SourceDetail', sourceDetailScheme)
let Source = mg.model('Source', sourceScheme)

export {SourceDetail, Source}