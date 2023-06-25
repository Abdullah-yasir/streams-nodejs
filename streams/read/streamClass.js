const { Readable } = require('stream')

const arr = [
    'No ice for drinks',
    'sdfsdfsd sad fsjdfklsjdlskj df',
    'slkj flije3094 4 rjslefj ld 0934 u jfkl lskj f349 ',
    "dj flsj ldkfj2093  lkdsjf-s0df02 fsdf f][s 'sd",
    'l ksjd fj02q3 -02o3 0-3ro jfslf =2-[pflf ,',
]

class StreamFromArray extends Readable {
    constructor(array) {
        super()
        this.array = array
        this.index = 0
    }

    _read() {
        if (this.index <= this.array.length) {
            const chunk = this.array[this.index]
            this.push(chunk)
            this.index += 1
        } else {
            this.push(null)
        }
    }
}

const arrStream = new StreamFromArray(arr)

arrStream.on('data', chunk => {
    console.log(chunk.length)
    console.log(chunk)
    console.log(chunk.toString('utf-8'))
})

arrStream.on('end', () => console.log('stream ended'))
