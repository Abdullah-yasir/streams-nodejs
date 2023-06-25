const { createReadStream } = require('fs')
const path = require('path')

const readStream = createReadStream(path.join(__dirname, './../video.mp4'))

readStream.on('data', chunk => {
    console.log(chunk, chunk.length, chunk.byteLength)
})

readStream.on('end', () => console.log('read stream ended'))

readStream.on('error', err => console.log(err))
