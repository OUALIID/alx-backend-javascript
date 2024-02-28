const { readDatabase } = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const studentData = await readDatabase();
      const responseBody = Object.entries(studentData)
        .map(([field, students]) => `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`)
        .join('\n');
      res.status(200).send(`This is the list of our students\n${responseBody}`);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    try {
      const studentData = await readDatabase();
      const { major } = req.params;
      if (!studentData[major]) {
        res.status(500).send('Major parameter must be CS or SWE');
      } else {
        res.status(200).send(`List: ${studentData[major].join(', ')}`);
      }
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;

