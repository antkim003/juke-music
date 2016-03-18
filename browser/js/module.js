console.log('greetings!');
var juke = angular.module('juke', []);
juke.controller('apiMusic', function($http, $scope, $log){
  $http.get('/api/albums/')
    .then(function(response){
      console.log(response);
    }).catch($log.error);

});//end apiMusic controller

juke.controller('jukeController', function($scope){
   $scope.clickTest = function(){
     $scope.number++;
     console.log('Hello World!');


   };
   $scope.number = 0;
   $scope.fakeAlbum = {
    name: 'Abbey Road',
    imageUrl: 'http://fillmurray.com/300/300',
    songs: [{
        name: 'Romeo & Juliette',
        artists: [{name: 'Bill'}],
        genres: ['Smooth', 'Funk'],
        audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2013.mp3'
    }, {
        name: 'White Rabbit',
        artists: [{name: 'Bill'}, {name: 'Bob'}],
        genres: ['Fantasy', 'Sci-fi'],
        audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2008.mp3'
    }, {
        name: 'Lucy in the Sky with Diamonds',
        artists: [{name: 'Bob'}],
        genres: ['Space'],
        audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2001.mp3'
    }]
};//end of fake album
$scope.getArtistsNames = function(arrObj){
  var newArtists = arrObj.map(function(item){
    return item.name;
  }).join(", ");
  return newArtists;


}//end function
});//end of controller
