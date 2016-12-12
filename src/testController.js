

var app = angular.module('myApp', []);

app.controller('testController', function($scope) {
    $scope.value = "";
    $scope.formData = {rsvpName : ""};

    $scope.buttonClick = function() {
        // $http({
        //     url:"http://localhost:8080/families/{$scope.formData.rsvpName}",
        //     method:"GET"
        // }).then(function(response) {
        //     $scope.value = response.data.familyName;
        // });
        $scope.value = $scope.formData.rsvpName;
    }
});