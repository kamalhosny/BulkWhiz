angular
  .module('bulkWhizApp')
  .controller('items', function($scope, $http, itemsService) {

    // initializing variables:

    $scope.shoppingCart = [];
    $scope.routerFilters = [];
    $scope.filterFilters = [];
    $scope.loading = false;
    $scope.addButton = {};


    $scope.submitApiUrl = function(apiUrl) {
      $scope.loading=true;
      itemsService.getItems(apiUrl)
        .then(
          function(success) {
            console.log(success);
            $scope.loading = false;
            $scope.metadata = success.data.metadata;
            $scope.items = success.data.items;
            $scope.groupAttr = $scope.items[0].sub_category_metadata.cluster;
            $scope.routerAttr = $scope.items[0].sub_category_metadata.router;
            $scope.filterAttr = $scope.items[0].sub_category_metadata.filter;
            for (let i = 0; i < $scope.items.length; i++) {

              if (!$scope.routerFilters.includes($scope.items[i].properties[$scope.routerAttr]))
                $scope.routerFilters.push($scope.items[i].properties[$scope.routerAttr])

              if (!$scope.filterFilters.includes($scope.items[i].properties[$scope.filterAttr]))
                $scope.filterFilters.push($scope.items[i].properties[$scope.filterAttr])
            }
          },
          function(error) {
            $scope.loading = false;
            console.log(error);
          }
        )
    }

    $scope.filterFilter = function(item){
      if($scope.filterFilterVal && $scope.filterFilterVal!=='all'){
        return item.properties[$scope.filterAttr] === $scope.filterFilterVal
      }else{
        return item
      }
    }

    $scope.routerFilter = function(item){
      if($scope.routerFilterVal && $scope.routerFilterVal!=='all'){
        return item.properties[$scope.routerAttr] === $scope.routerFilterVal
      }else{
        return item
      }
    }

    // $scope.groupCriteria = function(item){
    //   return item.properties[$scope.groupAttr] ====
    // }

    $scope.routerFilterValue = function(filter){
      $scope.routerFilterVal=filter
    }

    $scope.filterFilterValue = function(filter){
      $scope.filterFilterVal=filter
    }
    $scope.addToCart = function(item){
      if(!$scope.shoppingCart.includes(item)){
        $scope.shoppingCart.push(item);
        // $scope.addButton[item.id] = false;
      }
    }
    $scope.removeFromCart = function(index){
      var i = $scope.shoppingCart.findIndex(function(item) {
        return index === item.id;
      });
      $scope.shoppingCart.splice(i,1);
      // $scope.addButton[item.id] = true;
    }

  });
