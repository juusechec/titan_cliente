'use strict';

/**
 * @ngdoc service
 * @name titanClienteV2App.nuxeo
 * @description
 * # nuxeo
 * Factory in the titanClienteV2App.
 */
angular.module('titanClienteV2App')
  .factory('nuxeo', function ($q) {
    // Service logic
    // ...
    Nuxeo.promiseLibrary($q);
    return new Nuxeo({

        baseURL: 'https://athento.udistritaloas.edu.co/nuxeo/',
        auth: {
            method: 'basic',
            username: 'Administrator',
            password: 'S1st3m4s04S=Fr331P4'
        }
});
  });
