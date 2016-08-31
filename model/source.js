import db from './db.js'

let sourceScheme = db.Schema({
  title: String,
  link: String,
  feedUrl: {type: String, unique: true},
  update: {type: Date, default: Date.now}
})
let sourceDetailScheme = db.Schema({
  source: String,
  title: String,
  link: String,
  pubDate: Date,
  content: String,
  contentSnippet: String,
  readed: {type:Boolean, default: false},
  star: {type: Boolean, default: false}
})
sourceDetailScheme.statics.saveDetails = function(data, cb){
  const source = data.feed.link
  let details = data.feed.entries.map(function (obj) {
    return Object.assign(obj, {
      source: source
    })
  })
  let saveData = new Promise((resolve, reject) => {
    this.model('SourceDetail').collection.insert(details, function(err, res){
      err ? reject(err) : resolve(res)
    })
  })
  return saveData
}

let SourceDetail = db.model('SourceDetail', sourceDetailScheme)
let Source = db.model('Source', sourceScheme)

export {SourceDetail, Source}