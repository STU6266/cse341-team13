const express = require('express');
const routes = express.Router();

const studentsController = require('../controllers/students');
const validation = require('../middleware/validate');
const isAuthenticated = require('../middleware/authenticate');


routes.get('/', async (req, res, next) => {
  try {
    await studentsController.getAllStudents(req, res);
  } catch (error) {
    next(error);
  }
});


routes.get('/:id', async (req, res, next) => {
  try {
    await studentsController.getStudentById(req, res);
  } catch (error) {
    next(error);
  }
});


routes.post(
  '/',
  isAuthenticated,
  validation.saveStudent,
  async (req, res, next) => {
    try {
      await studentsController.createStudent(req, res);
    } catch (error) {
      next(error);
    }
  }
);


routes.put(
  '/:id',
  isAuthenticated,
  validation.saveStudent,
  async (req, res, next) => {
    try {
      await studentsController.updateStudent(req, res);
    } catch (error) {
      next(error);
    }
  }
);

routes.delete(
  '/:id',
  isAuthenticated,
  async (req, res, next) => {
    try {
      await studentsController.deleteStudent(req, res);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routes;
