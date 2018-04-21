app.controller('BoundarySeedsController',['$scope','$http','$mdDialog',function($scope,$http,$mdDialog){

   var map2 = new google.maps.Map(document.getElementById('map2'), {
      center: {lat: 37.77419580, lng: -122.44778840},
      zoom: 13
    });

    $scope.showSeeds = function(){
          $http({
            method: 'POST',
            url: '/prescription/getBoundarySeedPoints',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(result){
            $scope.message  = "";
            var id=0;
            for(var j=0;j<result["myArrayList"].length;j=j+2){

              for(var k=0;k<result["myArrayList"][j+1]["myArrayList"].length;k++){

                var latTmp =  result["myArrayList"][j+1]["myArrayList"][k]["map"][0]["myArrayList"];
                var lngTmp =  result["myArrayList"][j+1]["myArrayList"][k]["map"][1]["myArrayList"];

                var polygonCoordinates = [];

                for(var i=0;i<latTmp.length;i++){
                  polygonCoordinates.push({lat:latTmp[i],lng:lngTmp[i]});
                }

                var polygon = new google.maps.Polygon({
                  paths: polygonCoordinates,
                  strokeColor: '#FF0000',
                  strokeOpacity: 1,
                  strokeWeight: 1,
                  fillColor: '#FF0000',
                  fillOpacity: 1,
                  label:'sdfsdf',
                });
                polygon.setMap(map2);
              }
              //polygons.push(polygon);
            }
          });
        }

        $scope.showSeeds();

}])