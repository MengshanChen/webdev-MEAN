(function()
{
    angular
        .module("ItemApp")
        .controller('ItemCtrl', ItemCtrl);
    
    function ItemCtrl($scope, ItemService)
    {
        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;

        function init() {
            ItemService
                .findAllItems()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(item)
        {
            ItemService
                .deleteItem(item._id)
                .then(handleSuccess, handleError);
        }
        
        function update(item)
        {
            ItemService
                .updateItem(item._id, item)
                .then(handleSuccess, handleError);
        }

        function add(item)
        {
            ItemService
            .createItem(item)
            .then(handleSuccess, handleError);
        }
        
        function select(item)
        {
            $scope.item = angular.copy(item);
        }

        function handleSuccess(response) {
            $scope.items = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }
    }
})();

