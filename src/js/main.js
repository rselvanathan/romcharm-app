var app = angular.module('myApp', ['myApp.config','ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngMap']);

app.controller('viewController', ViewController);
app.controller('mainMenuController', MainMenuController);

app.config(function($routeProvider, $mdThemingProvider, $locationProvider){
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

    $locationProvider.html5Mode(true);

    $mdThemingProvider.theme('blueTheme')
        .primaryPalette('light-blue')
        .accentPalette('cyan')
        .dark() ; 

    $mdThemingProvider.theme('indigoTheme')
        .primaryPalette('indigo')
        .accentPalette('blue')
        .dark();

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