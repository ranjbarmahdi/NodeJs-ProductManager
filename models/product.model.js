const { resolve } = require("path");
const products = require("./../data/products.json");
const fs = require("fs");
const { rejects } = require("assert");


// ===============================<< find >>===============================
async function find() {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}


// ===============================<< findById >>===============================
async function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find(value => value.id == id);
        if (!product) reject({ message: "Product Not Found" });
        else resolve(product);
    })
}


// ===============================<< create >>===============================
async function create(product) {
    return new Promise((resolve, reject) => {
        products.push(product);
        fs.writeFile(`${process.cwd()}/data/products.json`, JSON.stringify(products), (err) => {
            if (err) reject(err);
            else resolve({ message: "Product Created Successfully" });
        })
    })
}


// ===============================<< Update >>===============================
async function update(productIndex, newProduct) {
    return new Promise((resolve, reject) => {
        products[productIndex] = newProduct;
        fs.writeFile(`${process.cwd()}/data/products.json`, JSON.stringify(products), (err) => {
            if (err) reject({ message: "Error in updationg product" });
            else resolve({ message: "Product Updated Successfully" });
        })
    })
}


// ===============================<< Delete >>===============================
async function remove(id) {
    return new Promise((resolve, reject) => {
        const newProductsList = products.filter(value => value.id != id);
        fs.writeFile(`${process.cwd()}/data/products.json`, JSON.stringify(newProductsList), (err) => {
            if (err) reject({ message: "Error in deleting product" });
            else resolve({ message: "Product Deleted Successfully" });
        })
    })
}


// ===============================<< Export >>===============================
const ProductModel = {
    find,
    findById,
    create,
    update,
    remove
}

module.exports = ProductModel;