import mongoose from 'mongoose'
import { dbUrl } from '../config.js'

mongoose.Promise = global.Promise
mongoose.connect(dbUrl)
module.exports = mongoose
