'use strict';

const { mlab } = require('./config');

module.exports = {
  getDbConnection() {
    return `mongodb://${mlab.uname}:${mlab.pwd}@ds019886.mlab.com:19886/problemset`;
  },
  uploads: {
    gcsUpload: {
      bucket: 'multer-sharp.appspot.com', // Required : bucket name to upload
      projectId: 'multer-sharp', // Required : Google project ID
      keyFilename: 'server/config/firebase.auth.json', // Required : JSON credentials file for Google Cloud Storage
      destination: 'kontakplus/public', // Optional : destination folder to store your file for Google Cloud Storage, default: ''
      acl: 'publicRead', // Required : acl credentials file for Google Cloud Storage, publicrRead or private, default: private
    },
  },
};
