const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(request, response) {
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
        response.status(200).send(string);
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (major === 'CS' || major === 'SWE') {
      const path = process.argv[2];
      readDatabase(path)
        .then((result) => {
          const listOfStudent = result[major].join(', ');
          const string = `List: ${listOfStudent}`;
          response.status(200).send(string);
        })
        .catch(() => response.status(500).send('Cannot load the database'));
    } else {
      response.status(500).send('Major parameter must be CS or SWE');
    }
  }
}

module.exports = StudentsController;
