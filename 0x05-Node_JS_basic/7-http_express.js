const express = require('express');
const { readFile } = require('fs').promises;

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});
app.get('/students', async (req, res) => {
  const fields = new Map();
  let NumStd = 0;
  const globalText = ['This is the list of our students'];
  try {
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
    res.status(200).send(globalText.join('\n'));
  } catch (error) {
    globalText.push('Cannot load the database');
    res.status(404).send(globalText.join('\n'));
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;