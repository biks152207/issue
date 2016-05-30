'use strict';
(function(){

class DashboardComponent {
  constructor(Auth, Post) {
    this.message = 'Hello';
    this.formData = {};
    this.postList = Post.query();
    this.currentUser = Auth.getCurrentUser();
    this.Post = Post;
  }
  submit(form){
    if (form.$valid){
      this.formData.user = this.currentUser._id;
      this.postList.push(this.formData);
      var postResource = this.Post.save(this.formData);
      postResource.$promise.then(function(data){
        $('#postForm')[0].reset();
        form.$setPristine(true);
        this.formData = {};

      }.bind(this), function(err){

      });
    }
  }
}

angular.module('postApp')
  .component('dashboard', {
    templateUrl: 'app/dashboard/dashboard.html',
    controller: DashboardComponent,
    controllerAs: 'vm'
  });

})();
