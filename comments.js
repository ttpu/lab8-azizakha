// Create web server
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

// Create server
http.createServer(function(req, res){
    var pathname = url.parse(req.url).pathname;
    var ext = path.extname(pathname);
    var type = 'text/html';

    switch(ext){
        case '.js':
            type = 'text/javascript';
            break;
        case '.css':
            type = 'text/css';
            break;
    }

    fs.readFile(__dirname + pathname, function(err, data){
        if(err){
            res.writeHead(500);
            return res.end('Error loading ' + pathname);
        }

        res.writeHead(200, {'Content-Type': type});
        res.end(data);
    });
}).listen(3000);

console.log('Server running at http://localhost:3000/');