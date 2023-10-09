const ProductModel = require("./../models/product.model")


// ===============================<< getProducts >>===============================
async function getProducts(req, res) {
    const products = await ProductModel.find();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(products));
    res.end();
}


// ===============================<< getProductById >>===============================
async function getProductById(req, res) {
    try {
        const productId = req.url.split("/")[3]
        const result = await ProductModel.findById(productId);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(result));
        res.end();
    }
    catch (err) {
        res.end(JSON.stringify(err));
    }
}


// ===============================<< createProduct >>===============================
async function createProduct(req, res) {
    try {
        let product = "";
        req.on("data", (chunk) => {
            product += chunk.toString();
        });

        req.on("end", async () => {
            let result = await ProductModel.create(JSON.parse(product));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
        });

    }
    catch (err) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify(err));
    }
}


// ===============================<< updateProduct >>===============================
async function updateProduct(req, res) {
    try {
        let product = "";
        const id = req.url.split("/")[3];
        req.on('data', (chunk) => {
            product += chunk.toString();
        })
        req.on('end', async () => {
            product = JSON.parse(product);
            const products = await ProductModel.find();
            const productIndex = products.findIndex(product => product.id == id);
            if (productIndex == -1) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Product Not Found" }));
            }
            else {
                const result = await ProductModel.update(productIndex, product);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(result));
            }
        })
    } catch (err) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify(err));
    }
}


// ===============================<< deleteProduct >>===============================
async function deleteProduct(req, res) {
    try {
        const [, , , id] = req.url.split("/");
        console.log(id);
        const products = await ProductModel.find();
        const productIndex = products.findIndex(product => product.id == id);
        if (productIndex == -1) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product Not Found" }));
        }
        else {
            const result = await ProductModel.remove(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
        }
    } catch (err) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify(err));
    }

}


// ===============================<< Export >>===============================
const ProductController = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

module.exports = ProductController;