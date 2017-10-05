'use strict';

describe('Service: coreRequest', function () {

  // load the service's module
  beforeEach(module('titanClienteV2App'));

  // instantiate service
  var coreRequest;
  beforeEach(inject(function (_coreRequest_) {
    coreRequest = _coreRequest_;
  }));

  it('should do something', function () {
    expect(!!coreRequest).toBe(true);
  });

});
