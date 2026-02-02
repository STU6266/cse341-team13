const express = require('express');
const routes = express.Router();

const loansController = require('../controllers/loans');
const validation = require('../middleware/validate');

routes.get('/', async (req, res, next) => {
  try {
    await loansController.getAllLoans(req, res);
  } catch (error) {
    next(error);
  }
});

routes.get('/:id', async (req, res, next) => {
  try {
    await loansController.getLoanById(req, res);
  } catch (error) {
    next(error);
  }
});

routes.post('/', validation.saveLoan, async (req, res, next) => {
  try {
    await loansController.createLoan(req, res);
  } catch (error) {
    next(error);
  }
});

routes.put('/:id', validation.saveLoan, async (req, res, next) => {
  try {
    await loansController.updateLoan(req, res);
  } catch (error) {
    next(error);
  }
});

routes.delete('/:id', async (req, res, next) => {
  try {
    await loansController.deleteLoan(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
