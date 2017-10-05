'use strict';

describe('Controller: CrearInformeCtrl', function () {

  // load the controller's module
  beforeEach(module('titanClienteV2App'));

  var CrearInformeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearInformeCtrl = $controller('CrearInformeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CrearInformeCtrl.awesomeThings.length).toBe(3);
  });
});
