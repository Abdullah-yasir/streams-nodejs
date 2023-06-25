const { createReadStream, createWriteStream } = require('fs')
const path = require('path')

// const readStream = createReadStream(path.join(__dirname, './video.mp4'))
// const writeStream = createWriteStream(path.join(__dirname, './video-copy.mp4'))

// readStream.pipe(writeStream).on('error', console.error)

const writeStream = createWriteStream(path.join(__dirname, './result.txt'))

process.stdin.pipe(writeStream)
