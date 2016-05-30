'use strict';

angular.module('postApp.auth', [
  'postApp.constants',
  'postApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
