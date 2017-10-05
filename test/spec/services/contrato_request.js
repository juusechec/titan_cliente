'use strict';

describe('Service: contratoRequest', function () {

  // load the service's module
  beforeEach(module('titanClienteV2App'));

  // instantiate service
  var contratoRequest;
  beforeEach(inject(function (_contratoRequest_) {
    contratoRequest = _contratoRequest_;
  }));

  it('should do something', function () {
    expect(!!contratoRequest).toBe(true);
  });

});
