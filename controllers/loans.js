const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllLoans = async (req, res) => {
  //#swagger.tags = ['Loans']
  const result = await mongodb.getDatabase().db().collection('loans').find();
  result.toArray().then((loans) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(loans);
  });
};

const getLoanById = async (req, res) => {
  //#swagger.tags = ['Loans']
  const loanId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('loans')
    .findOne({ _id: loanId });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

const createLoan = async (req, res) => {
  //#swagger.tags = ['Loans']
  const loan = {
    studentId: req.body.studentId,
    bookId: req.body.bookId,
    loanDate: new Date(req.body.loanDate),
    dueDate: new Date(req.body.dueDate),
    returnDate: req.body.returnDate ? new Date(req.body.returnDate) : null,
    status: req.body.status
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('loans')
    .insertOne(loan);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(400).json({ message: 'Could not create loan.' });
  }
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

const updateLoan = async (req, res) => {
  //#swagger.tags = ['Loans']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Enter a valid loan ID to update loan' });
  }
  const loan_id = new ObjectId(req.params.id);
  const loan = {
    studentId: req.body.studentId,
    bookId: req.body.bookId,
    loanDate: new Date(req.body.loanDate),
    dueDate: new Date(req.body.dueDate),
    returnDate: req.body.returnDate ? new Date(req.body.returnDate) : null,
    status: req.body.status
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection('loans')
    .replaceOne({ _id: loan_id }, loan);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the loan.');
  }
};

const deleteLoan = async (req, res) => {
  //#swagger.tags = ['Loans']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Enter a valid loan ID to delete loan' });
  }
  const loan_id = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('loans')
    .deleteOne({ _id: loan_id });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the loan.');
  }
};

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan
};
