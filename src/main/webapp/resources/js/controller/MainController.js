/**
 * Created by minudika on 9/9/16.
 */
/*var app = angular.module('myApp', ['ngMaterial']);*/

var startYear = 2010;
var endYear = 2015;
var playCoordinates = [];
var heatmap1;
var aggregatedPoints = [];

app.controller('MyController',function($scope,$http,$timeout, $mdSidenav, $routeParams, $location, $window,$mdDialog) {
//    $scope.openLeftMenu = function() {
//        $mdSidenav('left').toggle();
//    };



//         $http({
//                  method: 'POST',
//                  url: 'getCrimefileLoaded',
//                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//              }).success(function(result){
//                if(result != null){
//                    $scope.crimeFile = result;
//              }
//                else
//                    $scope.crimeFile = "No File";
//              console.log(result);
//              });

      $scope.status = '  ';
      $scope.customFullscreen = false;
      $scope.showAlert = function(ev) {
         // Appending dialog to document.body to cover sidenav in docs app
         // Modal dialogs should fully cover application
         // to prevent interaction outside of dialog
         $mdDialog.show(
           $mdDialog.alert()
             .parent(angular.element(document.querySelector('#popupContainer')))
             .clickOutsideToClose(true)
             .title('Available Datasets')
             .textContent('<h1>You can specify some description text in here.</h1>')
             .ariaLabel('Alert Dialog Demo')
             .ok('Got it!')
             .targetEvent(ev)
         );
       };
     $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');
      $scope.toggleTableDataSet = function(){
                      $http({
                                        method: 'POST',
                                        url: 'getPreTableName',
                                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                    }).success(function(results){
                                      if(results != ""){
                                          $scope.crimeTable = results;
                                    }
                                      else
                                          $scope.crimeTable= "Not preprocessed!";
                                          console.log(results);
                                    });

                      }
         $scope.toggleRows = function(){
                               $http({
                                                 method: 'POST',
                                                 url: 'getPreTableRows',
                                                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                             }).success(function(results){
                                               if(results != ""){
                                                   $scope.crimeTableRows = results;
                                             }
                                               else
                                                   $scope.crimeTableRows = "Not preprocessed!";
                                                   console.log(results);
                                             });

                               }

         $scope.toggleColumnNames = function(fileName){
                                        fileObject            = {'file' : fileName};
                                        $http({
                                                          method: 'POST',
                                                          url: 'getCrimeFileColumns',
                                                          data: Object.toParams(fileObject),
                                                          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                                      }).success(function(results){
                                                        if(results != ""){
                                                            $scope.crimeTableColumns = results;
                                                      }
                                                        else
                                                            $scope.crimeTableColumns = "not loaded";
                                                            console.log(results);
                                                      });

                                        }


        $scope.toggleDataSet = function(){
        $http({
                          method: 'POST',
                          url: 'getCrimefileLoaded',
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                      }).success(function(result){
                        if(result != null){
                            $scope.crimeFile        = result;
                            $scope.crimeFileParts   = $scope.crimeFile.split("/");
                            $scope.crimeFileName    = $scope.crimeFileParts[3];

                      }
                        else
                            $scope.crimeFileName = "No File";
                            console.log(result);
                         $scope.toggleTableDataSet();
                         $scope.toggleRows();
                         $scope.toggleColumnNames($scope.crimeFileName);
                      });

        }

       // $scope.toggleDataSet();

        $scope.home = [
                {
                    image: '/resources/svg/uploader.svg',
                    who: 'Upload File',
                    path: '/#/views/uploadfile'

                }
            ]

        $scope.prediction = [
        {
            image: '/resources/svg/model-train.svg',
            who: 'Train Model',
            path: '/#/views/trainmodel'
            }
        ]

        $scope.prescription = [
        {
            image: '/resources/svg/map.svg',
            who: 'District Boundaries',
            path: '/#/views/boundaries'
            }
        ]

        $scope.preprocess = [
                {
                    image: '/resources/svg/preprocess.svg',
                    who: 'Preprocess Data',
                    path: '/#/views/fileupload'
                    }
                ]

        $scope.visualization = [
            {
                image: '/resources/svg/map.svg',
                who: 'Heat Map',
                path: '/#/views/1'
            },
            {
                image: '/resources/svg/graph.svg',
                who: 'Histogram',
                path: '/#/views/2',
            },
            {
                image: '/resources/svg/query.svg',
                who: 'Query',
                path: '/#/views/query',
            },
//            {
//                image: '/resources/svg/timelaps.svg',
//                who: 'Heatmap Timelaps',
//                path: '/#/views/heatmap-timelaps',
//            },

        ];

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
              }
        }

         function AppCtrl($scope) {
            $scope.currentNavItem = 'page1';
         }

         $scope.go = function ( path ) {
           //$location.path(path);
           $window.location.href = path;

         };


});


