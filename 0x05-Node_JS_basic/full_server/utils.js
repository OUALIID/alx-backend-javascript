const fs = require('fs');

const readDatabase = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (error, response) => {
    if (error) reject(new Error('Cannot load the database'));
    else {
      const data = response.split('\n').map((line) => line.split(',')).slice(1, -1);
      const csStudentsList = [];
      const sweStudentsList = [];
      for (const list of data) {
        if (list[3] === 'CS') {
          csStudentsList.push(list[0]);
        } else {
          sweStudentsList.push(list[0]);
        }
      }
      const allStudent = { CS: csStudentsList, SWE: sweStudentsList };
      resolve(allStudent);
    }
  });
});

module.exports = readDatabase;
