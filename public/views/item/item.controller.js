(function()
{
    angular
        .module("ItemApp")
        .controller('ItemCtrl', ItemCtrl)
        .directive('stringToDate',function(){
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                  ngModel.$parsers.push(function(value) {
                    return '' + value;
                  });
                  ngModel.$formatters.push(function(value) {
                    return new Date(value);
                  });
                }
              };
        });
    
    function ItemCtrl($scope, ItemService)
    {
        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;
        $scope.reset = reset;
        $scope.expired = 0;
        

        function init() {
            console.log("item form");
            ItemService
                .findAllItemsForUser($scope.currentUser._id)
                .then(handleSuccess, handleError);
        }
        init();

        function add(item)
        {
            console.log("create item in item.controller")
            ItemService
                .createItemForUser($scope.currentUser._id,item)
                .then(handleSuccess, handleError);
        }
        
        function update(item)
        {
            console.log("update item in item.controller")
            ItemService
                .updateItem(item._id, item)
                .then(handleSuccess, handleError);
        }

        function remove(item)
        {
            console.log("delete item in item.controller")
            ItemService
                .deleteItem(item._id)
                .then(handleSuccess, handleError);
        }
        
        function select(item)
        {
            $scope.item = {
                _id: item._id,
                userId: item.userId,
                itemname: item.itemname,
                category: item.category,
                brand: item.brand,
                boughtAt: item.boughtAt,
                deadline: item.deadline,
                quantity: item.quantity
            };
            //$scope.item = angular.copy(item);
        }

        function reset()
        {
            $scope.item = angular.copy($scope.master);
        }

        function handleSuccess(response) {
            console.log("calculate date in item.controller")
            var result = response.data;
            $scope.expired = 0;
            for (var i = 0; i < result.length; i++){
                if(allDays(result[i]) <= 0){
                    result[i]['dayDifference'] = "Expired";
                    $scope.expired++;
                }else{
                    result[i]['dayDifference'] = allDays(result[i]);
                }
            }
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

