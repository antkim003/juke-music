console.log('greetings!');
var juke = angular.module('juke', []);

juke.controller('musicControls', function($http, $scope, $log){
  var promiseForBody = $http.get('/api/albums/');
    promiseForBody
    .then(function(response){
      // $log.log('heres the first response data',response.data[0]);
      return $http.get('/api/albums/'+ response.data[0]._id);
    })
    .then(function(response){
      $log.log(response);
      $scope.album = response.data;
      $scope.songs = $scope.album.songs.map(function(song) {
        return song._id;
      });
    }).catch($log.error);



    $scope.getArtistsNames = function(arrObj){
      var newArtists = arrObj.map(function(item){
        return item.name;
      }).join(", ");
      return newArtists;
    };//end function

    var audio = document.createElement('audio');
    $scope.playing = false;
    $scope.start = function(songid) {  
      $scope.currentSongId = songid;

      audio.src = "/api/songs/" +songid+".audio";
      audio.load();
      audio.play();

      audio.addEventListener('timeupdate', function() {
        // console.log( audio.currentTime, audio.duration);
        var progress = 100 * (audio.currentTime / audio.duration);
        $scope.progress = progress;
        $scope.$apply();
      });


      $scope.playing = true;

      if (!$scope.firstPlay) {
        $scope.firstPlay = true;
      }
    };

    audio.addEventListener('ended', function () {
        $scope.forward(); // or some other way to go to the next song
    });




    $scope.pauseplay = function() {
      if ($scope.playing) {
        // pause the song here
        audio.pause();
        $scope.playing = false;
      } else {
        // continue playing the current song
        audio.play();
        $scope.playing = true;
      }
    }

    $scope.forward = function() {
      var songIdx = $scope.songs.indexOf($scope.currentSongId);
      if (songIdx === $scope.songs.length-1) {
        songIdx = 0;
      } else {
        songIdx++;
      }
      $scope.start($scope.songs[songIdx]);
    }

    $scope.backward = function() {
      var songIdx = $scope.songs.indexOf($scope.currentSongId);
      if (songIdx === 0) {
        songIdx = $scope.songs.length-1;
      } else {
        songIdx--;
      }
      $scope.start($scope.songs[songIdx]);
    }

});//end apiMusic controller

