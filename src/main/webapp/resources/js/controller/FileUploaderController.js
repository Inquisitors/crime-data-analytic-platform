app.controller('MyCtrl', function ($scope, Upload, $timeout, $http, $mdDialog, $window) {

    $scope.imagePath = "/resources/images/file-upload.png";
    $scope.censusData           = false;
    $scope.crimeData            = false;
    $scope.tractData            = false;
    $scope.showCensusColumns    = false;
    $scope.showCrimeColumns     = false;
    $scope.showTractColumns     = false;
    $scope.isCompleted          = false;
    $scope.isCensusTableLoading = false;
    $scope.isPrepCompleted      = false;

    $scope.radioCensusPop       =  {'value' : "No Value"};
    $scope.radioCensusLat       =  {'value' : "No Value"};
    $scope.radioCensusLon       =  {'value' : "No Value"};
    $scope.censusColumnNames    = {'value' : ""};
   $scope.selectColumnNames      = {'value': ""};

   $scope.selectCrimeColumnNames = {'value':""};
   $scope.crimeColumnNames      = {'value':""}




    $scope.censusPath = "./data/census_data/";
    $scope.crimePath  = "./data/crime_data/";
    $scope.tractPath  = "./data/tract_data/";

    $scope.urlCall    = "controller/upload";

    $scope.deleteCall = "getCrimeSet";

/*********values to be passed for census data**************/
    $scope.tableName        = {value: "CensusTest"};
    $scope.columnPopulation = {value: ""};
    $scope.columnLat        = {value : ""};
    $scope.columnLong       = {value: ""};

    /*************values to be passed for crime data**************/
    $scope.crimeTableName           = {value : "TestName"};
    $scope.crimeColumnDates         = {value : ""};
    $scope.crimeColumnCat           = {value : ""};
    $scope.crimeColumnWeek          = {value : ""};
    $scope.crimeColumnPd            = {value : ""};
    $scope.crimeColumnResolution    = {value : ""};
    $scope.crimeColumnLat           = {value : ""};
    $scope.crimeColumnLon           = {value : ""};



    pathObj1 = {'path' : $scope.censusPath};
    pathObj2 = {'path' : $scope.crimePath};
    pathObj3 = {'path' : $scope.tractPath};

    $scope.availableCensusColumns   = [];
    $scope.availableCrimeColumns    = [];
    $scope.availableTractColumns    = [];
    $scope.value = 'foo';
    $scope.selectedCensusFile = "";
    $scope.selectedCrimeFile  = "";
    $scope.selectedTractFile  = "";


     $scope.models = {
            selected: null,
            lists: {"A": [], "B": []}
        };

        // Generate initial model
        for (var i = 1; i <= 3; ++i) {
            $scope.models.lists.A.push({label: "Item A" + i});
            $scope.models.lists.B.push({label: "Item B" + i});
        }

        // Model to JSON for demo purpose
        $scope.$watch('models', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

         /******************************event listener to set census data columns*************************/
         $scope.$watch('selectCrimeColumnNames.value', function(value0) {

                           $scope.$watch('crimeColumnNames.value', function(value1) {

                                      if(value1 == "one"){
                                        $scope.crimeColumnDates.value = value0;
                                      }
                                      else if(value1 == "two"){
                                        $scope.crimeColumnCat.value = value0;
                                      }
                                      else if(value1 == "three"){
                                        $scope.crimeColumnWeek.value = value0;
                                      }
                                      else if(value1 == "four"){
                                          $scope.crimeColumnPd.value = value0;
                                        }
                                        else if(value1 == "five"){
                                          $scope.crimeColumnResolution.value = value0;
                                        }
                                        else if(value1 == "six"){
                                          $scope.crimeColumnLat.value = value0;
                                        }
                                        else if(value1 == "seven"){
                                          $scope.crimeColumnLon.value = value0;
                                        }


                                   });


                   });

         /******************************event listener to set census data columns*************************/
                  $scope.$watch('selectColumnNames.value', function(value0) {

                                    $scope.$watch('censusColumnNames.value', function(value1) {

                                               if(value1 == "one"){
                                                 $scope.columnPopulation.value = value0;
                                               }
                                               else if(value1 == "two"){
                                                 $scope.columnLat.value = value0;
                                               }
                                               else if(value1 == "three"){
                                                 $scope.columnLong.value = value0;
                                               }
                                            });


                            });

/***********observer for census file set **************************/
   $scope.$watch('censusData.files', function(value) {

          $scope.selectedCensusFile     = value;
          //console.log($scope.selectedCensusFile);
          if($scope.selectedCensusFile != undefined){
          $scope.isCensusFileLoading = true;
          fileObject                    = {'file' : $scope.selectedCensusFile};
          $http({
            method  : 'POST',
            url     : 'getCensusFileColumns',
            data    : Object.toParams(fileObject),
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(result){
                $scope.availableCensusColumns = result;
                $scope.showCensusColumns      = true;
                 $scope.isCensusFileLoading = false;
          });
        }
    });

/***********observer for crime file set **************************/
   $scope.$watch('crimeData.files', function(value) {

          $scope.selectedCrimeFile   = value;
          console.log(value);
          if($scope.selectedCrimeFile != undefined){
          $scope.isCrimeFileLoading = true;
          fileObject            = {'file' : $scope.selectedCrimeFile};
          $http({
            method  : 'POST',
            url     : 'getCrimeFileColumns',
            data    : Object.toParams(fileObject),
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(result){
                $scope.isCrimeFileLoading = false;
                $scope.availableCrimeColumns = result;
                $scope.showCrimeColumns = true;
          });
        }
    });

/***********observer for tract file set **************************/
   $scope.$watch('tractData.files', function(value) {
          $scope.isLoading = false;
          $scope.selectedTractFile   = value;
          $scope.showTractColumns    = true;
          fileObject            = {'file' : $scope.selectedTractFile};
          $http({
            method  : 'POST',
            url     : 'getTractFileColumns',
            data    : Object.toParams(fileObject),
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function(result){
                $scope.availableTractColumns = result;
          });

    });


/**********method to configure columns for the selected data file***************/
    $scope.setCensusColumns = function(){
        $scope.isCensusTableLoading = true;
        columnsObject = { 'tableName'   : $scope.tableName.value,
                          'population'  : $scope.columnPopulation.value,
                          'lat'         : $scope.columnLat.value,
                          'lon'         : $scope.columnLong.value
        }

        $http({
                    method  : 'POST',
                    url     : 'setCensusTable',
                    data    : Object.toParams(columnsObject),
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                  }).success(function(result){
                        //$scope.setCrimeTable = result;
                        $scope.isCensusTableLoading = false;
                        //console.log($scope.setCrimeTable);
                  });
    }
    $scope.testSetData = function(){
            console.log("came to testSetFunction");
            tableObject = {'tableName' : $scope.crimeTableName.value};
            $http({
                                    method  : 'POST',
                                    url     : 'setCrimeTableTest',
                                    data    : Object.toParams(tableObject),
                                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                                  }).success(function(result){
                                        $scope.setCrimeTable = result;
                                        console.log($scope.setCrimeTable);
                                  });
    }

/**************method to configure columns for crime data set*******************/
    $scope.setCrimeColumns  = function(){
            $scope.isLoading = true;
            crimeColObject = {  'tableName' :   $scope.crimeTableName.value,
                                'dates'     :   $scope.crimeColumnDates.value,
                                'category'  :   $scope.crimeColumnCat.value,
                                'dayOfWeek' :   $scope.crimeColumnWeek.value,
                                'pdDistrict':   $scope.crimeColumnPd.value,
                                'resolution':   $scope.crimeColumnResolution.value,
                                'lat'       :   $scope.crimeColumnLat.value,
                                'lon'       :   $scope.crimeColumnLon.value
            };

            $http({
                        method  : 'POST',
                        url     : 'setCrimeTable',
                        data    : Object.toParams(crimeColObject),
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                      }).success(function(result){
                            $scope.setCrimeTable        = result;
                             $scope.isLoading           = false;
                             $scope.isPrepCompleted     = true;


                      });
     }


/************method to delete files********************/
    $scope.deleteFiles = function(file,type){
    console.log("delete file "+file);
        deleteObject = {'file' : file, 'type' : type};
        $http({
        method  : 'POST',
        url     : 'deleteFile',
        data    : Object.toParams(deleteObject),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(results){
                if(type == 0){
                $scope.files1 = results;
                $scope.$apply();
                }
                else if(type ==1){
                $scope.files2 = results;
                $scope.$apply();
                }
                else if(type == 2){
                $scope.files3 = results;
                $scope.$apply();
                }
        });

    }

     $scope.removeFile = function(file,type) {
        var deleteUser = $window.confirm('Are you absolutely sure you want to delete?');
        console.log("came removeUser");
        if (deleteUser) {
            $scope.deleteFiles(file,type);
        }
      }


    /***********confirmation dialog**********************/
    $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
              .title('Delete File')
              .textContent('Are you sure you want to delete ')
              .ariaLabel('Lucky day')
              .targetEvent(ev)
              .ok('Yes')
              .cancel('No');

        $mdDialog.show(confirm).then(function() {

        }, function() {

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
   /*********************method to update lists of files*********************/
    $scope.updateLists = function(){
    $http({
        method: 'POST',
        url: 'getCensusSet',
        data: Object.toParams(pathObj1),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).success(function(result){
                    $scope.files1 = result;
                    //console.log($scope.files1);
                    });
     $http({
             method: 'POST',
             url: 'getCrimeSet',
             data: Object.toParams(pathObj2),
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
              }).success(function(result1){
                         $scope.files2 = result1;
                         console.log("files: "+result1);
                         });
     $http({
            method: 'POST',
            url: 'getTractSet',
            data: Object.toParams(pathObj3),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function(result2){
                        $scope.files3 = result2;
                        });

    };
    $scope.updateLists();
    $scope.printName = function(){
            console.log($scope.imagePath);
        }
    $scope.uploadFiles = function(file, errFiles, option) {
        if(option == 0)
        $scope.f = file;
        else if(option == 1)
        $scope.f1 = file;
        else if(option == 2)
        $scope.f2 = file;

        $scope.errFile = errFiles && errFiles[0];
        if (file) {

            uploadObject = {'file' : file,
                            'type' : option
                           }

                                          //file: file
            if(option == 0)
                $scope.urlCall = "controller/upload";
            else if(option == 1)
                $scope.urlCall = "controller/upload1";
            else if(option ==2)
                $scope.urlCall = "controller/upload2";
            file.upload = Upload.upload({
                url: $scope.urlCall,
                file: file
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    console.log("got to file upload here!");
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
            if(option == 0)
                        $scope.censusData = true;
                    else if(option == 1)
                        $scope.crimeData = true;
                    else if(option == 2)
                        $scope.tractData = true;

                  }
    }
});