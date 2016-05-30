'use strict';

angular.module('postApp')
  .directive('myDirective', function () {
    return {
      templateUrl: 'app/myDirective/myDirective.html',
      restrict: 'E',
      controller: 'myDirectiveController',
      controllerAs: 'nav'
    };
  });
