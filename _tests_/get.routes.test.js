const request = require('supertest');
const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const app = require('../server');

jest.setTimeout(30000);

function initDb() {
  return new Promise((resolve, reject) => {
    mongodb.initDb((err) => {
      if (err) reject(err);
      else resolve(mongodb.getDatabase());
    });
  });
}

describe('GET routes', () => {
  let client;
  let db;
  let bookId;
  let studentId;
  let schoolId;
  let loanId;

  beforeAll(async () => {
    client = await initDb();
    db = client.db();

    const book = await db.collection('books').insertOne({
      title: 'Test Book',
      author: 'Test Author',
      isbn: 'TEST-ISBN-001',
      category: 'Testing',
      publicationYear: 2020,
      totalCopies: 1,
      availableCopies: 1,
      shelfLocation: 'T-01'
    });
    bookId = book.insertedId.toString();

    const student = await db.collection('students').insertOne({
      studentNumber: 'S-TEST-001',
      firstName: 'Test',
      lastName: 'Student',
      email: 'test.student@example.com',
      department: 'Testing',
      isActive: true
    });
    studentId = student.insertedId.toString();

    const school = await db.collection('schools').insertOne({
      name: 'Test School',
      district: 'Test District',
      address: 'Test Address',
      contactEmail: 'test.school@example.com',
      phone: '0000000',
      website: 'https://example.com',
      establishedYear: 2000,
      libraryHours: '9-5',
      active: true
    });
    schoolId = school.insertedId.toString();

    const loan = await db.collection('loans').insertOne({
      studentId: new ObjectId().toString(),
      bookId: new ObjectId().toString(),
      loanDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      returnDate: null,
      status: 'checked_out'
    });
    loanId = loan.insertedId.toString();
  });

  afterAll(async () => {

    if (bookId) await db.collection('books').deleteOne({ _id: new ObjectId(bookId) });
    if (studentId) await db.collection('students').deleteOne({ _id: new ObjectId(studentId) });
    if (schoolId) await db.collection('schools').deleteOne({ _id: new ObjectId(schoolId) });
    if (loanId) await db.collection('loans').deleteOne({ _id: new ObjectId(loanId) });

    if (client) await client.close();
  });

/* BOOKS */
  describe('Books GET routes', () => {
    test('GET /books returns 200 + array', async () => {
      const res = await request(app).get('/books');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /books/:id returns 200 + object', async () => {
      const res = await request(app).get(`/books/${bookId}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.objectContaining({ _id: expect.any(String) }));
    });

    test('GET /books/:id invalid id returns 400', async () => {
      const res = await request(app).get('/books/not-a-valid-id');
      expect(res.status).toBe(400);
    });

    test('GET /books/:id valid but missing returns 404', async () => {
      const missingId = new ObjectId().toString();
      const res = await request(app).get(`/books/${missingId}`);
      expect(res.status).toBe(404);
    });
  });

  /* STUDENTS */
  describe('Students GET routes', () => {
    test('GET /students returns 200 + array', async () => {
      const res = await request(app).get('/students');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /students/:id returns 200 + object', async () => {
      const res = await request(app).get(`/students/${studentId}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.objectContaining({ _id: expect.any(String) }));
    });

    test('GET /students/:id invalid id returns 400', async () => {
      const res = await request(app).get('/students/not-a-valid-id');
      expect(res.status).toBe(400);
    });

    test('GET /students/:id valid but missing returns 404', async () => {
      const missingId = new ObjectId().toString();
      const res = await request(app).get(`/students/${missingId}`);
      expect(res.status).toBe(404);
    });
  });

  /* SCHOOLS */
  describe('Schools GET routes', () => {
    test('GET /schools returns 200 + array', async () => {
      const res = await request(app).get('/schools');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /schools/:id returns 200 + object', async () => {
      const res = await request(app).get(`/schools/${schoolId}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.objectContaining({ _id: expect.any(String) }));
    });

    test('GET /schools/:id invalid id returns 400', async () => {
      const res = await request(app).get('/schools/not-a-valid-id');
      expect(res.status).toBe(400);
    });

    test('GET /schools/:id valid but missing returns 404', async () => {
      const missingId = new ObjectId().toString();
      const res = await request(app).get(`/schools/${missingId}`);
      expect(res.status).toBe(404);
    });
  });

  
  /* LOANS */
  
  describe('Loans GET routes', () => {
    test('GET /loans returns 200 + array', async () => {
      const res = await request(app).get('/loans');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /loans/:id returns 200 + object', async () => {
      const res = await request(app).get(`/loans/${loanId}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.objectContaining({ _id: expect.any(String) }));
    });

    test('GET /loans/:id invalid id returns 400', async () => {
      const res = await request(app).get('/loans/not-a-valid-id');
      expect(res.status).toBe(400);
    });

    test('GET /loans/:id valid but missing returns 404', async () => {
      const missingId = new ObjectId().toString();
      const res = await request(app).get(`/loans/${missingId}`);
      expect(res.status).toBe(404);
    });
  });
});
