
var SearchController = function($scope, $http, $location, globalValues) {
    $scope.value = "";

    $scope.globalValues = globalValues;

    $scope.buttonClick = function() {
        var rsvpName = $scope.globalValues.rsvpName;
        $http({
            url:"http://localhost:8080/families/"+rsvpName,
            method:"GET",
        }).then(function successCallback(response) {
            console.log(response.data);
            // $scope.value = response.data.familyName;
            $location.path('/register');
        }, function errorCallback(response) {
            if(response.status == 404) {
                $scope.value = "Name not found";
            }
        });
    }
};