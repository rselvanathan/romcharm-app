var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl : 'src/pages/home.html',
            controller : 'homeController'
        })
        .when('/register', {
            templateUrl : 'src/pages/register.html'
        })
});

app.controller('homeController', HomeController);