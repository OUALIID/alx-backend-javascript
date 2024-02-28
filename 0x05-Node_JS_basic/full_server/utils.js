const fs = require('fs').promises;

async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const studentsByField = {};

    const lines = data.trim().split('\n');
    const headers = lines.shift().split(',');

    for (const line of lines) {
      const values = line.split(',');
      const field = values[3];

      studentsByField[field] = studentsByField[field] || [];
      studentsByField[field].push(values[0]);
    }

    return studentsByField;
  } catch (error) {
    throw new Error('Cannot read the database');
  }
}

module.exports = { readDatabase };
