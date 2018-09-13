var mongoose      = require("mongoose");

module.exports = function() {

    var ItemSchema = new mongoose.Schema(
        {
            creator: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
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
        getMongooseModel: getMongooseModel
    };
    return api;

    function updateItem(itemId, item) {
        return ItemModel.update({_id: itemId}, {$set: item});
    }

    function removeItem(itemId) {
        return ItemModel.remove({_id: itemId});
    }

    function findAllItems() {
        return ItemModel.find();
    }

    function createItem(item) {
        return ItemModel.create(item);
    }

    function findItemByItemname(itemname) {
        return ItemModel.findOne({itemname: itemname});
    }

    function getMongooseModel() {
        return ItemModel;
    }

    function findItemById(itemId) {
        return ItemModel.findById(itemId);
    }
}