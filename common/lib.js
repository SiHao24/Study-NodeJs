console.log("test-----")

exports.hello = 'hello'
exports.add = function (a, b) {
    return a + b
}

exports.deekbang = { hello: 'deekbang' }

setTimeout(() => {
    console.log('exports: ', exports)
}, 2000)

module.exports = function minus(a, b) {
    return a - b
}