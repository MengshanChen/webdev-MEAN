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
        $scope.reset = reset;

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

        function reset()
        {
            $scope.item = angular.copy($scope.master);
        }

        function handleSuccess(response) {
            var result = response.data;
            //var total = 0;
            result.forEach((item) => {
                if(allDays(item) <= 0){
                    item['dayDifference'] = "Expired";
                    //item.isExpire = true;
                    //total = total + 1;
                }else{
                    item['dayDifference'] = allDays(item);
                }
            })
            $scope.items = result;
        }

        function handleError(error) {
            $scope.error = error;
        }

        function allDays(item)
        {
            var currentTime = new Date();
            var expireTime = new Date(item.deadline);
            var interval = expireTime.getTime() - currentTime.getTime();
            var diff = Math.round(interval/24/60/60/1000);
            return diff;
        }
    }
})();

