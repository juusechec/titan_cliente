'use strict';

describe('Service: oikosRequest', function () {

  // load the service's module
  beforeEach(module('titanClienteV2App'));

  // instantiate service
  var oikosRequest;
  beforeEach(inject(function (_oikosRequest_) {
    oikosRequest = _oikosRequest_;
  }));

  it('should do something', function () {
    expect(!!oikosRequest).toBe(true);
  });

});
