'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _contactsModel = require('../model/contacts.model.js');

var _contactsModel2 = _interopRequireDefault(_contactsModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.create = function (req, res, next) {
  var body = req.body;
  if (req.file) body.avatar = req.file.filename;

  var bodyTitle;
  var bodyCompany;
  var bodyName = JSON.parse(body.name);
  var bodyEmail = JSON.parse(body.email);
  var bodyPhone = JSON.parse(body.phone);
  var bodyAddress = JSON.parse(body.address);
  if (typeof body.title !== 'undefined') bodyTitle = JSON.parse(body.title);
  if (typeof body.company !== 'undefined') bodyCompany = JSON.parse(body.company);

  var avatar = body.avatar;

  var person = {
    name: bodyName,
    title: bodyTitle,
    email: bodyEmail,
    phone: bodyPhone,
    address: bodyAddress,
    company: bodyCompany,
    avatar: avatar
  };

  var contact = new _contactsModel2.default(person);

  contact.save(function (err) {
    if (err) return handleError(res, err);
    return res.sendStatus(200);
  });
};

exports.show = function (req, res, next) {
  var contactId = req.params.id;
  _contactsModel2.default.findById(contactId, function (err, contact) {
    if (err) return res.status(400).json(err);
    res.status(200).json(contact);
  });
};

exports.index = function (req, res, next) {
  var query = {};
  if (req.query.favorite) query.favorite = Boolean(req.query.favorite);

  _contactsModel2.default.find(query, null, { sort: { name: 1 } }, function (err, contacts) {
    if (err) return res.sendStatus(404);
    if (contacts.length == 0) return res.sendStatus(404);
    return res.status(200).json(contacts);
  });
};

exports.update = function (req, res, next) {
  var body = req.body;
  _contactsModel2.default.findById(req.params.id, function (err, contact) {
    if (req.file) {
      contact.avatar = req.file.filename;
    }

    var bodyTitle;
    var bodyCompany;
    contact.name = JSON.parse(body.name);
    contact.email = JSON.parse(body.email);
    contact.phone = JSON.parse(body.phone);
    contact.address = JSON.parse(body.address);
    if (typeof body.title !== 'undefined') bodyTitle = JSON.parse(body.title);
    if (typeof body.company !== 'undefined') bodyCompany = JSON.parse(body.company);

    contact.save(function (err, result) {
      if (err) return res.status(400).json(err);
      res.status(200).json(result);
    });
  });
};

exports.delete = function (req, res, next) {
  _contactsModel2.default.remove({ _id: req.params.id }, function (err) {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
};

exports.patch = function (req, res, next) {
  _contactsModel2.default.findById(req.params.id, function (err, contact) {
    contact.favorite = req.body.favorite;
    if (req.body.name) contact.name = req.body.name;

    contact.save(function (err, result) {
      if (err) return res.json(400, err);
      res.status(200).json(result);
    });
  });
};

function handleError(res, err) {
  return res.status(500).json(err);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9jb250cm9sbGVyL2NvbnRhY3RzLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOlsiZXhwb3J0cyIsImNyZWF0ZSIsInJlcSIsInJlcyIsIm5leHQiLCJib2R5IiwiZmlsZSIsImF2YXRhciIsImZpbGVuYW1lIiwiYm9keVRpdGxlIiwiYm9keUNvbXBhbnkiLCJib2R5TmFtZSIsIkpTT04iLCJwYXJzZSIsIm5hbWUiLCJib2R5RW1haWwiLCJlbWFpbCIsImJvZHlQaG9uZSIsInBob25lIiwiYm9keUFkZHJlc3MiLCJhZGRyZXNzIiwidGl0bGUiLCJjb21wYW55IiwicGVyc29uIiwiY29udGFjdCIsInNhdmUiLCJlcnIiLCJoYW5kbGVFcnJvciIsInNlbmRTdGF0dXMiLCJzaG93IiwiY29udGFjdElkIiwicGFyYW1zIiwiaWQiLCJmaW5kQnlJZCIsInN0YXR1cyIsImpzb24iLCJpbmRleCIsInF1ZXJ5IiwiZmF2b3JpdGUiLCJCb29sZWFuIiwiZmluZCIsInNvcnQiLCJjb250YWN0cyIsImxlbmd0aCIsInVwZGF0ZSIsInJlc3VsdCIsImRlbGV0ZSIsInJlbW92ZSIsIl9pZCIsInBhdGNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQUEsUUFBUUMsTUFBUixHQUFpQixVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBV0MsSUFBWCxFQUFvQjtBQUNuQyxNQUFNQyxPQUFPSCxJQUFJRyxJQUFqQjtBQUNBLE1BQUlILElBQUlJLElBQVIsRUFBY0QsS0FBS0UsTUFBTCxHQUFjTCxJQUFJSSxJQUFKLENBQVNFLFFBQXZCOztBQUVkLE1BQUlDLFNBQUo7QUFDQSxNQUFJQyxXQUFKO0FBQ0EsTUFBSUMsV0FBV0MsS0FBS0MsS0FBTCxDQUFXUixLQUFLUyxJQUFoQixDQUFmO0FBQ0EsTUFBSUMsWUFBWUgsS0FBS0MsS0FBTCxDQUFXUixLQUFLVyxLQUFoQixDQUFoQjtBQUNBLE1BQUlDLFlBQVlMLEtBQUtDLEtBQUws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QUQsRUFBTUMsR0FBTixFQUFXQyxJQUFYLEVBQW9CO0FBQ2xDLDBCQUFRNkIsUUFBUixDQUFpQi9CLElBQUk2QixNQUFKLENBQVdDLEVBQTVCLEVBQWdDLFVBQVVOLEdBQVYsRUFBZUYsT0FBZixFQUF3QjtBQUN0REEsWUFBUWMsUUFBUixHQUFtQnBDLElBQUlHLElBQUosQ0FBU2lDLFFBQTVCO0FBQ0EsUUFBSXBDLElBQUlHLElBQUosQ0FBU1MsSUFBYixFQUFtQlUsUUFBUVYsSUFBUixHQUFlWixJQUFJRyxJQUFKLENBQVNTLElBQXhCOztBQUVuQlUsWUFBUUMsSUFBUixDQUFhLFVBQUNDLEdBQUQsRUFBTW1CLE1BQU4sRUFBaUI7QUFDNUIsVUFBSW5CLEdBQUosRUFBUyxPQUFPdkIsSUFBSWdDLElBQUosQ0FBUyxHQUFULEVBQWNULEdBQWQsQ0FBUDtBQUNUdkIsVUFBSStCLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQlUsTUFBckI7QUFDRCxLQUhEO0FBSUQsR0FSRDtBQVNELENBVkQ7O0FBWUEsU0FBU2xCLFdBQVQsQ0FBcUJ4QixHQUFyQixFQUEwQnVCLEdBQTFCLEVBQStCO0FBQzdCLFNBQU92QixJQUFJK0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCVCxHQUFyQixDQUFQO0FBQ0QiLCJmaWxlIjoiY29udGFjdHMuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBDb250YWN0IGZyb20gJy4uL21vZGVsL2NvbnRhY3RzLm1vZGVsLmpzJztcblxuZXhwb3J0cy5jcmVhdGUgPSAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgY29uc3QgYm9keSA9IHJlcS5ib2R5O1xuICBpZiAocmVxLmZpbGUpIGJvZHkuYXZhdGFyID0gcmVxLmZpbGUuZmlsZW5hbWU7XG5cbiAgdmFyIGJvZHlUaXRsZTtcbiAgdmFyIGJvZHlDb21wYW55O1xuICBsZXQgYm9keU5hbWUgPSBKU09OLnBhcnNlKGJvZHkubmFtZSk7XG4gIGxldCBib2R5RW1haWwgPSBKU09OLnBhcnNlKGJvZHkuZW1haWwpO1xuICBsZXQgYm9keVBob25lID0gSlNPTi5wYXJzZShib2R5LnBob25lKTtcbiAgbGV0IGJvZHlBZGRyZXNzID0gSlNPTi5wYXJzZShib2R5LmFkZHJlc3MpO1xuICBpZiAodHlwZW9mIGJvZHkudGl0bGUgIT09ICd1bmRlZmluZWQnKSBib2R5VGl0bGUgPSBKU09OLnBhcnNlKGJvZHkudGl0bGUpO1xuICBpZiAodHlwZW9mIGJvZHkuY29tcGFueSAhPT0gJ3VuZGVmaW5lZCcpIGJvZHlDb21wYW55ID0gSlNPTi5wYXJzZShib2R5LmNvbXBhbnkpO1xuXG4gIHZhciB7IGF2YXRhciB9ID0gYm9keTtcbiAgbGV0IHBlcnNvbiA9IHtcbiAgICBuYW1lOiBib2R5TmFtZSxcbiAgICB0aXRsZTogYm9keVRpdGxlLFxuICAgIGVtYWlsOiBib2R5RW1haWwsXG4gICAgcGhvbmU6IGJvZHlQaG9uZSxcbiAgICBhZGRyZXNzOiBib2R5QWRkcmVzcyxcbiAgICBjb21wYW55OiBib2R5Q29tcGFueSxcbiAgICBhdmF0YXIsXG4gIH07XG5cbiAgdmFyIGNvbnRhY3QgPSBuZXcgQ29udGFjdChwZXJzb24pO1xuXG4gIGNvbnRhY3Quc2F2ZShlcnIgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBoYW5kbGVFcnJvcihyZXMsIGVycik7XG4gICAgcmV0dXJuIHJlcy5zZW5kU3RhdHVzKDIwMCk7XG4gIH0pO1xuXG59O1xuXG5leHBvcnRzLnNob3cgPSAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgdmFyIGNvbnRhY3RJZCA9IHJlcS5wYXJhbXMuaWQ7XG4gIENvbnRhY3QuZmluZEJ5SWQoY29udGFjdElkLCBmdW5jdGlvbiAoZXJyLCBjb250YWN0KSB7XG4gICAgaWYgKGVycikgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKGVycik7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oY29udGFjdCk7XG4gIH0pO1xufTtcblxuZXhwb3J0cy5pbmRleCA9IChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICBsZXQgcXVlcnkgPSB7fTtcbiAgaWYgKHJlcS5xdWVyeS5mYXZvcml0ZSkgcXVlcnkuZmF2b3JpdGUgPSBCb29sZWFuKHJlcS5xdWVyeS5mYXZvcml0ZSk7XG5cbiAgQ29udGFjdC5maW5kKHF1ZXJ5LCBudWxsLCB7IHNvcnQ6IHsgbmFtZTogMSB9IH0sIGZ1bmN0aW9uIChlcnIsIGNvbnRhY3RzKSB7XG4gICAgaWYgKGVycikgcmV0dXJuIHJlcy5zZW5kU3RhdHVzKDQwNCk7XG4gICAgaWYgKGNvbnRhY3RzLmxlbmd0aCA9PSAwKSByZXR1cm4gcmVzLnNlbmRTdGF0dXMoNDA0KTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oY29udGFjdHMpO1xuICB9KTtcbn07XG5cbmV4cG9ydHMudXBkYXRlID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGxldCBib2R5ID0gcmVxLmJvZHk7XG4gIENvbnRhY3QuZmluZEJ5SWQocmVxLnBhcmFtcy5pZCwgZnVuY3Rpb24gKGVyciwgY29udGFjdCkge1xuICAgIGlmIChyZXEuZmlsZSkge1xuICAgICAgY29udGFjdC5hdmF0YXIgPSByZXEuZmlsZS5maWxlbmFtZTtcbiAgICB9XG5cbiAgICB2YXIgYm9keVRpdGxlO1xuICAgIHZhciBib2R5Q29tcGFueTtcbiAgICBjb250YWN0Lm5hbWUgPSBKU09OLnBhcnNlKGJvZHkubmFtZSk7XG4gICAgY29udGFjdC5lbWFpbCA9IEpTT04ucGFyc2UoYm9keS5lbWFpbCk7XG4gICAgY29udGFjdC5waG9uZSA9IEpTT04ucGFyc2UoYm9keS5waG9uZSk7XG4gICAgY29udGFjdC5hZGRyZXNzID0gSlNPTi5wYXJzZShib2R5LmFkZHJlc3MpO1xuICAgIGlmICh0eXBlb2YgYm9keS50aXRsZSAhPT0gJ3VuZGVmaW5lZCcpIGJvZHlUaXRsZSA9IEpTT04ucGFyc2UoYm9keS50aXRsZSk7XG4gICAgaWYgKHR5cGVvZiBib2R5LmNvbXBhbnkgIT09ICd1bmRlZmluZWQnKSBib2R5Q29tcGFueSA9IEpTT04ucGFyc2UoYm9keS5jb21wYW55KTtcblxuICAgIGNvbnRhY3Quc2F2ZSgoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbihlcnIpO1xuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnRzLmRlbGV0ZSA9IChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICBDb250YWN0LnJlbW92ZSh7IF9pZDogcmVxLnBhcmFtcy5pZCB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaWYgKGVycikgcmV0dXJuIHJlcy5zZW5kU3RhdHVzKDQwMCk7XG4gICAgcmVzLnNlbmRTdGF0dXMoMjAwKTtcbiAgfSk7XG59O1xuXG5leHBvcnRzLnBhdGNoID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIENvbnRhY3QuZmluZEJ5SWQocmVxLnBhcmFtcy5pZCwgZnVuY3Rpb24gKGVyciwgY29udGFjdCkge1xuICAgIGNvbnRhY3QuZmF2b3JpdGUgPSByZXEuYm9keS5mYXZvcml0ZTtcbiAgICBpZiAocmVxLmJvZHkubmFtZSkgY29udGFjdC5uYW1lID0gcmVxLmJvZHkubmFtZTtcblxuICAgIGNvbnRhY3Quc2F2ZSgoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZXMuanNvbig0MDAsIGVycik7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZUVycm9yKHJlcywgZXJyKSB7XG4gIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbihlcnIpO1xufVxuIl19