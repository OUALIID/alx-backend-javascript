const http = require('http');
const fs = require('fs');

function countStudents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Cannot load the database');
        reject(new Error('Cannot load the database'));
      } else {
        const rows = data.split('\n');
        let NUMBER_OF_STUDENTS = 0;
        const csNames = [];
        const sweNames = [];
        let CS = 0;
        let SWE = 0;

        for (let i = 1; i < rows.length; i += 1) {
          const columns = rows[i].split(',');

          if (columns.length >= 4) {
            if (columns[3] === 'CS') {
              CS += 1;
              csNames.push(columns[0]);
            } else if (columns[3] === 'SWE') {
              SWE += 1;
              sweNames.push(columns[0]);
            }
            NUMBER_OF_STUDENTS += 1;
          }
        }

        const responseBody = `This is the list of our students
Number of students: ${NUMBER_OF_STUDENTS}
Number of students in CS: ${CS}. List: ${csNames.join(', ')}
Number of students in SWE: ${SWE}. List: ${sweNames.join(', ')}`;
        resolve(responseBody);
      }
    });
  });
}

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(process.argv[2])
      .then((responseBody) => {
        res.end(responseBody);
      })
      .catch((error) => {
        res.end(`This is the list of our students\n${error.message}`);
      });
  }
});

app.listen(1245);
module.exports = app;
