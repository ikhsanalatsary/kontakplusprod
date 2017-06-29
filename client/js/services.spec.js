import 'angular-mocks';
const admin = require('../basic').admin;
const Base64Str = btoa(`${admin.user}:${admin.password}`);
const headers = {
  "Authorization": "Basic " + Base64Str,
  "Accept": "application/json, text/plain, */*",
};

describe('Contacts Service', function () {
  var ContactServices;
  var $q;
  var $httpBackend;

  // Before each test load myApp module
  beforeEach(angular.mock.module('myApp'));

  // Before each test set our injected ContactServices factory (_ContactServices_)
  // to our local ContactServices variable
  beforeEach(inject(function (_ContactServices_, _$q_, _$httpBackend_) {
    ContactServices = _ContactServices_;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    this.deferred = $q.defer();
  }));

  // A simple test to verify the ContactServices factory exists
  it('should exist', function () {
    expect(ContactServices).toBeDefined();
  });

  // A set of tests for our ContactServices.find() method
  describe('.find()', function () {
    // A simple test to verify the method all exists
    it('should exist', function () {
      expect(ContactServices.find).toBeDefined();
    });

    // Setup the Promise
    it('should return Promise', function () {
      spyOn(ContactServices, 'find').and.returnValue(this.deferred.promise);
    });

    // Mock Http Request
    it('should find all contacts', function () {
      var mockData = require('./dummy.json');
      $httpBackend
        .expectGET('/api/contacts/', headers)
        .respond(200, mockData);

        ContactServices.find().then(res => {
          expect(res).toBeDefined();
          expect(res.status).toEqual(200);
          expect(res.data).toEqual(mockData);
        });

      $httpBackend.flush();

    });
  });

  // A set of tests for our ContactServices.findFav() method
  describe('.findFav()', function () {
    // A simple test to verify the method findFav exists
    it('should exist', function () {
      expect(ContactServices.findFav).toBeDefined();
    });

    // Setup the Promise
    it('should return Promise', function () {
      spyOn(ContactServices, 'findFav').and.returnValue(this.deferred.promise);
    });
  });

  // A set of tests for our ContactServices.delete() method
  describe('.delete()', function () {
    // A simple test to verify the method delete exists
    it('should exist', function () {
      expect(ContactServices.delete).toBeDefined();
    });

    // Setup the Promise
    it('should return Promise', function () {
      spyOn(ContactServices, 'delete').and.returnValue(this.deferred.promise);
    });
  });

  // A set of tests for our ContactServices.insert() method
  describe('.insert()', function () {
    // A simple test to verify the method insert exists
    it('should exist', function () {
      expect(ContactServices.insert).toBeDefined();
    });

    // Setup the Promise
    it('should return Promise', function () {
      spyOn(ContactServices, 'insert').and.returnValue(this.deferred.promise);
    });
  });

  // A set of tests for our ContactServices.update() method
  describe('.update()', function () {
    // A simple test to verify the method update exists
    it('should exist', function () {
      expect(ContactServices.update).toBeDefined();
    });

    // Setup the Promise
    it('should return Promise', function () {
      spyOn(ContactServices, 'update').and.returnValue(this.deferred.promise);
    });
  });

  // A set of tests for our ContactServices.findOne() method
  describe('.findOne()', function () {
    // A simple test to verify the method findOne exists
    it('should exist', function () {
      expect(ContactServices.findOne).toBeDefined();
    });

    // Setup the Promise
    it('should return Promise', function () {
      spyOn(ContactServices, 'findOne').and.returnValue(this.deferred.promise);
    });
  });

  // A set of tests for our ContactServices.patch() method
  describe('.patch()', function () {
    // A simple test to verify the method findOne exists
    it('should exist', function () {
      expect(ContactServices.patch).toBeDefined();
    });

    // Setup the Promise
    it('should return Promise', function () {
      spyOn(ContactServices, 'patch').and.returnValue(this.deferred.promise);
    });
  });

});
