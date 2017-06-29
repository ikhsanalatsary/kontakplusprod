export default class ContactsCtrl {
  constructor($rootScope, $transition$, $state, ContactServices, person, getContacts, getConFav, $mdToast, $log, $mdDialog) {
    this.$rootScope = $rootScope;
    this.$stateParams = $transition$.params();
    this.ContactServices = ContactServices;
    this.$state = $state;
    this.$mdToast = $mdToast;
    this.$mdDialog = $mdDialog;
    this.$log = $log;
    this.newRecord = true;
    this.position = 'top';
    this.handleError = handleError.bind(this);
    this.isList = $state.current.data.isList;
    this.value = false;
    this.search = false;
    this.superhero = [];
    this.contact = {};
    this.contact.phone = [{ option: 'Mobile' }];
    this.contact.email = [{ option: 'Personal' }];
    this.contact.address = [{ option: 'Home' }];
    this.uploadLabel = 'Browse';
    this.option = {
      browseIconCls: 'myBrowse',
      captionIconCls: 'myCaption',
    };

    if (angular.isDefined(this.$stateParams._id)) {
      this.newRecord = false;
      this.uploadLabel = 'Change';
      this.contact = person.data;
    }

    this.onSubmitClick = (files) => {
      if (angular.isArray(files) && files.length > 0) {
        ContactServices.upload(files).then((res) => {
          this.contact.avatar = res.data.avatar;
          $mdToast.show(
            $mdToast.simple()
              .textContent('Successfully Uploaded')
              .position(this.position)
              .hideDelay(1000)
            );
        }, this.handleError);
      }
    };

    if (this.isList) {
      this.contacts = getContacts.data;
      this.confav = getConFav.data;
    }
  }

  // Remove Method by {_id}
  removeContact(contactId) {
    const confirm = this.$mdDialog.confirm()
      .title('Are you sure to delete this records ?')
      .ariaLabel('Confirmation')
      .ok('Delete')
      .cancel('Cancel');

    this.$mdDialog.show(confirm).then(() => {
      this.ContactServices.delete(contactId)
        .then(() => {
          this.$mdToast.show(
            this.$mdToast.simple()
              .textContent('Successfully deleted')
              .position(this.position)
              .hideDelay(3000)
            );
        }, this.handleError)
        .finally(this.$state.go('contacts.list'));
    });
  }

  // Go to form Create
  newContact() {
    this.$state.go('contacts.add');
  }

  // Submit Contact method
  addContact() {
    const { ContactServices, $state, contact, $mdToast, position } = this;
    if (!angular.isDefined(contact.name)) return;
    ContactServices.insert(contact)
      .then(() => {
        $state.go('contacts.list');
        $mdToast.show(
          $mdToast.simple()
            .textContent('Successfully created')
            .position(position)
            .hideDelay(3000)
          );
      }, this.handleError);
  }

  // Update Contact method
  updateContact() {
    const { ContactServices, $state, contact, $mdToast, position } = this;
    ContactServices.update(contact)
      .then(() => {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Successfully updated')
            .position(position)
            .hideDelay(3000)
          );
        $state.go('contacts.list');
      }, this.handleError);
  }

  // Set favorite method
  addFavorite(val) {
    const { ContactServices, $stateParams, $mdToast, position } = this;
    this.contact.favorite = val;
    ContactServices.patch($stateParams._id, this.contact)
      .then(() => {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Success changed')
            .position(position)
            .hideDelay(3000)
          );
        this.$state.reload();
      }, this.handleError);
  }

  // Add field phone
  addNewPhone() {
    if (this.newRecord) {
      this.contact.phone.push({ option: 'Mobile' });
    } else {
      this.person.phone.push({ option: 'Mobile' });
    }
  }

  // Remove field phone
  removePhone(item) {
    if (this.newRecord) {
      this.contact.phone.splice(item, 1);
    } else {
      this.person.phone.splice(item, 1);
    }
  }

  // Add field email
  addNewEmail() {
    if (this.newRecord) {
      this.contact.email.push({ option: 'Personal' });
    } else {
      this.person.email.push({ option: 'Personal' });
    }
  }

  // Remove field email
  removeEmail(item) {
    if (this.newRecord) {
      this.contact.email.splice(item, 1);
    } else {
      this.person.email.splice(item, 1);
    }
  }

  // Add field address
  addNewAddress() {
    if (this.newRecord) {
      this.contact.address.push({ option: 'Home' });
    } else {
      this.person.address.push({ option: 'Home' });
    }
  }

  // Remove field address
  removeAddress(item) {
    if (this.newRecord) {
      this.contact.address.splice(item, 1);
    } else {
      this.person.address.splice(item, 1);
    }
  }

  // Checlist box All contact
  checkAll(checked) {
    if (checked) {
      this.superhero = this.contacts.map((item) => item._id);
    } else {
      this.uncheckAll();
    }
  }

  // Uncheck all contact
  uncheckAll() {
    this.superhero = [];
  }

  // Remove / delete selected contact
  deleteAll() {
    const arr = this.superhero;
    const $mdToast = this.$mdToast;
    if (arr.length > 1) {
      const confirm = this.$mdDialog.confirm()
        .title('Are you sure to delete this records ?')
        .ariaLabel('Confirmation')
        .ok('Delete')
        .cancel('Cancel');

      this.$mdDialog.show(confirm).then(() => {
        const contactIds = arr;
        this.ContactServices.delete(contactIds)
          .then((res) => {
            if (res.status === 200) {
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Successfully deleted')
                  .position(this.position)
                  .hideDelay(1000)
                );
            }
            return 'reload';
          })
          .then(this.$state.reload())
          .finally(() => (this.superhero = []));
      });
    }
  }

  // Search button
  searchBtn() {
    this.search = true;
  }

  // Disable search
  removeSearch() {
    this.search = false;
    this.searchContact = '';
  }

  // Go to Detail page by {_id}
  goDetail(_id) {
    this.$state.go('contacts.detail', { _id });
  }

  // Back to list contact
  goBack() {
    this.$state.go('contacts.list');
  }
}

ContactsCtrl.$inject = [
  '$rootScope',
  '$transition$',
  '$state',
  'ContactServices',
  'person',
  'getContacts',
  'getConFav',
  '$mdToast',
  '$log',
  '$mdDialog',
];

function handleError(res) {
  const $mdToast = this.$mdToast;
  if (res.status !== -1) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(`${res.status} status ${res.statusText}`)
        .position(this.position)
        .hideDelay(1000)
        .theme('error-toast')
      );
  } else {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Connection lost')
        .position(this.position)
        .hideDelay(1000)
        .theme('error-toast')
      );
  }
}
