//create api being called by app/services/item.service.server.js
(function(){
    angular
        .module("ItemApp")
        .factory("ItemService", ItemService);

    function ItemService($http) {
        var api = {
            findAllItems: findAllItems,
            deleteItem: deleteItem,
            updateItem: updateItem,
            createItem: createItem
        };
        return api;

        function createItem(item) {
            return $http.post('/api/item', item);
        }

        function updateItem(itemId, item) {
            return $http.put('/api/item/'+itemId, item);
        }

        function deleteItem(itemId) {
            return $http.delete('/api/item/'+itemId);
        }

        function findAllItems() {
            return $http.get("/api/item");
        }
    }
})();
