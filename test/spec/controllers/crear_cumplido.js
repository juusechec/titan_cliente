'use strict';

describe('Controller: CrearCumplidoCtrl', function () {

  // load the controller's module
  beforeEach(module('titanClienteV2App'));

  var CrearCumplidoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearCumplidoCtrl = $controller('CrearCumplidoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CrearCumplidoCtrl.awesomeThings.length).toBe(3);
  });
});