app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file];
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    Upload.upload({
                        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                        data: {
                            username: $scope.username,
                            file: file
                        }
                    }).then(function (resp) {
                        $timeout(function() {
                            $scope.log = 'file: ' +
                                resp.config.data.file.name +
                                ', Response: ' + JSON.stringify(resp.data) +
                                '\n' + $scope.log;
                        });
                    }, null, function (evt) {
                        var progressPercentage = parseInt(100.0 *
                            evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage +
                            '% ' + evt.config.data.file.name + '\n' +
                            $scope.log;
                    });
                }
            }
        }
    };
}]);

app.controller('aMenuCtrl',['$scope',function($scope){
    $scope.onAtATime = true;
}]);

app.controller('sliderCtrl', function($scope) {
    $scope.slider = {
        value: 100,
        options: {
            id: 'slider-id',
            onStart: function(id) {
                console.log('on start ' + id); // logs 'on start slider-id'
            },
            onChange: function(id) {
                console.log('on change ' + id, $scope.slider.value); // logs 'on change slider-id'
            },
            onEnd: function(id) {
                console.log('on end ' + id); // logs 'on end slider-id'
            }
        }
    };

    $scope.userState = '';
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function (state) { return { abbrev: state }; });

    $scope.items = ['one','two','three','four'];

});



/*
Heatmap controller-------------------------------------------------------------------------------
*/

var lattitudes = null;
var longitudes = null;
//var locations = [];
var coordinates;

app.controller('mainCtrl', ['$scope', '$mdSidenav', '$mdUtil', function ($scope, $mdSidenav, $mdUtil) {


    $scope.toggleLeft = buildToggler('left');

    function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID)
                .toggle()
        }, 100);
        return debounceFn;
    }}]);

app.controller('AccordionDemoCtrl', function ($scope) {
    $scope.oneAtATime = true;
    $scope.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };
});


