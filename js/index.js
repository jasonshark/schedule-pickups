var App = angular.module( 'schedulePickups', ['ui.router', 'ui.bootstrap', 'firebase'] );

App.config(function( $stateProvider, $urlRouterProvider ){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html',
    controller: 'HomeCtrl'
  })

  $stateProvider
  .state('menus', {
    url: '/menus/:restaurantId',
    templateUrl: '/js/views/menu.html',
    controller: 'MenuCtrl'
  })

  $stateProvider
  .state('inputMenu', {
    url: '/input_menu',
    templateUrl: '/js/views/input_menu.html',
    controller: 'InputMenuCtrl'
  })

  $stateProvider
  .state('pos', {
    url: '/pos',
    templateUrl: '/js/views/pos.html',
    controller: 'PosCtrl'
  })

});

App.controller('HomeCtrl', function( $scope, $rootScope, $sce, $firebaseArray ) {

});

App.controller('MenuCtrl', function( $scope, $stateParams, $firebaseArray, restaurantService, $log ){
  $scope.data = restaurantService.getRestaurant($stateParams.restaurantId);
  
  $scope.currentOrder = {
    pickupTime: null,
    menuItems: {},
    pastDue: false
  };

  for(menuItemId in $scope.data.menuItems) {
    $scope.currentOrder.menuItems[menuItemId] = 0;
  }

  $scope.timepickerVal = new Date();
  $scope.hstep = 1;
  $scope.mstep = 5;

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };

  var customer = '123'
    , restaurantId = $stateParams.restaurantId
    , fbRef = new Firebase("https://fiery-inferno-5692.firebaseio.com/orders/");
  $scope.orders = $firebaseArray(fbRef);
  
  $scope.createOrder = function() {
    console.log($scope.orders);
    $scope.currentOrder.pickupTime = $scope.timepickerVal.getTime();
    $scope.orders.$add($scope.currentOrder);
  }

   
});

// App.controller('InputMenuCtrl', function( $scope, $rootScope, $sce, $firebaseObject ) {

//   var ref = new Firebase("https://fiery-inferno-5692.firebaseIO.com");
//   $scope.menuItems = $firebaseArray(ref);

// });

// App.controller('PosCtrl', function( $scope, $rootScope, $sce, $firebaseObject ) {

//   var ref = new Firebase("https://fiery-inferno-5692.firebaseIO.com");
//   $scope.menuItems = $firebaseArray(ref);

// });