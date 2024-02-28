const http = require('http');
const fs = require('fs');

function countStudents(filePath) {
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

    const responseData = {
      NUMBER_OF_STUDENTS,
      csNames,
      sweNames
    };

    return responseData;
  } catch (error) {
    console.error('Cannot load the database');
    throw new Error('Cannot load the database');
  }
}

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  }
  
  if (req.url === '/students') {
    res.write('This is the list of our students\n');
    try {
      const data = countStudents('database.csv');
      res.write(`Number of students: ${data.NUMBER_OF_STUDENTS}\n`);
      res.write(`Number of students in CS: ${data.csNames.length}. List: ${data.csNames.join(', ')}\n`);
      res.write(`Number of students in SWE: ${data.sweNames.length}. List: ${data.sweNames.join(', ')}`);
      res.end();
    } catch (error) {
      res.statusCode = 404;
      res.end(error.message);
    }
  }
});

app.listen(1245);
module.exports = app;
