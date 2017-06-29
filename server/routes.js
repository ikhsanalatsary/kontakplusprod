'use strict';

const { Router } = require('express');
const basicAuth = require('./middleware');
const { create, deletes, index, patch, show, update, upload } = require('./controller/contacts.controller');

const router = Router();

router.use(basicAuth);
router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.post('/upload', upload);
router.put('/:id', update);
router.patch('/:id', patch);
router.delete('/:id', deletes);

module.exports = router;
