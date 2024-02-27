const fs = require('fs');

function countStudents (filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8').trim().split('\n');
    let CS = 0;
    let SWE = 0;
    let all = 0;
    const csNames = [];
    const sweNames = [];

    for (let i = 1; i < data.length; i++) {
      const columns = data[i].split(',');

      if (columns.length >= 4) {
        if (columns[3] === 'CS') {
          CS++;
          csNames.push(columns[0]);
        } else if (columns[3] === 'SWE') {
          SWE++;
          sweNames.push(columns[0]);
        }
        all++;
      }
    }
    console.log(`Number of students: ${all}`);
    console.log(`Number of students in CS: ${CS}. List: ${csNames.join(', ')}`);
    console.log(`Number of students in SWE: ${SWE}. List: ${sweNames.join(', ')}`);
  } catch (error) {
    // If the database is not available, throw an error
    console.error('Cannot load the database');
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
