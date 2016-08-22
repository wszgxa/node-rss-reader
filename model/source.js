import mg from './db.js'
let sourceKindScheme = mg.Schema({
  kind: { type: [String], index: true }
})

let sourceScheme = mg.Schema({
  kindId: Number,
  containerId: String,
  name: String,
  logo: String
})

let SourceKind = mg.model('SourceKind', sourceKindScheme)
let Source = mg.model('Source', sourceScheme)

exports.SourceKind = SourceKind
exports.Source = Source