const { createReadStream, createWriteStream } = require('fs')
const path = require('path')

const readStream = createReadStream(path.join(__dirname, './../video.mp4'))
const writeStream = createWriteStream(path.join(__dirname, './video-copy.mp4'))

readStream.on('data', chunk => {
    const result = writeStream.write(chunk)

    if (!result) {
        console.log('backpressure')
        readStream.pause()
    }
})

readStream.on('end', () => {
    writeStream.end()
})

readStream.on('error', err => console.log(err))

writeStream.on('close', () => {
    console.log('file copied')
})

writeStream.on('drain', () => {
    console.log('drained')
    readStream.resume()
})
