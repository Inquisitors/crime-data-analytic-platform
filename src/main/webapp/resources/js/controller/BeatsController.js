var coordinates = [];
var coordinates2 = [];
var coordinates3 = [];
var coordinates4 = [];

app.controller('BeatsController',['$scope','$http','$mdDialog',function($scope,$http,$mdDialog){

//        $scope.options      =   {};
//        $scope.data         =   [];
//        $scope.options2     =   {};
//        $scope.data2        =   [];
//        $scope.options3     =   {};
//        $scope.data3        =   [];
//        $scope.options4     =   {};
//        $scope.data4        =   [];
//        $scope.description  =   "";
//        $scope.checkValue   = "this is test";


  $scope.isFileAvailable = false;
  $scope.isLoading       = false;
  $scope.message         = "";
  var polygons           = [];
  var seedCoordinates    = [];
  var seedMarkers        = [];
  $scope.colours         = [];
  var heatmap;
 var colors = ["#6dff00","#ff0000","#ff8800","#fff200","#00ffd3","#0090ff","#0100b1","#c600c3",
      "#ff54a8","#398400","#e9b4ce","#2dff83","#bea200","#001d26"];
  $scope.status = '  ';
  $scope.customFullscreen = false;

  var map = new google.maps.Map(document.getElementById('map1'), {
    center: {lat: 37.77419580, lng: -122.44778840},
    zoom: 13
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
      //data: getPoints(),
      map: map
    });

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

  $scope.submitBeatsParams  = function () {
      $scope.isLoading      = true;
      var txtDistrictID     = document.getElementById("districtID");
      var txtnBeats         = document.getElementById("nBeats");
      var opSeason          = document.getElementById("seasons");
      var weekdaysSelect    = document.getElementById("weekdays");
      var weekendSelect     = document.getElementById("weekend");

      var nBeats            = txtnBeats.value;
      var watch             = document.getElementById("watch").value;
      var districtID        = txtDistrictID.value;
      var season            = opSeason.value;
      var weekdaysSelected  = weekdaysSelect.checked == true ? 1 : 0;
      var weekendSelected   = weekendSelect.checked == true ? 1 : 0;

      $scope.message  = "Please wait until data is loaded..";

      queryObj = {'districtID':districtID,'nBeats':nBeats, 'season': season,'weekdays' : weekdaysSelected, 'weekend' : weekendSelected,'watch':watch};

      $http({
        method: 'POST',
        data : Object.toParams(queryObj),
        url: 'originalBoundaryPolygons',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(result){
        $scope.message  = "";
        var id=0;
        var color;
        for(var j=0;j<result["myArrayList"].length;j++){
           if(nBeats > colors.length){
                     color = getRandomColor();
                   }
                   else {
                     color = colors[id];
                     id++;
                   }
          $scope.colours.push(color);
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
              fillOpacity: 0.8
            });

            polygon.setMap(map);

          }
          //polygons.push(polygon);

        }
//            //data for histogram 1
//                $http({
//                    method: 'POST',
//                    url: '/prescription/getHistogramResultsForBeats',
//                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//                }).success(function(data){
//                    $scope.res1 = JSON.parse(JSON.stringify(data));
//                    coordinates = $scope.res1;
//                    $scope.options = getChartOptions("Days");
//                    $scope.data = getChartData();
//
//                    console.log("update clicked" + $scope.data);
//                    $scope.isLoading = false;
//                });
//
//                //data for histogram2
//                $http({
//                    method: 'POST',
//                    url: 'prescription/getHistogramEvalCompactness',
//                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//                }).success(function(data){
//                    $scope.res2 = JSON.parse(JSON.stringify(data));
//                    coordinates2 = $scope.res2;
//                    $scope.options2 = getChartOptions("Beat");
//                    $scope.data2 = getChartData_eval(coordinates2);
//                    console.log("update clicked");
//
//                });
/*request seed points*/
          queryObj = {'districtID':districtID,'nBeats':nBeats, 'season': season,'weekdays' : weekdaysSelected, 'weekend' : weekendSelected,'watch':watch};
          $http({
            method: 'POST',
            url: 'prescription/getBeatsSeedPoints',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(data){
            if(data != "null") {
              $scope.seeds = JSON.parse(JSON.stringify(data));
              seedCoordinates = $scope.seeds;
              for(var i=0;i<seedCoordinates["map"]["coordinates"]["myArrayList"].length;i++){
                var marker = new google.maps.Marker({
                  position: { lat: seedCoordinates["map"]["coordinates"]["myArrayList"][i]['x'], lng: seedCoordinates["map"]["coordinates"]["myArrayList"][i]['y'] },
                  label: (i).toString()
                });
                //locations.push(new google.maps.LatLng(coordinates[i]['x'], coordinates[i]['y']));
                marker.setMap(map);
              }
             // heatmap.setData(getPoints());
            }
            $scope.isLoading = false;
          });
                /***********************************/

      });


      queryObj = {'startYear': 2010, 'endYear': 2015}

      $http({
        method: 'POST',
        url: 'summary/getTimeLapseData',
        data: Object.toParams(queryObj),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data){
        if(data != "null") {
          $scope.res = JSON.parse(JSON.stringify(data));
          coordinates = $scope.res;

          console.log("heatmap initialized");

          heatmap.setData(getPoints());
        }
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

function getPoints() {
  var locations = [];
  for(var i=0;i<coordinates.length;i++){
    locations.push(new google.maps.LatLng(coordinates[i]['x'], coordinates[i]['y']));
  }
  return locations;
}

//function getChartData(){
//    var result = [];
//    for (var i = 0; i < coordinates.length; i++) {
//        result.push({
//            label: coordinates[i]['label'],
//            value: coordinates[i]['frquncy']
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
