'use strict';

angular.module('postApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        template: '<register></register>'
      });
  });
