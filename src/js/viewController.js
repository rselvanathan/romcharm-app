var app = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate']);

app.config(function($routeProvider, $mdThemingProvider){
    $routeProvider
        .when('/', {
            templateUrl : 'src/pages/home.html',
            controller : HomeController
        })
        .when('/register', {
            templateUrl : 'src/pages/register.html',
            controller : RegisterController
        })
        .when('/search', {
            templateUrl : 'src/pages/search.html',
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