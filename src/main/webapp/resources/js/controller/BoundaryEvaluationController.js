app.controller('BoundaryEvaluationController',['$scope','$http','$mdDialog',function($scope,$http,$mdDialog){

$scope.options      = {};
$scope.dataDetails  = [];
$scope.options2     = {};
$scope.dataDetails2 = [];
$scope.options3     = {};
$scope.data3        = [];
$scope.options4     = {};
$scope.data4        = [];
$scope.description  = "";
$scope.testValue    = "";


        $http({
                          method: 'POST',
                          url: '/prescription/getHistogram_clusterPopulation',
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                      }).success(function(data){
                          $scope.res1 = JSON.parse(JSON.stringify(data));
                          coordinates_boundaryPopulation = $scope.res1;
                          $scope.options = getChartOptions_boundaryEval("Police District","Population");
                          $scope.dataDetails = getBoundaryChartData();

                          //console.log("update clicked");
                      });


         $http({
                                   method: 'POST',
                                   url: '/prescription/getBoundaryEvalCompactness',
                                   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                               }).success(function(data2){
                                   $scope.res2                      = JSON.parse(JSON.stringify(data2));
                                   coordinates_boundaryPopulation2  = $scope.res2;
                                   $scope.options2                  = getChartOptions_boundaryEval("Police District","Isoperimetric Quotient");
                                   $scope.dataDetails2              = getBoundaryChartData2();
                               });

         $http({
                            method: 'POST',
                            url: '/prescription/getBoundaryGini',
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).success(function(data){
                            $scope.giniValue = data.toFixed(4);
                        });

}]);

function getBoundaryChartData(){
    var result = [];
    for (var i = 0; i < coordinates_boundaryPopulation.length; i++) {
        result.push({
            label: coordinates_boundaryPopulation[i]['label'],
            value: coordinates_boundaryPopulation[i]['frquncy']
        });
    }
    return [{
        values: result,
        key: 'My Chart',
    }];
}

function getBoundaryChartData2(){
    var result = [];
    for (var i = 0; i < coordinates_boundaryPopulation2.length; i++) {
        result.push({
            label: coordinates_boundaryPopulation2[i]['label'],
            value: coordinates_boundaryPopulation2[i]['frquncy']
        });
    }
    return [{
        values: result,
        key: 'My Chart',
    }];
}

function getChartData_eval(coordinateList){
    var result = [];
    for (var i = 0; i < coordinateList.length; i++) {
        result.push({
            label: coordinateList[i]['label'],
            value: coordinateList[i]['frquncy']
        });
    }
    return [{
        values: result,
        key: 'My Chart',
    }];
}


function  getChartOptions_boundaryEval(id,yLabel){
    return {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 70,
                left: 150
            },
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.2f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: id,
            },
            yAxis: {
                axisLabel: yLabel,
                axisLabelDistance: 30
            },
        }
    };
}