'use strict';

describe('Service: nuxeo', function () {

  // load the service's module
  beforeEach(module('titanClienteV2App'));

  // instantiate service
  var nuxeo;
  beforeEach(inject(function (_nuxeo_) {
    nuxeo = _nuxeo_;
  }));

  it('should do something', function () {
    expect(!!nuxeo).toBe(true);
  });

});
