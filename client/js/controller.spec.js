import 'angular-mocks';

describe('Contacts Controller', function () {
  var ContactServices;
  var $q;

  // Before each test load myApp module
  beforeEach(angular.mock.module('myApp'));

  // Before each test set our injected Users factory (_ContactServices_)
  // to our local ContactServices variable
  beforeEach(inject(function (_ContactServices_, _$q_) {
    ContactServices = _ContactServices_;
    $q = _$q_;
    this.deferred = $q.defer();
  }));

  // A simple test to verify the ContactServices factory exists
  it('should exist', function () {
    expect(ContactServices).toBeDefined();
  });

});
