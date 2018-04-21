app.controller('BoundaryController',['$scope','$http','$mdDialog',function($scope,$http,$mdDialog){
    $scope.isLoading = false;
    $scope.colours = [];
    $scope.isFileAvailable = false;
    $scope.message  = "";
    var polygons = [];
    var colors = ["#6dff00","#ff0000","#ff8800","#fff200","#00ffd3","#0090ff","#0100b1","#c600c3",
          "#ff54a8","#398400","#e9b4ce","#2dff83","#bea200","#001d26"];

//        $scope.options = {};
//        $scope.dataDetails = [];
//        $scope.options2 = {};
//        $scope.data2 = [];
//        $scope.options3 = {};
//        $scope.data3 = [];
//        $scope.options4 = {};
//        $scope.data4 = [];
//        $scope.description="";
//        $scope.testValue = "";

        $scope.showAdvanced = function(ev) {
                  $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'dialog1.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                  })
                  .then(function(answer) {
                    //$scope.status = 'You said the information was "' + answer + '".';
                  }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                  });
                };

        function DialogController($scope, $mdDialog) {
                  $scope.hide = function() {
                    $mdDialog.hide();
                  };

                  $scope.cancel = function() {
                    $mdDialog.cancel();
                  };

                  $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                  };
                }

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.77419580, lng: -122.44778840},
    zoom: 11
  });

  $scope.submitBoundaryMapParams = function () {
  coordinates_boundaryPopulation = [];
   $scope.isLoading     = true;
   //var nDistricts      = document.getElementById("nDistricts").value;
    var population      = 802355; //document.getElementById("population").value;
    $scope.message      = "Please wait until data is loaded..";
    queryObj1           = {'nDistricts': $scope.nDistricts,'population' : population};

    $http({
      method: 'POST',
      data : Object.toParams(queryObj1),
      url: 'boundaryPolygons',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(result){
//        $http({
//                          method: 'POST',
//                          url: '/prescription/getHistogram_clusterPopulation',
//                          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//                      }).success(function(data){
//                          $scope.res1 = JSON.parse(JSON.stringify(data));
//                          coordinates_boundaryPopulation = $scope.res1;
//                          $scope.options = getChartOptions("Police District");
//                          $scope.dataDetails = getBoundaryChartData();
//
//                          console.log("update clicked");
//                      });

      $scope.message  = "";
      var id=0;
      var color;
      for(var j=0;j<result["myArrayList"].length;j=j+2){
        if($scope.nDistricts > colors.length){
         color = getRandomColor();
        }
       else {
         color = colors[id];
         id++;
       }
        var color = getRandomColor();
        $scope.colours.push(color);

        var clusterID = result["myArrayList"][j+1];
        for(var k=0;k<result["myArrayList"][j]["myArrayList"].length;k++){

          var latTmp =  result["myArrayList"][j]["myArrayList"][k]["map"][0]["myArrayList"];
          var lngTmp =  result["myArrayList"][j]["myArrayList"][k]["map"][1]["myArrayList"];

          var polygonCoordinates = [];

          for(var i=0;i<latTmp.length;i++){
            polygonCoordinates.push({lat:latTmp[i],lng:lngTmp[i]});
          }

          var polygon = new google.maps.Polygon({
            paths: polygonCoordinates,
            strokeColor: '#FF0000',
            strokeOpacity: 0.4,
            strokeWeight: 1,
            fillColor: color,
            fillOpacity: 0.8,
            label:'sdfsdf',
          });
          polygon.setMap(map);
        }
        //polygons.push(polygon);
      }
       $scope.testValue = "this is a test!";
      $scope.isLoading = false;
    });

  }
}]);

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//function getBoundaryChartData(){
//    var result = [];
//    for (var i = 0; i < coordinates_boundaryPopulation.length; i++) {
//        result.push({
//            label: coordinates_boundaryPopulation[i]['label'],
//            value: coordinates_boundaryPopulation[i]['frquncy']
//        });
//    }
//    return [{
//        values: result,
//        key: 'My Chart',
//    }];
//}
//
//function getChartData_eval(coordinateList){
//    var result = [];
//    for (var i = 0; i < coordinateList.length; i++) {
//        result.push({
//            label: coordinateList[i]['label'],
//            value: coordinateList[i]['frquncy']
//        });
//    }
//    return [{
//        values: result,
//        key: 'My Chart',
//    }];
//}
