const https = require('https')

https.get('https://checkapi.aliyun.com/check/checkdomain?domain=attc.com&token=check-web-hichina-com%3Airasrbrdyvuk93rcskx2u8hzhrcf8uy3&_=1468824036052', (res) => {
  console.log(`Got response: ${res.statusCode}`);
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  })
  res.on('end', () => {
    console.log('end');
  })
  res.resume();
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});