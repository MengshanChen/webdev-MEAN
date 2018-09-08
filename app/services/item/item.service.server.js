var mongoose         = require("mongoose");

module.exports = function(app) {

    var itemModel = require("../../models/item/item.model.server.js")();
    app.post  ('/api/item',     createItem);
    app.get   ('/api/item',     findAllItems);
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

    function deleteItem(req, res) {
        itemModel
                .removeItem(req.params.id)
                .then(
                    function(item){
                        return itemModel.findAllItems();
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

    function updateItem(req, res) {
        var newItem = req.body;

        itemModel
            .updateItem(req.params.id, newItem)
            .then(
                function(item){
                    return itemModel.findAllItems();
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
        var newItem = req.body;
        // first check if a item already exists with the itemname
        itemModel
            .createItem(newItem)
            .then(
                function(item){
                    return itemModel.findAllItems();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(items){
                    res.json(items);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    };
}