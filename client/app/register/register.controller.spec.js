'use strict';

describe('Component: RegisterComponent', function () {

  // load the controller's module
  beforeEach(module('postApp'));

  var RegisterComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    RegisterComponent = $componentController('RegisterComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
