const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
    console.log('request: ', request.url)
    response.writeHead(200)
    fs.createReadStream(__dirname + '/index.html').pipe(response)
}).listen(9000)