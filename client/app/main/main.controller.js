'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, Post) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];
    this.lists = Post.query();
    // this.lists = [
    //   {
    //     post: 'Your time is limited, so don\'t waste it living someone else\'s life',
    //     name: 'jermey'
    //   },
    //   {
    //     post: 'Your work is going to fill a large part of your life',
    //     name: 'bikram'
    //   },
    //   {
    //     post:'You can\'t blame gravity for falling in love',
    //     name: 'joseph'
    //   }
    // ];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    // this.$http.get('/api/things').then(response => {
    //   this.awesomeThings = response.data;
    //   this.socket.syncUpdates('thing', this.awesomeThings);
    // });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('postApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
