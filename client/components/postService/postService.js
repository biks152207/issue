(function(){
  'use strict';
  function PostResource($resource){
    return $resource('/api/posts/:id',{
      id: '@_id',
    },{
      update:{
        method: 'GET'
      }
    })
  }

  angular.module('postApp')
    .factory('Post', PostResource);
})();
