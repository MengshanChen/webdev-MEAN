(function()
{
    angular
        .module("ItemApp")
        .controller('ProductCtrl', ProductCtrl)
    
    function ProductCtrl($scope, ProductService)
    {
        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;
        $scope.reset = reset;
        
        function init() {
            console.log("product form");
            ProductService
                .findAllProductsForUser($scope.currentUser._id)
                .then(handleSuccess, handleError);
        }
        init();

        function add(product)
        {
            console.log("create product in product.controller")
            ProductService
                .createProductForUser($scope.currentUser._id,product)
                .then(handleSuccess, handleError);
        }
        
        function update(product)
        {
            console.log("update product in product.controller")
            ProductService
                .updateProduct(product._id, product)
                .then(handleSuccess, handleError);
        }

        function remove(product)
        {
            console.log("delete product in product.controller")
            ProductService
                .deleteProduct(product._id)
                .then(handleSuccess, handleError);

            ProductService
                .findAllProductsForUser($scope.currentUser._id)
                .then(handleSuccess, handleError);

        }
        
        function select(product)
        {
            $scope.product = {
                _id: product._id,
                userId: product.userId,
                productname: product.productname,
                quantity: product.quantity
            };
        }

        function reset()
        {
            $scope.product = angular.copy($scope.master);
        }

        function handleSuccess(response) {
            $scope.products = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }

    }
})();

