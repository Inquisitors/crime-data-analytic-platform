/**
 * Created by minudika on 11/26/16.
 */
app.controller('fileuploadController', ['$scope','$http','$timeout', '$window', function($scope,$http,$timeout, $window) {
    $scope.path = "./data/census_data/";
    $scope.imagePath = "/resources/images/preprocessor2.png";
    pathObj = {'path' : $scope.path}
    $http({
                method: 'POST',
                url: 'getfilelist',
                data: Object.toParams(pathObj),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(result){
            $scope.files = result;

            });
    $scope.fileName = "";
    $scope.tableName = "";
    $scope.isFileAvailable = false;
    $scope.isPrepCompleted = false;
    $scope.submitFile =  function(){
    if($scope.tableName != ""){
    $scope.fullpath = $scope.path.concat($scope.fileName);
        queryObj = {'tableName':$scope.tableName};
        $scope.isFileAvailable = true;
        $scope.isLoading = true;
        $http({
            method: 'POST',
            url: 'preprocess/getselectedfile',
            data: Object.toParams(queryObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.isLoading = false;
            $scope.isPrepCompleted = true;
        });
        }
    }

    // Function to get the data
    $scope.getData = function(){
        queryObj = {'file': $scope.fileName};
        $http({
            method: 'POST',
            url: 'summary/isdatasetavailable',
            data: Object.toParams(queryObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            console.log(data);
        });
    };

    // Function to replicate setInterval using $timeout service.
    /*$scope.intervalFunction = function(){
        $timeout(function() {
            $scope.getData();
            $scope.intervalFunction();
        }, 1000)
    };*/

    // Kick off the interval
   // $scope.intervalFunction();
}]);
