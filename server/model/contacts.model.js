'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: { type: String, required: true, default: '' },
  title: { type: String, default: '' },
  email: { type: Array, default: [] },
  phone: { type: Array, default: [] },
  address: { type: Array, default: [] },
  company: { type: String, default: '' },
  avatar: { type: String, default: '' },
  favorite: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  updated: Date,
});

ContactSchema
  .pre('save', function pre(next) {
    if (this.isNew) return next();
    this.updated = Date.now();
    return next();
  });

const Contact = mongoose.model('Contacts', ContactSchema);

module.exports = Contact;
