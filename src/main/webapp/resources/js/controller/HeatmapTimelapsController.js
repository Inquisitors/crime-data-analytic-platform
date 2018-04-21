//var startYear = 2010;
//var endYear = 2015;
//var year = startYear;
//var playCoordinates = [];
//var heatmap1;
//var aggregatedPoints = [];

app.controller('TimeLapseController',['$scope','$http',function($scope,$http){
  var startYear = 2010;
  var endYear = 2015;
  var heatmap;
  var years;
  var vm = this;
  vm.lastSliderUpdated = '';

  var mapOptions = {
    center: {lat: 37.7090296042376, lng: -122.446571654745},
    zoom: 8
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  heatmap = new google.maps.visualization.HeatmapLayer({
    //data: getPoints(),
    map: map
  });
  heatmap1 = heatmap;

//  var checkAggregate = document.getElementById('aggregateCheck');
//
//  $http({
//    method: 'POST',
//    url: 'summary/getTimeLapsePlayData',
//    //  data: Object.toParams(queryObj),
//    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//  }).success(function(data) {
//    if (data != "null") {
//      $scope.res = JSON.parse(JSON.stringify(data));
//      //coordinates = $scope.res;
//      playCoordinates = $scope.res;
//      coordinates = $scope.res;
//      years = data['years'];
//      year = startYear;
//    }
//  });
//
//  queryObj = {'startYear': startYear, 'endYear': endYear}
//
//  $http({
//    method: 'POST',
//    url: 'summary/getTimeLapseData',
//    data: Object.toParams(queryObj),
//    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//  }).success(function(data){
//    if(data != "null") {
//      $scope.res = JSON.parse(JSON.stringify(data));
//      coordinates = $scope.res;
//
//      console.log("heatmap initialized");
//
//      heatmap.setData(getPoints());
//    }
//  });

//  vm.myEndListener = function(sliderId) {
//    // console.log(sliderId, 'has ended with ', vm.slider.value);
//    console.log(vm.slider.min,vm.slider.max);
//    vm.lastSliderUpdated = vm.slider.min + ' - ' + vm.slider.max;
//
//    queryObj = {'startYear': vm.slider.min, 'endYear': vm.slider.max}
//
//    $http({
//      method: 'POST',
//      url: 'summary/getTimeLapseData',
//      data: Object.toParams(queryObj),
//      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//    }).success(function(data){
//      if(data != "null") {
//        $scope.res = JSON.parse(JSON.stringify(data));
//        coordinates = $scope.res;
//
//        console.log("sdfsdfs"+data);
//
//        heatmap.setData(getPoints());
//      }
//    });
//  };

  /*$scope.play = function(){
    if(checkAggregate.checked == true){

      playAggreagte(vm);
    }
    else{
      play(vm);
    }
    year = startYear;
    aggregatedPoints = [];
  }
*/
  vm.slider = {
    value: 0,
    min: 2010,
    max: 2016,
    options: {
      floor: 2010,
      ceil: 2016,
      id: 'sliderA',
      onEnd: vm.myEndListener
    }
  };



}]);
//
//function getPoints() {
//  var locations = [];
//  for(var i=0;i<coordinates.length;i++){
//    locations.push(new google.maps.LatLng(coordinates[i]['x'], coordinates[i]['y']));
//  }
//  return locations;
//}
//
//function getPlayPoints(year) {
//  var locations = [];
//
//  if(playCoordinates[year] != null) {
//    for (var i = 0; i < playCoordinates[year].length; i++) {
//      locations.push(new google.maps.LatLng(playCoordinates[year][i]['x'], playCoordinates[year][i]['y']));
//    }
//  }
//  return locations;
//}
//
//function getPlayPointsAggregate(year) {
//
//  if(playCoordinates[year] != null) {
//    for (var i = 0; i < playCoordinates[year].length; i++) {
//      aggregatedPoints.push(new google.maps.LatLng(playCoordinates[year][i]['x'], playCoordinates[year][i]['y']));
//    }
//  }
//  return aggregatedPoints;
//}
//
//function delay(time)
//{
//  setTimeout(function(){return true;},time);
//
//}
//
///*function play(vm,startYear,endYear){
//  setTimeout(function(){
//    vm.slider.value = year;
//    console.log(year);
//  },1000);
//}*/
//
//function play () {           //  create a loop function
//  setTimeout(function () {    //  call a 3s setTimeout when the loop is called
//
//    console.log(year);         //  your code here
//    var x = getPlayPoints(year);
//    console.log(x.length)
//    heatmap1.setData(x);
//    year++;                     //  increment the counter
//    if (year <= endYear) {            //  if the counter < 10, call the loop function
//      play();             //  ..  again which will trigger another
//    }                        //  ..  setTimeout()
//  }, 2000)
//}
//
//function playAggreagte() {           //  create a loop function
//
//  setTimeout(function () {    //  call a 3s setTimeout when the loop is called
//
//    console.log(year);         //  your code here
//    var x = getPlayPointsAggregate(year);
//    console.log(x.length);
//    heatmap1.setData(x);
//    year++;                     //  increment the counter
//    if (year <= endYear) {            //  if the counter < 10, call the loop function
//      playAggreagte();             //  ..  again which will trigger another
//    }                        //  ..  setTimeout()
//  }, 2000)
//}