angular
  .module('bulkWhizApp')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('items', {
      url: '/',
      templateUrl: 'app/items/items.html',
      controller: 'items'
    });
}

// templateUrl: 'items/items.controller.js',
