const ProductController = require("./controllers/product.controller.js");

const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
    const apiRoute = "api";
    const productsRoute = `/${apiRoute}/products`;
    const singleProductRoute = /\/api\/products\/[0-9]+/;
    const { url, method } = req;

    if (url == productsRoute && method == "GET") {
        ProductController.getProducts(req, res);
    }
    else if (url.match(singleProductRoute) && method == "GET") {
        ProductController.getProductById(req, res);
    }
    else if (url == productsRoute && method == "POST") {
        ProductController.createProduct(req, res)
    }
    else if (url.match(singleProductRoute) && method == "PUT") {
        ProductController.updateProduct(req, res)
    }
    else if (url.match(singleProductRoute) && method == "DELETE") {
        ProductController.deleteProduct(req, res)
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Route Not Found" }));
        res.end()
    }
})

server.listen(PORT);
console.log(`http://localhost:${PORT}`);