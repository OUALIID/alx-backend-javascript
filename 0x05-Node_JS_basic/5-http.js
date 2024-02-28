const http = require('http');
const fs = require('fs');

function countStudents(filePath) {
  return new Promise((resolve, reject) => {
    try {
      const data = fs.readFileSync(filePath, 'utf8').split('\n');
      let NUMBER_OF_STUDENTS = 0;
      const csNames = [];
      const sweNames = [];
      let CS = 0;
      let SWE = 0;

      for (let i = 1; i < data.length; i += 1) {
        const columns = data[i].split(',');

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

      const output = [];
      output.push(`Number of students: ${NUMBER_OF_STUDENTS}`);
      output.push(`Number of students in CS: ${CS}. List: ${csNames.join(', ')}`);
      output.push(`Number of students in SWE: ${SWE}. List: ${sweNames.join(', ')}`);

      resolve(output);
    } catch (error) {
      console.error('Cannot load the database');
      reject(new Error('Cannot load the database'));
    }
  });
}

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  }
  if (req.url === '/students') {
    countStudents('database.csv')
      .then((data) => {
        res.write('This is the list of our students\n');
        res.end(data.join('\n'));
      })
      .catch((err) => {
        res.statusCode = 404;
        res.end(err.message);
      });
  }
});

app.listen(1245);
module.exports = app;
