//create api being called by app/services/item.service.server.js
(function(){
    angular
        .module("ItemApp")
        .factory("ItemService", ItemService);

    function ItemService($http) {
        var api = {
            findAllItemsForUser: findAllItemsForUser,
            deleteItem: deleteItem,
            updateItem: updateItem,
            createItemForUser: createItemForUser
        };
        return api;

        function createItemForUser(userId,item) {
            return $http.post("/api/user/" + userId + "/item",item);
        }

        function findAllItemsForUser(userId) {
            return $http.get("/api/user/" + userId +"/item");
        }

        function updateItem(itemId, item) {
            return $http.put('/api/item/'+itemId, item);
        }

        function deleteItem(itemId) {
            return $http.delete('/api/item/'+itemId);
        }
    }
})();
