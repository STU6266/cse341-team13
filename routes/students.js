const express = require('express');
const routes = express.Router();

const studentsController = require('../controllers/students');

routes.get('/', studentsController.getAllStudents);
routes.get('/:id', studentsController.getStudentById);
routes.post('/', studentsController.createStudent);
routes.put('/:id', studentsController.updateStudent);
routes.delete('/:id', studentsController.deleteStudent);

module.exports = routes;