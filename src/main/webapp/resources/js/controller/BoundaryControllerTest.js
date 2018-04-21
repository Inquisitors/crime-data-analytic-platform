/*app.controller('TimeLapseController', TimeLapseController);

function TimeLapseController($scope) {
  var vm = this;
  vm.lastSliderUpdated = '';

  vm.myEndListener = function(sliderId) {
    console.log(sliderId, 'has ended with ', vm.slider.value);
    vm.lastSliderUpdated = vm.slider.min + ' - ' + vm.slider.max;
    $scope.drop(vm.slider.min,vm.slider.max);
  };

  vm.slider = {
    min: 2010,
    max: 2016,
    options: {
      floor: 2010,
      ceil: 2016,
      id: 'sliderA',
      onEnd: vm.myEndListener
    }
  };
}*/

app.controller('BoundaryControllerTest',['$scope','$http',function($scope,$http){
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 37.77419580, lng: -122.44778840},
    mapTypeId: 'terrain'
  });

  // Define the LatLng coordinates for the polygon's path.
  var triangleCoords = [
    {lat: 37.77419580, lng: -122.44778840},
    {lat: 37.77049420, lng: -122.44745390},
    {lat: 37.77509950, lng: -122.43697290},
    {lat: 37.77419580, lng: -122.44778840}
  ];

  // Construct the polygon.
  var bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  bermudaTriangle.setMap(map);


}]);

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
