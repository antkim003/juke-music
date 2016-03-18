var juke = angular.module('juke', []);

juke.controller('AlbumCtrl', function($http, $scope, $log, $rootScope){
  var promiseForBody = $http.get('/api/albums/');
    promiseForBody
    .then(function(response){
      // $log.log('heres the first response data',response.data[0]);
      return $http.get('/api/albums/'+ response.data[0]._id);
    })
    .then(function(response){
      $log.log(response);
      $scope.album = response.data;
      $rootScope.songs = $scope.album.songs.map(function(song) {
        return song._id;
      });
    }).catch($log.error);



    $scope.getArtistsNames = function(arrObj){
      var newArtists = arrObj.map(function(item){
        return item.name;
      }).join(", ");
      return newArtists;
    };//end function

    $scope.initiate = function(songid) {
      $rootScope.$emit('songstart', songid);
    }

});//end apiMusic controller

