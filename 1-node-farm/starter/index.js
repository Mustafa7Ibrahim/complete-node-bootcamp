const http = require('http');
const fs = require('fs');
const url = require('url');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const cartTemplate = fs.readFileSync(`${__dirname}/templates/template-cart.html`, 'utf-8');
const overviewTemplate = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const productTemplate = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    /// Overview Page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const cardsHtml = dataObj.map(el => replaceTemplate(cartTemplate, el)).join('');
        const output = overviewTemplate.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.write(output);
    }

    /// Product Page
    else if (pathname === '/product') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(productTemplate, product);
        res.write(output);
    }

    /// API
    else if (pathname === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(data);
    }

    /// not found page
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>Page Not Found</h1 >');
    }
});

server.listen(3333, '127.0.0.1', () => {
    console.log('Server is running...');
});



