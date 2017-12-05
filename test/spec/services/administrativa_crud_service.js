'use strict';

describe('Service: administrativaCrudService', function () {

  // load the service's module
  beforeEach(module('titanClienteV2App'));

  // instantiate service
  var administrativaCrudService;
  beforeEach(inject(function (_administrativaCrudService_) {
    administrativaCrudService = _administrativaCrudService_;
  }));

  it('should do something', function () {
    expect(!!administrativaCrudService).toBe(true);
  });

});
