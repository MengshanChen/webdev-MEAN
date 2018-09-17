var mongoose      = require("mongoose");
var q = require("q");

module.exports = function() {

    var ItemSchema = new mongoose.Schema(
        {
            userId: String,
            itemname: {
                type: String,
                require: true
            },
            category: String,
            brand: String,
            boughtAt: {
                 type: Date,
                 default: Date.now
            },
            deadline: {
                type: Date,
                default: Date.now
            },
            quantity: {
                type: Number,
                min: [1, 'Quantity can not be less then 1.']
            }
        }, {
            collection: "item",
            timestamps: true // create 'createdAt' and 'updatedAt' timestamps
        });

    var ItemModel = mongoose.model('ItemModel', ItemSchema);

    var api = {
        findItemByItemname: findItemByItemname,
        findItemById: findItemById,
        findAllItems: findAllItems,
        createItem: createItem,
        removeItem: removeItem,
        updateItem: updateItem,
        getMongooseModel: getMongooseModel,
        findItemsByUserId: findItemsByUserId
    };
    return api;

    function createItem(userId,item) {
        console.log("createItem in item.model.server");
        var item = new ItemModel({
            userId:userId,
            itemname: item.itemname,
            category: item.category,
            brand: item.brand,
            boughtAt: item.boughtAt,
            deadline: item.deadline,
            quantity: item.quantity
        });
        var deferred = q.defer();
        item.save(function (err,doc) {
            if(err) {
                deferred.reject(err)
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllItems() {
        console.log("findAllItems in item.model.server");
        var deferred = q.defer();
        ItemModel.find(function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findItemById(itemId) {
        console.log("findItemById in item.model.server");
        return ItemModel.findById({_id:itemId});
    }

    function updateItem(itemId, item) {
        console.log("updateItem in item.model.server");
        var deferred = q.defer();
        ItemModel.findById(itemId,function(err,doc){
            doc.itemname = item.itemname,
            doc.category = item.category,
            doc.brand = item.brand,
            doc.boughtAt = item.boughtAt,
            doc.deadline = item.deadline,
            doc.quantity = item.quantity
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

    function removeItem(itemId) {
        console.log("removeItem in item.model.server");
        return ItemModel.remove({_id: itemId});
    }

    function findItemByItemname(itemname) {
        console.log("findItemByItemname in item.model.server");
        return ItemModel.findOne({itemname: itemname});
    }

    function getMongooseModel() {
        return ItemModel;
    }

    function findItemsByUserId(userId) {
        console.log("findItemsByUserId in item.model.server");
        var deferred = q.defer();
        ItemModel.find({userId: {$in:userId}}, function(err, item){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(item);
            }
        })
        return deferred.promise;
    }
}