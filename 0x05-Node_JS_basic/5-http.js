const http = require('http');
const { readFile } = require('fs').promises;

const countStudents = async () => {
  try {
    const fields = new Map();
    let NumStd = 0;
    const globalText = [];
    let contents = await readFile(process.argv[2], 'utf8');
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
const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  }
  if (req.url === '/students') {
    res.write('This is the list of our students\n');
    countStudents(res)
      .then((data) => {
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
