/**
 * Created by minudika on 10/4/16.
 */

/*app.controller('queryController',['$scope','$http',function($scope,$http){
    $scope.executeQuery = function() {
        $http.post('summary/executequery').success(function (data) {
            $scope.results = data;
            console.log(data);
        });
    };
}]);*/

app.controller('queryController',['$scope','$http','$timeout',function($scope,$http,$timeout){

    $scope.imagePath = "/resources/images/query-2.png";
    $scope.filteredResults = [];
    $scope.visible = false;
    $scope.currentPage = 1;
    $scope.numPerPage = 50;
    $scope.maxSize = 5;
    $scope.results = [];
    $scope.isCompleted = false;

    $scope.$watch('currentPage + numPerPage', function() {
                 var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                 , end = begin + $scope.numPerPage;
                 $scope.filteredResults = $scope.results.slice(begin, end);
               });

//    $element.find('input').on('keydown', function(ev) {
//                 ev.stopPropagation();
//             });



    $http({
                            method: 'POST',
                            url: 'getColumnNames',
                             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                             }).success(function(data){
                                  $scope.labels = data;

                  });



    $scope.executeQuery = function() {
        $scope.isLoading = true;
        $scope.visible = true;
        queryObj = {'query': $scope.query}

        /*Object.toparams = function ObjecttoParams(obj) {
            var p = [];
            for (var key in obj) {
                p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
        };*/

        $http({
            method: 'POST',
            url: 'summary/executequery',
            data: Object.toParams(queryObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            $scope.results = data;
             $scope.isCompleted = true;
             $scope.isLoading = false;
             $scope.numPages = function () {
                                    return Math.ceil($scope.results.length / $scope.numPerPage);
                                  };

        });



    };
}]);

