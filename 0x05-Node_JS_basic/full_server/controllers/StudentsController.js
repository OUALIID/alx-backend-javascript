const readDatabase = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const path = process.argv[2];
      const result = await readDatabase(path);
      let string = 'This is the list of our students';
      Object.entries(result).forEach(([key, value]) => {
        string += `\nNumber of students in ${key}: ${value.length}. List: ${value.join(', ')}`;
      });
      res.status(200).send(string);
    } catch {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    const validMajors = ['CS', 'SWE'];
    if (!validMajors.includes(major)) {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    try {
      const path = process.argv[2];
      const result = await readDatabase(path);
      const string = `List: ${result[major].join(', ')}`;
      res.status(200).send(string);
    } catch {
      res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
