'use strict';

describe('Controller: CargaDocumentosDocenteCtrl', function () {

  // load the controller's module
  beforeEach(module('titanClienteV2App'));

  var CargaDocumentosDocenteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CargaDocumentosDocenteCtrl = $controller('CargaDocumentosDocenteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CargaDocumentosDocenteCtrl.awesomeThings.length).toBe(3);
  });
});
