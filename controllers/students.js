const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllStudents = async (req, res) => {
    //#swagger.tags = ['Students']
    const result = await mongodb.getDatabase().db().collection('students').find();
    result.toArray().then((students) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(students);
  });
};

const getStudentById = async (req, res) => {
    //#swagger.tags = ['Students']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('students')
        .findOne({ _id: userId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const createStudent = async (req, res) => {
    //#swagger.tags = ['Students']  
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: new Date(req.body.birthday)
    };

    const result = await mongodb
        .getDatabase()
        .db()
        .collection('students')
        .insertOne(student);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(400).json({ message: 'Could not create student.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const updateStudent = async (req, res) => {
    //#swagger.tags = ['Students']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Enter a valid student ID to update student' });
    }
    const student_id = new ObjectId(req.params.id);
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: new Date(req.body.birthday)
    };

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('students')
        .replaceOne({ _id: student_id }, student);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the student.');
    }
}

const deleteStudent = async (req, res) => {
    //#swagger.tags = ['Students']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Enter a valid student ID to delete student' });
    }
    const student_id = new ObjectId(req.params.id);
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('students')
        .deleteOne({ _id: student_id });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the student.');
    }
}


module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};