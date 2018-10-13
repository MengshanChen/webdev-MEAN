//create api being called by app/services/product.service.server.js
(function(){
    angular
        .module("ItemApp")
        .factory("ProductService", ProductService);

    function ProductService($http) {
        var api = {
            findAllProductsForUser: findAllProductsForUser,
            deleteProduct: deleteProduct,
            updateProduct: updateProduct,
            createProductForUser: createProductForUser
        };
        return api;

        function createProductForUser(userId,product) {
            return $http.post("/api/user/" + userId + "/product",product);
        }

        function findAllProductsForUser(userId) {
            return $http.get("/api/user/" + userId +"/product");
        }

        function updateProduct(productId, product) {
            return $http.put('/api/product/'+productId, product);
        }

        function deleteProduct(productId) {
            return $http.delete('/api/product/'+productId);
        }
    }
})();
