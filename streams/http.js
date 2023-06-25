const { stat, createReadStream, createWriteStream, rmSync } = require('fs')
const { createServer } = require('http')
const path = require('path')
const { promisify } = require('util')
const multiparty = require('multiparty')

const fileStates = promisify(stat)
const filepath = path.join(__dirname, 'video.mp4')

// read stream server
const readServer = createServer(async (req, res) => {
    const { size } = await fileStates(filepath)

    const range = req.headers.range // without range you can't manually seek the video in browser
    if (range) {
        let [start, end] = range.replace(/bytes=/, '').split('-')

        start = parseInt(start, 10)
        end = end ? parseInt(end, 10) : size - 1

        res.writeHead(200, {
            'Content-Range': `bytes ${start}-${end}/${size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': start - end + 1,
            'Content-Type': 'video/mp4',
        })

        createReadStream(filepath, { start, end }).pipe(res)
    } else {
        res.writeHead(200, {
            'Content-Length': size,
            'Content-Type': 'video/mp4',
        })

        createReadStream(filepath).pipe(res)
    }
})
readServer.listen(8080, () =>
    console.log('readServer is listening on port 8080')
)

// write stream server
const writeServer = createServer(async (req, res) => {
    // handle form submition
    // 1-
    // if (req.method === 'POST') {
    //     req.pipe(res)
    //     req.pipe(process.stdout)
    //     req.pipe(createWriteStream('./uploaded.file'))
    //     return
    // }
    //2-
    if (req.method === 'POST') {
        let form = new multiparty.Form()
        form.on('part', part => {
            part.pipe(createWriteStream(`./${part.filename}`)).on(
                'close',
                () => {
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(`<h1>File Uploaded: ${part.filename}</h1>`)
                }
            )
        })
        form.parse(req)
        return
    }

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(`
        <form enctype="multipart/form-data" method="POST" action="/">
            <input type="file" name="upload-file">
            <button>Upload File</button>
        </form>
    `)
})

writeServer.listen(8081, () =>
    console.log('writeServer is listening on port 8081')
)
