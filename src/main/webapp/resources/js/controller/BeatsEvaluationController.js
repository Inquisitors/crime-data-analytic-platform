app.controller('BeatsEvaluationController',['$scope','$http','$mdDialog',function($scope,$http,$mdDialog){

        $scope.options      =   {};
        $scope.data         =   [];
        $scope.options2     =   {};
        $scope.data2        =   [];
        $scope.options3     =   {};
        $scope.data3        =   [];
        $scope.options4     =   {};
        $scope.data4        =   [];
        $scope.description  =   "";
        $scope.checkValue   = "this is test";
        $scope.isLoading    =  true;

       //data for histogram 1
                       $http({
                           method: 'POST',
                           url: '/prescription/getHistogramResultsForBeats',
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                       }).success(function(data){
                           $scope.res1 = JSON.parse(JSON.stringify(data));
                           coordinates = $scope.res1;
                           $scope.options = getChartOptions_beatsEval("Patrol Beat Id","Response Time (s)");
                           $scope.data = getBeatsChartData();
                           console.log("update clicked" + $scope.data);
                           $scope.isLoading = false;
                       });

                       //data for histogram2
                       $http({
                           method: 'POST',
                           url: 'prescription/getHistogramEvalCompactness',
                           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                       }).success(function(data){
                           $scope.res2      = JSON.parse(JSON.stringify(data));
                           coordinates2     = $scope.res2;
                           $scope.options2  = getChartOptions_beatsEval("Patrol Beat Id","Compactness(%)");
                           $scope.data2     = getBeatsChartData2(coordinates2);
                           console.log("update clicked");
                           //$scope.loading  = false;
                       });

                       $http({
                                                  method: 'POST',
                                                  url: 'prescription/getHistogramWorkLoad',
                                                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                              }).success(function(data){
                                                  $scope.res3 = JSON.parse(JSON.stringify(data));
                                                  coordinates3 = $scope.res3;
                                                  $scope.options3 = getChartOptions_beatsEval("Patrol Beat Id","Units");
                                                  $scope.data3 = getBeatsChartData3(coordinates3);
                                                  console.log("update clicked third graph");
                                              });

                        $http({
                                              method: 'POST',
                                              url: '/prescription/getBeatsGini',
                                              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                          }).success(function(data){
                                              $scope.beatsGini = data.toFixed(4);
                                          });


}]);

function getBeatsChartData(){
    var result = [];
    for (var i = 0; i < coordinates.length; i++) {
        result.push({
            label: coordinates[i]['label'],
            value: coordinates[i]['frquncy']
        });
    }
    return [{
        values: result,
        key: 'My Chart',
    }];
}

function getBeatsChartData2(){
    var result = [];
    for (var i = 0; i < coordinates2.length; i++) {
        result.push({
            label: coordinates2[i]['label'],
            value: coordinates2[i]['frquncy']
        });
    }
    return [{
        values: result,
        key: 'My Chart',
    }];
}

function getBeatsChartData3(){
    var result = [];
    for (var i = 0; i < coordinates3.length; i++) {
        result.push({
            label: coordinates3[i]['label'],
            value: coordinates3[i]['frquncy']
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

function  getChartOptions_beatsEval(id,yLabel){
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