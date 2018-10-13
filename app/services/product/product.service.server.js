var mongoose = require("mongoose");

module.exports = function(app) {

    var productModel = require("../../models/product/product.model.server.js")();
    app.get   ('/api/user/:userId/product',     findProductsByUserId);
    app.get   ('/api/product/:id',     findProductById);
    app.get   ('/api/product',     findAllProducts);
    app.post  ('/api/user/:userId/product',     createProduct);
    app.put   ('/api/product/:id', updateProduct);
    app.delete('/api/product/:id', deleteProduct);

    function findAllProducts(req, res) {
        productModel
            .findAllProducts()
            .then(
                function (products) {
                    res.json(products);
                },
                function () {
                    res.status(400).send(err);
                }
            );
     }

    function findProductsByUserId(req,res){
        console.log("findProductsByUserId in product.service.server");
        var userId = req.params.userId;
        productModel
            .findProductsByUserId(userId)
            .then(
                function(products){
                    res.json(products);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findProductById(req,res){
        console.log("findProductById in product.service.server");
        var productId = req.params.id;
        productModel
            .findProductById(productId)
            .then(
                function(products){
                    res.json(products);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteProduct(req, res) {
        console.log("deleteProduct in product.service.server");
        var productId = req.params.id;
        productModel
            .removeProduct(productId)
            .then(
                function(products){
                    res.json(products);
                },
                function(err){
                    res.status(400).send(err);
                }

            );
    }

    function updateProduct(req, res) {
        console.log("updateProduct in product.service.server");
        var productId = req.params.id;
        var newProduct = req.body;
        var userId = newProduct.userId;

        productModel
            .updateProduct(productId, newProduct)
            .then(
                function(product){
                    return productModel.findProductsByUserId(userId);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(products){
                    res.json(products);
                },
                function(err){
                    res.status(400).send(err);
                }

            );
    }

    function createProduct(req, res) {
        console.log("createProduct in product.service.server");
        var userId = req.params.userId;
        var newProduct = req.body;
        productModel
            .createProduct(userId,newProduct)
            .then(
                function(product){
                    return productModel.findProductsByUserId(userId);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(products){
                    res.json(products);
                },
                function(err){
                    res.status(400).send(err);
                }

            );
    }
}