app.controller('mapController',['$scope','$http',function($scope,$http){
     $scope.list        = [];
    $scope.listModel    = [];
    $scope.year         = startYear;
    $scope.day1         = 0;
    $scope.month1       = 0;
    $scope.year1        = 0;
    $scope.isLoading    = false;


    var startYear = 2010;
    var endYear = 2015;
    var heatmap;
    var years;


    $scope.day2         = 0;
    $scope.month2       = 0;
    $scope.year2        = 0;

    $scope.dataCb2              = {value: false};
    $scope.dataCb1              = {value: false};
    $scope.yearLabel            = {value: '0'};
    $scope.userSubmissionDate   = {value:''};
    $scope.userSubmissionDate2  = {value:''};
    //$scope.categoryList=[];

    var checkAggregate = document.getElementById('aggregateCheck');

    /***********to set seasonwise data*************************/
    $scope.setSpecialMap = function(type){
            spQueryObj = {'type' : type};
            $http({
                        method: 'POST',
                        url: 'summary/getspecialmapdata',
                        data: Object.toParams(spQueryObj),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(data1){
                        if(data1 != "null") {
                            coordinates = data1;
                            //console.log("sdfsdfs"+data1);
                            heatmap.setData(getPoints());
                            // getPoints();
                        }
                    });
        }

      $http({
        method: 'POST',
        url: 'summary/getTimeLapsePlayData',
        //  data: Object.toParams(queryObj),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data) {
        if (data != "null") {
          $scope.res = JSON.parse(JSON.stringify(data));
          //coordinates = $scope.res;
          playCoordinates = $scope.res;
          coordinates = $scope.res;
          years = data['years'];
          year = startYear;
        }
      });

      queryObj = {'startYear': startYear, 'endYear': endYear}

      $http({
        method: 'POST',
        url: 'summary/getTimeLapseData',
        data: Object.toParams(queryObj),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data){
        if(data != "null") {
          $scope.res = JSON.parse(JSON.stringify(data));
          coordinates = $scope.res;

          //console.log("heatmap initialized");

          heatmap.setData(getPoints());
        }
      });

     $http({
                    method: 'POST',
                    url: 'getCategories',
                     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                     }).success(function(results){
                          $scope.categoryList = results;
                            //$scope.listModel = results;
              //            console.log($scope.categoryList.length);
                           for(var i=0; i < $scope.categoryList.length ; i++){
                                  $scope.list.push(false);
                               $scope.listModel.push(false);
                              }
            //                console.log($scope.list);
              });





    var mapOptions = {
        center: {lat: 37.7090296042376, lng: -122.446571654745},
        zoom: 10
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //getPoints();
    heatmap = new google.maps.visualization.HeatmapLayer({
       // data: getPoints(),
        map: map
    });
    heatmap1 = heatmap;

    function play () {           //  create a loop function
      setTimeout(function () {    //  call a 3s setTimeout when the loop is called

       // console.log($scope.year);         //  your code here
        $scope.yearLabel.value = $scope.year;
        $scope.$apply();
        var x = getPlayPoints($scope.year);
        //$scope.yearLabel.value = "";

        console.log(x.length)
        heatmap1.setData(x);
        $scope.year++;                     //  increment the counter
        if ($scope.year <= endYear) {            //  if the counter < 10, call the loop function
          play();             //  ..  again which will trigger another
        }                        //  ..  setTimeout()
      }, 2000)
    }

    function playAggreagte() {           //  create a loop function

      setTimeout(function () {    //  call a 3s setTimeout when the loop is called

        //console.log($scope.year);         //  your code here
        $scope.yearLabel.value = $scope.year;
        $scope.$apply();
        var x = getPlayPointsAggregate($scope.year);
        //$scope.yearLabel.value = "";

        //console.log(x.length);
        heatmap1.setData(x);
        $scope.year++;                     //  increment the counter
        if ($scope.year <= endYear) {            //  if the counter < 10, call the loop function
          playAggreagte();             //  ..  again which will trigger another
        }                        //  ..  setTimeout()
      }, 2000)
    }

    $scope.playNow = function(){
        $scope.year = startYear;

        aggregatedPoints = [];
   // $scope.yearLabel.value = $scope.year;

        if($scope.dataCb2.value  == true){

          playAggreagte();
        }
        else{
          play();
        }

      }


    $scope.setDuration = function(){
        $scope.isLoading = true;
        console.log("checkbox value"+$scope.dataCb1.value);
        console.log("calender "+$scope.userSubmissionDate.value.getDate());
        if($scope.dataCb1.value == true){
            $scope.day1 = $scope.userSubmissionDate.value.getDate();
            $scope.month1 = $scope.userSubmissionDate.value.getMonth()+1;
            $scope.year1 = $scope.userSubmissionDate.value.getFullYear();

            $scope.day2 = $scope.userSubmissionDate2.value.getDate();
            $scope.month2 = $scope.userSubmissionDate2.value.getMonth()+1;
            $scope.year2 = $scope.userSubmissionDate2.value.getFullYear();

            $scope.dayString = $scope.year1+":"+$scope.month1+":"+$scope.day1+":"+$scope.year2+":"+$scope.month2+":"+$scope.day2;
            $scope.passValue = {'dateRange' : $scope.dayString};
            $http({
                             method: 'POST',
                             url: 'getCoordinatesDateRange',
                             data: Object.toParams($scope.passValue),
                             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                         }).success(function(data){
                                if(data != "null") {
                                                $scope.res = JSON.parse(JSON.stringify(data));
                                                coordinates = $scope.res;
                                              //  console.log("sdfsdfs"+data);

                                                heatmap.setData(getPoints());
                                                $scope.isLoading = false;
                                                }
                         });


        }
        else{
            $scope.day1 = $scope.userSubmissionDate.value.getDate();
            $scope.month1 = $scope.userSubmissionDate.value.getMonth();
            $scope.year1 = $scope.userSubmissionDate.value.getFullYear();

            $scope.dayString1 = $scope.year1+":"+$scope.month1+":"+$scope.day1;
                        $scope.passValue1 = {'dateRange' : $scope.dayString1};
                        $http({
                                         method: 'POST',
                                         url: 'getCoordinatesDate',
                                         data: Object.toParams($scope.passValue1),
                                         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                     }).success(function(data){
                                            if(data != "null") {
                                                $scope.res = JSON.parse(JSON.stringify(data));
                                                coordinates = $scope.res;

                                                console.log("sdfsdfs"+data);
//                                                console.log(category);

                                                heatmap.setData(getPoints());
                                                $scope.isLoading = false;
                                                }
                                     });

        }
    }

    $scope.data 		        = {};
    $scope.data.fraud           = false;
    $scope.data.robbery         = false;
    $scope.data.burglary        = false;
    $scope.data.kidnapping      = false;
    $scope.data.theft           = false;
    $scope.data.suicide         = false;
    $scope.data.otherOffenses   = false;

   // $scope.list = [false,false,false,false,false,false,false];
   // $scope.categoryList = ['WARRANTS','VANDALISM','LARCENY/THEFT','VEHICLE THEFT','ROBBERY','ASSAULT','OTHER OFFENSES'];

    $scope.initialize = function(category) {
         $scope.list[category] = !($scope.list[category]);
        console.log($scope.categoryList[category]);

        var str = "";
        for(var x=0;x< $scope.categoryList.length ;x++){
            if($scope.list[x]){
                str += $scope.categoryList[x] + ":";
            }
        }

        queryObj = {'category': str}
        console.log(str);

        /*$http({
            type: 'GET',
            url: 'summary/getheatmapdata',
            dataType: 'json',
            data:{"category":category},
            success: function(result) {
                var res = JSON.parse(JSON.stringify(result));
                coordinates = res;
            }
        });*/

        $http({
            method: 'POST',
            url: 'summary/getheatmapdata',
            data: Object.toParams(queryObj),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            if(data != "null") {
                $scope.res = JSON.parse(JSON.stringify(data));
                coordinates = $scope.res;

                console.log("sdfsdfs"+data);
                console.log(category);

                heatmap.setData(getPoints());
                // getPoints();


            }
        });
    };

    this.userState1 = '';
    this.states1 = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function (state) { return { abbrev: state }; });

    this.userState2 = '';
    this.states2 = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function (state) { return { abbrev: state }; });

    $scope.selectedOption = 1;

    $scope.categoriesYearSelected = true;
    $scope.yearsCategorySelected = true;


    $scope.yearsCategory  = "Number of crimes for a given category over years";
    $scope.categoriesYear  = "Number of crimes for a given year over categories";

    $scope.select = function(x) {

        if(x == $scope.yearsCategory){
            $scope.categoriesYearSelected = true;
            $scope.yearsCategorySelected = false;
            $scope.selectedOption = 1;
            console.log("checked1");
            console.log($scope.categoriesYearSelected);
        }
        else{
            $scope.categoriesYearSelected = false;
            $scope.yearsCategorySelected = true;
            $scope.selectedOption = 2;
            console.log("checked2");
            console.log($scope.yearsCategorySelected);
        }
    };
    $scope.options = {};
    $scope.data = [];
    $scope.description="";

    $scope.updateChart = function(x){
        if(x== "yearsCategory") {
            $scope.selectedOption = 1;
            $scope.options = getChartOptions();
            $scope.data = getChartData();
            $scope.description = $scope.yearsCategory;
            console.log("checked11");
        }
        else{
            $scope.selectedOption = 2;
            $scope.options = getChartOptions();
            $scope.data = getChartData();
            $scope.description = $scope.categoriesYear;
            console.log("checked22");
        }
        console.log("update clicked");

    }
}]);

