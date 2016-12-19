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
        })
        .when('/thankyou', {
            templateUrl: 'pages/thankyou.html',
            controller : ThankYouController
        });

    $mdThemingProvider.theme('blueTheme')
        .primaryPalette('light-blue')
        .accentPalette('cyan')
        .dark() ; 

    $mdThemingProvider.theme('indigoTheme')
        .primaryPalette('indigo')
        .accentPalette('blue')
        .dark() ;      
});

app.service("globalValues", function() {
    var globalValues = this;
    globalValues.rsvpName = "";
    globalValues.family = {};
});