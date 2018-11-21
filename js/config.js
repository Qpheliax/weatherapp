var app = angular.module('weatherApp', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when("/home", {
      templateUrl: "pages/home.html"
    })
    .when("/local", {
      templateUrl: "pages/local.html",
      controller: "localCtrl"

    })
    .when("/search", {
      templateUrl: "pages/search.html",
      controller: "searchCtrl"

    }).otherwise({
      redirectTo: '/home'
    });
}]);

app.controller('dateCtrl',
  function($scope, $http) {
    $scope.date = new Date();
  });

app.controller('localCtrl',
  function($scope, $http) {

    $scope.date = new Date();

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(function(position) {

        thislat = position.coords.latitude;
        thislong = position.coords.longitude;

        console.log(thislat);
        console.log(thislong);

        var x = thislat;
        var y = thislong;

        var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + x + "&lon=" + y + "&appid=006599659fd11180a6c1d1f5df4b012a";

        $http.get(weatherUrl).then(function(response) {

          $scope.json = response.data;
          console.log("Success");

          $scope.temp = response.data.main.temp - 273;

        });
      });
    }
  });

app.controller('searchCtrl',

  function($scope, $http) {

    $scope.date = new Date();

    $scope.assetName = '';

    $scope.searchWeather = function() {

      var searchTerm = $scope.assetName;
      var searchUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + '&APPID=73136fa514890c15bc4534e7b8a1c0c4';

      $http.get(searchUrl)
        .then(function(response) {

          $scope.json = response.data;

          console.log("Success");

          $scope.temp = response.data.main.temp - 273;

        });
    };

  });
