'use strict';

/* eslint-disable no-param-reassign */
const { promisify } = require('util');
const multer = require('multer');
const gcsSharp = require('multer-sharp');
const Contact = require('../model/contacts.model');
const config = require('../config');

const storage = gcsSharp({
  bucket: config.uploads.gcsUpload.bucket,
  projectId: config.uploads.gcsUpload.projectId,
  keyFilename: config.uploads.gcsUpload.keyFilename,
  acl: config.uploads.gcsUpload.acl,
  size: {
    width: 1296,
  },
  max: true,
});

exports.create = async (req, res) => {
  const body = req.body;
  const contact = new Contact(body);
  try {
    await contact.save();
    return res.sendStatus(200);
  } catch (e) {
    return handleError(res, e);
  }
};

exports.show = async (req, res) => {
  const contactId = req.params.id;
  try {
    const contact = await Contact.findById(contactId);
    return res.status(200).json(contact);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.index = async (req, res) => {
  const query = {};
  if (req.query.favorite) query.favorite = Boolean(req.query.favorite);

  try {
    const contacts = await Contact.find(query, null, { sort: { name: 1 } });
    if (contacts.length === 0) return res.sendStatus(404);
    return res.status(200).json(contacts);
  } catch (e) {
    return res.sendStatus(400);
  }
};

exports.update = async (req, res) => {
  const body = req.body;
  const contactId = req.params.id;
  try {
    let contact = await Contact.findById(contactId);
    contact = Object.assign(contact, body);
    const result = await contact.save();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.deletes = async (req, res) => {
  try {
    await Contact.remove({ _id: req.params.id });
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(400);
  }
};

exports.patch = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    contact.favorite = req.body.favorite;
    if (req.body.name) contact.name = req.body.name;
    const result = await contact.save();
    return res.status(200).json(result);
  } catch (e) {
    return res.json(400, e);
  }
};

exports.upload = async (req, res) => {
  // upload here
  const upload = multer({ storage }).single('avatar');
  const uploadAsync = promisify(upload);
  try {
    await uploadAsync(req, res);
    res.json({ avatar: req.file.path });
  } catch (e) {
    res.status(400).json({ message: 'Something was wrong while upload' });
  }
};

function handleError(res, err) {
  return res.status(500).json(err);
}