/*function getPoints() {
    for(var i=1;i<coordinates["myArrayList"].length;i++){
        locations.push(new google.maps.LatLng(coordinates[i]["map"], coordinates[i]['x']));
    }
    return locations;
}*/

function getPoints() {
    var locations = [];
    for(var i=0;i<coordinates.length;i++){
        locations.push(new google.maps.LatLng(coordinates[i]['y'], coordinates[i]['x']));
    }
    return locations;
}

function loadData(){

}


function  getChartOptions(){
    return {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showValues: true,
            valueFormat: function(d){
                return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'X Axis'
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: -10
            },
        }

    };
}

function getChartData(){
    return [
        {
            key: "Cumulative Return",
            values: [
                {
                    "label": "A",
                    "value": -29.765957771107
                },
                {
                    "label": "B",
                    "value": 0
                },
                {
                    "label": "C",
                    "value": 32.807804682612
                },
                {
                    "label": "D",
                    "value": 196.45946739256
                },
                {
                    "label": "E",
                    "value": 0.19434030906893
                },
                {
                    "label": "F",
                    "value": -98.079782601442
                },
                {
                    "label": "G",
                    "value": -13.925743130903
                },
                {
                    "label": "H",
                    "value": -5.1387322875705
                }
            ]
        }
    ]
}

function getPoints() {
  var locations = [];
  for(var i=0;i<coordinates.length;i++){
    locations.push(new google.maps.LatLng(coordinates[i]['x'], coordinates[i]['y']));
  }
  return locations;
}

function getPlayPoints(year) {
  var locations = [];

  if(playCoordinates[year] != null) {
    for (var i = 0; i < playCoordinates[year].length; i++) {
      locations.push(new google.maps.LatLng(playCoordinates[year][i]['x'], playCoordinates[year][i]['y']));
    }
  }
  return locations;
}

function getPlayPointsAggregate(year) {

  if(playCoordinates[year] != null) {
    for (var i = 0; i < playCoordinates[year].length; i++) {
      aggregatedPoints.push(new google.maps.LatLng(playCoordinates[year][i]['x'], playCoordinates[year][i]['y']));
    }
  }
  return aggregatedPoints;
}

function delay(time)
{
  setTimeout(function(){return true;},time);

}

/*function play(vm,startYear,endYear){
  setTimeout(function(){
    vm.slider.value = year;
    console.log(year);
  },1000);
}*/








