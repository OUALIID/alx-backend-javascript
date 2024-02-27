const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const data = await countStudents(process.argv[2]);
    res.send(`This is the list of our students\n${data}`);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
