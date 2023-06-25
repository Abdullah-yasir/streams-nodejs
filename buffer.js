const buff = Buffer.alloc(8)

buff.write('s', 'utf-8')
console.log(buff)

buff.write('st')
console.log(buff)
console.log(buff.toJSON())

const buff2 = Buffer.from('string', 'utf-8')
console.log(buff2.toJSON())

const buff3 = Buffer.from([115, 116, 114, 105, 110, 103], 'hex')
console.log(buff3)

console.log(buff3.toString('utf-8'))
