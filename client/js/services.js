import { admin } from '../basic.json';
const Base64Str = btoa(`${admin.user}:${admin.password}`);
const headers = { Authorization: `Basic ${Base64Str}` };

export default class ContactServices {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
    this.api = '/api/contacts/';
  }

  // GET method
  find() {
    return this.$http.get(this.api, { headers });
  }

  findFav() {
    const data = {
      favorite: true,
    };
    return this.$http.get(this.api, { params: data, headers });
  }

  // DELETE method
  delete(value) {
    if (angular.isArray(value) && value.length > 0) {
      const contactIds = value;
      const deferred = this.$q.defer();
      contactIds.forEach((contactId) => {
        this.$http
          .delete(this.api + contactId, { headers })
          .then((res) => {
            if (res.status === 200) {
              deferred.resolve(res);
            }
          })
          .catch(deferred.reject);
      });
      return deferred.promise;
    }
    const contactId = value;
    return this.$http.delete(this.api + contactId, { headers });
  }

  // POST method
  insert(contact) {
    headers['Content-Type'] = 'application/json';
    return this.$http.post(this.api, contact, { headers });
  }

  // PUT method
  update(contact) {
    headers['Content-Type'] = 'application/json';
    return this.$http.put(this.api + contact._id, contact, { headers });
  }

  // Show by {_id} method
  findOne(contactId) {
    return this.$http.get(this.api + contactId, { headers });
  }

  // Set Favorite method
  patch(contactId, data) {
    return this.$http.patch(this.api + contactId, data, { headers });
  }

  // upload image
  upload(files) {
    headers['Content-Type'] = undefined;
    const fd = new FormData();
    if (angular.isDefined(files)) {
      angular.forEach(files, (obj) => {
        fd.append('avatar', obj.lfFile);
      });
    }

    return this.$http.post(`${this.api}upload`, fd, { transformRequest: angular.identity, headers });
  }
}

ContactServices.$inject = ['$http', '$q'];
