var app = angular.module('myApp', ['myApp.config','ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngMap']);

app.controller('viewController', ViewController);
app.controller('mainMenuController', MainMenuController);

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
        .when('/searchUser', {
            templateUrl : 'pages/searchUser.html',
            controller : SearchUserController
        })
        .when('/thankyou', {
            templateUrl: 'pages/thankyou.html',
            controller : ThankYouController
        })
        .when('/info', {
            templateUrl: 'pages/info.html',
            controller : InfoController
        });

    $mdThemingProvider.theme('blueTheme')
        .primaryPalette('light-blue')
        .accentPalette('cyan')
        .dark() ; 

    $mdThemingProvider.theme('indigoTheme')
        .primaryPalette('indigo')
        .accentPalette('blue');

    $mdThemingProvider.theme('homeButton')
        .primaryPalette('deep-purple')
        .accentPalette('deep-purple')
        .dark();
});

app.service("globalValues", function() {
    var globalValues = this;
    globalValues.rsvpName = "";
    globalValues.family = {};
    globalValues.email = "";
    globalValues.authenticated = false;

    globalValues.apiToken = "";
    globalValues.apiUserName="romcharm_app";
});