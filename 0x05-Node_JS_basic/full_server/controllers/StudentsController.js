const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(req, res) {
    const path = process.argv[2];
    readDatabase(path)
      .then((result) => {
        const object = Object.keys(result).sort();
        let string = 'This is the list of our students';
        for (const key of object) {
          const numberOfStudents = result[key].length;
          const lineOfNames = result[key].join(', ');
          string += `\nNumber of students in ${key}: ${numberOfStudents}. List: ${lineOfNames}`;
        }
        res.status(200).send(string);
      })
      .catch(() => res.status(500).send('Cannot load the database'));
  }

  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (major === 'CS' || major === 'SWE') {
      const path = process.argv[2];
      readDatabase(path)
        .then((result) => {
          const listOfStudent = result[major].join(', ');
          const string = `List: ${listOfStudent}`;
          res.status(200).send(string);
        })
        .catch(() => res.status(500).send('Cannot load the database'));
    } else {
      res.status(500).send('Major parameter must be CS or SWE');
    }
  }
}

module.exports = StudentsController;
