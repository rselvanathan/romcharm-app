var app = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate']);

app.config(function($routeProvider, $mdThemingProvider){
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller : HomeController
        })
        .when('/register', {
            templateUrl : 'pages/register.html',
            controller : RegisterController
        })
        .when('/search', {
            templateUrl : 'pages/search.html',
            controller : SearchController
        });

    $mdThemingProvider.theme('blueTheme')
        .primaryPalette('light-blue')
        .accentPalette('cyan')
        .backgroundPalette('indigo')
        .dark() ; 
});

app.service("globalValues", function() {
    var globalValues = this;
    globalValues.rsvpName = "";
});