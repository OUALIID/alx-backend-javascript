const http = require('http');
const { readFile } = require('fs').promises;

const countStudents = async (filePath) => {
  try {
    const fields = new Map();
    let NumStd = 0;
    const globalText = [];
    let contents = await readFile(filePath, 'utf8');
    contents = contents.split('\n');
    for (let i = 0; i < contents.length; i += 1) {
      if (
        contents[i].length > 0
        && contents[i] !== 'firstname,lastname,age,field'
      ) {
        const data = contents[i].split(',');
        if (fields.has(data[3]) === false) {
          fields.set(data[3], []);
        }
        fields.get(data[3]).push(data[0]);
        NumStd += 1;
      }
    }
    globalText.push(`Number of students: ${NumStd}`);
    for (const [index, field] of fields.entries()) {
      let text = field.join(', ');
      text = `Number of students in ${index}: ${field.length}. List: ${text}`;
      globalText.push(text);
    }
    return globalText;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  } else if (req.url === '/students') {
    try {
      const data = await countStudents('database.csv');
      res.write('This is the list of our students\n');
      res.end(data.join('\n'));
    } catch (error) {
      res.statusCode = 404;
      res.end(error.message);
    }
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
