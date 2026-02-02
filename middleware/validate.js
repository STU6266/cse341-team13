const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    author: 'required|string',
    isbn: 'required|string',
    category: 'required|string',
    publicationYear: 'required|numeric',
    totalCopies: 'required|numeric',
    availableCopies: 'required|numeric',
    shelfLocation: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
const saveStudent = (req, res, next) => {
  const validationRule = {
    studentNumber: 'required|string',
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    department: 'required|string',
    isActive: 'required|boolean'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    next();
  });
};

const saveSchool = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    district: 'string',
    address: 'required|string',
    contactEmail: 'required|email',
    phone: 'string',
    website: 'string',
    establishedYear: 'numeric',
    libraryHours: 'string',
    active: 'boolean'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    next();
  });
};

const saveLoan = (req, res, next) => {
  const validationRule = {
    studentId: 'required|string',
    bookId: 'required|string',
    loanDate: 'required|date',
    dueDate: 'required|date',
    returnDate: 'date',
    status: 'string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    next();
  });
};
module.exports = {
  saveBook,
  saveStudent,
  saveSchool,
  saveLoan
};
