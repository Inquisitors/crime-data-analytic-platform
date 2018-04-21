/*var app = angular.module('myApp', ['ngMaterial']);*/

app.directive('view1', function() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'views/summary/heatmap/view1.html'
  };
});