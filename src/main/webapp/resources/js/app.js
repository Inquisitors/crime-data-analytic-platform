'use strict';

var selected = "No file selected";
// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
    'ngMaterial',
     'ngFileUpload',
     'ngMessages',
    'rzModule',
    'nvd3',
    'ui.bootstrap',
    'fcsa-number',
    'material.svgAssetsCache'
]);
/*config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  /!*$routeProvider.otherwise({redirectTo: '/view1'});*!/
}]);*/


Object.toParams= function toParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
}


app.config(function ($routeProvider,$mdThemingProvider) {
    $mdThemingProvider.theme('altTheme')
        .primaryPalette('teal');

    $mdThemingProvider.setDefaultTheme('altTheme');

    $routeProvider
      .when('/', {
              controller: 'MyController',
              templateUrl: 'views/file-upload/file-upload'
            })
      .when('/views/1', {
        controller: 'MyController',
        templateUrl: 'views/summary/heatmap/heatmap'
      })
      .when('/views/2', {
          controller: 'histogramController',
          templateUrl: 'views/summary/histogram/view'
      })
      .when('/views/file-upload', {
          controller: 'MyController',
          templateUrl: 'views/file-upload/file-upload'
      })
      .when('/views/query', {
          controller: 'MyController',
          templateUrl: 'views/summary/querywindow/querywindow'
      })
        .when('/views/fileupload', {
            controller: 'MyController',
            templateUrl: 'views/preprocess/file-upload/file_upload'
      })
        .when('/views/trainmodel', {
             controller: 'MyController',
             templateUrl: 'views/prediction/train_model'
      })
         .when('/views/uploadfile', {
             controller: 'MyController',
             templateUrl: 'views/upload-file/upload-file'
      })
         .when('/views/heatmap-timelaps', {
             controller: 'MyController',
             templateUrl: 'views/summary/heatmap-timelaps/heatmap-timelaps'
      })
      .when('/views/policeboundaries',{
            controller: 'MyController',
            templateUrl: 'views/prescription/police-boundaries'
      })
        .when('/views/boundaries', {
            controller: 'BoundaryController',
            templateUrl: 'views/prescription/boundaries'
        })
        .when('/views/beats', {
            controller: 'BeatsController',
            templateUrl: 'views/prescription/beats'
        })
        .when('/views/heatmapcompare', {
                    controller: 'MyController',
                    templateUrl: 'views/summary/heatmap-compare/heatmap-compare'
                })
         .when('/views/beatseval', {
                             controller : 'MyController',
                             templateUrl: 'views/prescription/beats-evaluation'
                         })
         .when('/views/boundaryeval', {
                             controller : 'MyController',
                             templateUrl: 'views/prescription/boundaries-evaluation'
                         })
          .when('/views/boundaryseed', {
                           controller : 'MyController',
                           templateUrl: 'views/prescription/boundary-seeds'
                       })
      .otherwise({
        redirectTo: '/'
      });
});





//========================


/***** Application *****/

/*angular.module('adminMenu',['windows','ui.bootstrap'])

    .controller('aMenuCtrl',['$scope',function($scope){
        $scope.onAtATime = true;
    }]) // end aMenuCtrl

/!**/
app.controller('aMenuCtrl',['$scope',function($scope){
    $scope.onAtATime = true;
}]);
