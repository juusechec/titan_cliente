'use strict';

describe('Service: administrativaMidService', function () {

  // load the service's module
  beforeEach(module('titanClienteV2App'));

  // instantiate service
  var administrativaMidService;
  beforeEach(inject(function (_administrativaMidService_) {
    administrativaMidService = _administrativaMidService_;
  }));

  it('should do something', function () {
    expect(!!administrativaMidService).toBe(true);
  });

});
