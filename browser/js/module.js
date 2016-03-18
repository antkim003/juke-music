console.log('greetings!');
var juke = angular.module('juke', []);
juke.controller('apiMusic', function($http, $scope, $log){
  var promiseForBody = $http.get('/api/albums/');
    promiseForBody
    .then(function(response){
      // $log.log('heres the first response data',response.data[0]);
      return $http.get('/api/albums/'+ response.data[0]._id);
    })
    .then(function(response){
      // $log.log(response);
       $scope.album = response.data;
    }).catch($log.error);

  $scope.hide = false;
  $scope.start = function(songid) {
    var audio = document.createElement('audio');
    audio.src = "/api/songs/" +songid+".audio";
    audio.load();
    audio.play();
    $scope.currentSongId = songid;
    $scope.hide = true;

  };
});//end apiMusic controller

juke.controller('jukeController', function($scope){

  $scope.getArtistsNames = function(arrObj){
    var newArtists = arrObj.map(function(item){
      return item.name;
    }).join(", ");
    return newArtists;


};//end function
});//end of controller
