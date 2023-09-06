const http = require('http');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h2>Home Page</h2>');
    }
    else if (url === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h2>Home Page</h2>');
    }
    else if (url === '/product') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h2>Product Page</h2>');
    }
    else if (url === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(data);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h2>Page Not Found</h2>');
    }
});

server.listen(3333, '127.0.0.1', () => {
    console.log('Server is running...');
});



