var mongoose      = require("mongoose");
var q = require("q");

module.exports = function() {

    var ProductSchema = new mongoose.Schema(
        {
            userId: String,
            productname: {
                type: String,
                require: true
            },
            quantity: Number
        }, {
            collection: "product",
            timestamps: true // create 'createdAt' and 'updatedAt' timestamps
        });

    var ProductModel = mongoose.model('ProductModel', ProductSchema);

    var api = {
        findProductByProductname: findProductByProductname,
        findProductById: findProductById,
        findAllProducts: findAllProducts,
        createProduct: createProduct,
        updateProduct: updateProduct,
        removeProduct: removeProduct,
        getMongooseModel: getMongooseModel,
        findProductsByUserId: findProductsByUserId
    };
    return api;

    function createProduct(userId,product) {
        console.log("createProduct in product.model.server");
        var product = new ProductModel({
            userId:userId,
            productname: product.productname,
            quantity: product.quantity
        });
        var deferred = q.defer();
        product.save(function (err,doc) {
            if(err) {
                deferred.reject(err)
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllProducts() {
        console.log("findAllProducts in product.model.server");
        var deferred = q.defer();
        ProductModel.find(function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findProductById(productId) {
        console.log("findProductById in product.model.server");
        return ProductModel.findById({_id:productId});
    }

    function updateProduct(productId, product) {
        console.log("updateProduct in product.model.server");
        var deferred = q.defer();
        ProductModel.findById(productId,function(err,doc){
            doc.productname = product.productname,
            doc.quantity = product.quantity
            doc.save(function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            })
        });
        return deferred.promise;
    }

    function removeProduct(productId) {
        console.log("removeProduct in product.model.server");
        return ProductModel.remove({_id: productId});
    }

    function findProductByProductname(productname) {
        console.log("findProductByProductname in product.model.server");
        return ProductModel.findOne({productname: productname});
    }

    function getMongooseModel() {
        return ProductModel;
    }

    function findProductsByUserId(userId) {
        console.log("findProductsByUserId in product.model.server");
        var deferred = q.defer();
        ProductModel.find({userId: {$in:userId}}, function(err, product){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(product);
            }
        })
        return deferred.promise;
    }
}