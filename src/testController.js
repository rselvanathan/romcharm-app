

var app = angular.module('myApp', []);

app.controller('testController', function($scope, $http) {
    $scope.value = "";
    $scope.formData = {rsvpName : ""};

    $scope.buttonClick = function() {
        var query = $scope.formData.rsvpName;
        $http({
            url:"http://localhost:8080/families/"+query,
            method:"GET",
        }).then(function(response) {
            console.log(response.data);
            $scope.value = response.data.familyName;
        });
    }
});