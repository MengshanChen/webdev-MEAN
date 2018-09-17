var mongoose         = require("mongoose");

module.exports = function(app) {

    var itemModel = require("../../models/item/item.model.server.js")();
    app.get   ('/api/user/:userId/item',     findItemsByUserId);
    app.get   ('/api/item/:id',     findItemById);
    app.get   ('/api/item',     findAllItems);
    app.post  ('/api/user/:userId/item',     createItem);
    app.put   ('/api/item/:id', updateItem);
    app.delete('/api/item/:id', deleteItem);

    function findAllItems(req, res) {
        itemModel
            .findAllItems()
            .then(
                function (items) {
                    res.json(items);
                },
                function () {
                    res.status(400).send(err);
                }
            );
     }

    function findItemsByUserId(req,res){
        console.log("findItemsByUserId in item.service.server");
        var userId = req.params.userId;
        itemModel
            .findItemsByUserId(userId)
            .then(
                function(items){
                    res.json(items);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findItemById(req,res){
        console.log("findItemById in item.service.server");
        var itemId = req.params.id;
        itemModel
            .findItemById(itemId)
            .then(
                function(items){
                    res.json(items);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteItem(req, res) {
        console.log("deleteItem in item.service.server");
        var itemId = req.params.id;
        itemModel
            .removeItem(itemId)
            .then(
                function(items){
                    res.json(items);
                },
                function(err){
                    res.status(400).send(err);
                }

            );
    }

    function updateItem(req, res) {
        console.log("updateItem in item.service.server");
        var itemId = req.params.id;
        var newItem = req.body;
        var userId = newItem.userId;

        itemModel
            .updateItem(itemId, newItem)
            .then(
                function(item){
                    return itemModel.findItemsByUserId(userId);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(items){
                    res.json(items);
                },
                function(err){
                    res.status(400).send(err);
                }

            );
    }

    function createItem(req, res) {
        console.log("createItem in item.service.server");
        var userId = req.params.userId;
        var newItem = req.body;
        itemModel
            .createItem(userId,newItem)
            .then(
                function(item){
                    return itemModel.findItemsByUserId(userId);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(items){
                    res.json(items);
                },
                function(err){
                    res.status(400).send(err);
                }

            );
    }
}