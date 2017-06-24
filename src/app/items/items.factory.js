angular
  .module('bulkWhizApp').factory('itemsService',function($http){
    return{
      getItems: function (apiUrl){
        return $http.get(apiUrl);
      }

    }
  })
