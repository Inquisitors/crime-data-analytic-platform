

app.controller('TrnCtrl',['$scope','$http','$element','Upload', '$timeout',function($scope, $http, $element,Upload,$timeout) {
      $scope.path = "./data/";
       pathObj = {'path' : $scope.path}
                  $http({
                              method: 'POST',
                              url: 'getfilelist',
                              data: Object.toParams(pathObj),
                              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                          }).success(function(result){
                          $scope.files = result;
                          console.log(result);
                          });
      $scope.algorithm = {
                type: 'one',
                column: ['one', 'two', 'three'],
      }
      //$scope.Data = Data;
      $scope.downloadPath   = "";
      $scope.testFileLoaded = false;
      $scope.trees          = {value: 0};
      $scope.blocksize      = {value: 0};
      $scope.maxIterations  = {value: 0};
      $scope.folds          = {value: 0};
      $scope.nodes          = {value: ""};
      $scope.seeds          = {value: 0};
      $scope.selectedLabel;
      $scope.fileLocation   = "./data/sample.csv";
      $scope.isCompleted    = false;
      $scope.isTrained      = false;
      $scope.results            = [];
      $scope.filteredResults    = [];
      $scope.currentPage        = 1;
      $scope.numPerPage         = 10;
      $scope.maxSize            = 5;
      $scope.raceData           = false;


      $scope.$watch('currentPage + numPerPage', function() {
                       var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                       , end = begin + $scope.numPerPage;
                       $scope.filteredResults = $scope.results.slice(begin, end);
                     });


      $scope.algos = [
           {algo: "Multilayer Perceptron Classification", value: "one"},
           {algo: "Random Forest", value: "two"},
           {algo: "Naive Baysian", value:"three"}
           ];


          // The md-select directive eats keydown events for some quick select
          // logic. Since we have a search input here, we don't need that logic.
          $element.find('input').on('keydown', function(ev) {
              ev.stopPropagation();
          });

        $scope.$watch('raceData', function(value) {
             boolObj = {'state' : value}
             $http({
                                         method: 'POST',
                                         url: 'setfeature',
                                         data: Object.toParams(boolObj),
                                         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                         }).success(function(result){
                                         $http({
                                                  method: 'POST',
                                                  url: 'getColumnNames',
                                                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                                  }).success(function(data){
                                                       $scope.columns   = data;
                                                       $scope.labels    = data;
                                                       $scope.searchTerm;
                                                       $scope.clearSearchTerm = function() {
                                                       $scope.searchTerm = '';
                                                       };

                                           });

                                  });



        });

        $scope.trainModel = function() {
            $scope.isLoading = true;
            $scope.isTrained = false;
            trainObject = {'type'           : $scope.selectedAlgo.type,
                           'trees'          : $scope.trees.value,
                           'layer'          : $scope.nodes.value,
                           'option'         : $scope.selectedAlgo.option,
                           'blockSize'      : $scope.blocksize.value,
                           'maxIterations'  : $scope.maxIterations.value,
                           'folds'          : $scope.folds.value,
                           'columns'        : $scope.selectedAlgo.columns,
                           'label'          : $scope.selectedAlgo.label,
                           'partitions'     : $scope.selectedAlgo.partitions,
                           'seeds'          : $scope.seeds.value
                           }

             $http({
                        method: 'POST',
                        url: 'trainmodel',
                        data: Object.toParams(trainObject),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(data){
                        //console.log(data);
                        $scope.content      = data;
                        console.log(data);
                        $scope.isCompleted  = true;
                        $scope.isLoading    = false;
                        $scope.isTrained    = true;
//                       $http({
//                               method: 'POST',
//                               url: 'getaccuracy',
//                               data: Object.toParams(trainObject),
//                               headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//                               }).success(function(datas){
//                                    $scope.content = datas;
//                                    $scope.isCompleted = true;
//                                    $scope.isLoading = false;
//                                    //console.log($scope.content);
//                               });

                    });

        }

        $scope.uploadFiles = function(file, errFiles, option) {
                var count   = 0;
                $scope.testFileLoaded = false;
                $scope.f = file;
                $scope.errFile = errFiles && errFiles[0];
                if (file) {

                    uploadObject = {'file' : file,
                                    'type' : option
                                   }
                    $scope.urlCall = "controller/upload3";

                    file.upload = Upload.upload({
                        url: $scope.urlCall,
                        file: file
                    });

                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                                                 evt.loaded / evt.total));
                                                 if(count == 1){
                       trainFileObject = {'testFilePath' : file.name,
                                          'columns'      : $scope.selectedAlgo.columns
                                         }
                      $http({
                                  method: 'POST',
                                  url: 'predictForTestFile',
                                  data: Object.toParams(trainFileObject),
                                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                  }).success(function(response){

                                $scope.downloadPath     = {'value':response};
                                $scope.results          = response;
                                $scope.numPages         = function () {
                                    return Math.ceil($scope.results.length / $scope.numPerPage);
                                  };
                                $scope.testFileLoaded    = true;
                                $scope.isTrained         = true;

                           });
                           }
                           count++;
                    });

                          }
            }
}]);

