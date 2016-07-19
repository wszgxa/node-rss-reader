const http = require('http')
const fs = require('fs')
var cg = require('./config.js')

// const url = cg.baseUrl + 'aaaca.com'
http.get(cg.baseUrl, (res) => {
  let a = ''
  res.on('data', (chunk) => {
    a += chunk
    console.log(`BODY: ${chunk}`);
  })
  res.on('end', () => {
    fs.writeFile('./nihao.txt', a)
  })
  res.resume();
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});