

var app = angular.module('myApp', []);

app.controller('testController', function($scope) {
    $scope.value = "";
    $scope.formData = {rsvpName : ""};

    $scope.buttonClick = function() {
        $scope.value = $scope.formData.rsvpName;
    }
});