import AWS from 'aws-sdk'

AWS.config.update({ accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_KEY, region: process.env.REGION })

const s3 = new AWS.S3()

const params = {
  Bucket: 'audio-books-bucket',
  Delimiter: '/',
  Prefix: ''
}

s3.listObjects(params, function (err, data) {
  if (err) throw err
  console.log(data)
})
