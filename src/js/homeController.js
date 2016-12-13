
var HomeController = function($scope, $http, $location) {
    $scope.value = "";
    $scope.formData = {rsvpName : ""};

    $scope.buttonClick = function() {
        var query = $scope.formData.rsvpName;
        $http({
            url:"http://localhost:8080/families/"+query,
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