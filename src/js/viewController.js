var app = angular.module('myApp', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl : 'src/pages/home.html',
            controller : HomeController
        })
        .when('/register', {
            templateUrl : 'src/pages/register.html',
            controller : RegisterController
        })
});