app.controller('HeatCompareController', function($scope, $http) {

$scope.lStart     = {'value' : 0};
$scope.lFinish    = {'value' : 0};
$scope.rStart     = {'value' : 0};
$scope.rFinish    = {'value' : 0};

$scope.$watch('selectedOption.find', function(value) {
          $scope.selectedOption     = value;
            console.log(value);
          //console.log($scope.selectedCensusFile);
//          if($scope.selectedOption != undefined){
//          fileObject                 = "";
//          $http({
//            method  : 'POST',
//            url     : '',
//            data    : Object.toParams(fileObject),
//            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
//          }).success(function(result){
//
//          });
//        }
    });

    })