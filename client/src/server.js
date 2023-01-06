var http = require("http");
var fs = require("fs");
var port = 1234;

http.createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url == "/") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        fs.readFile("./index.html", function(err, data) {
            res.end(data);
        });
    } else if (req.url.endsWith(".js")) {
        res.writeHead(200, {
            "Content-Type": "application/javascript"
        });
        fs.readFile("." + req.url, function(err, data) {
            res.end(data);
        });
    } else if (req.url.endsWith(".css")) {
        res.writeHead(200, {
            "Content-Type": "text/css"
        });
        fs.readFile("." + req.url, function(err, data) {
            res.end(data);
        });
    } else if (req.url.endsWith(".png")) {
        res.writeHead(200, {
            "Content-Type": "image/png"
        });
        fs.readFile("." + req.url, function(err, data) {
            res.end(data);
        });
    } else if (req.url.endsWith(".json")) {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        fs.readFile("." + req.url, function(err, data) {
            res.end(data);
        });
    } else if (req.url.endsWith(".ttf")) {
        res.writeHead(200, {
            "Content-Type": "font/ttf"
        });
        fs.readFile("." + req.url, function(err, data) {
            res.end(data);
        });
    }
}).listen(port);

console.log("Server started on port " + port);
