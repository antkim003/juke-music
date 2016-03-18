juke.controller('PlayerCtrl', function($scope, $rootScope) {
  var audio = document.createElement('audio');
  $scope.playing = false;

  $rootScope.$on('songstart', function(event, songid) {
    console.log('here is the event emitter', songid);
    $scope.start(songid);
  });

  $scope.start = function(songid) {
    console.log('start', songid);
    $rootScope.currentSongId = songid;

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
});
