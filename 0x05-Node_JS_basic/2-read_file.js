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
    console.log(`Number of students: ${NUMBER_OF_STUDENTS}`);
    console.log(`Number of students in CS: ${CS}. List: ${csNames.join(', ')}`);
    console.log(`Number of students in SWE: ${SWE}. List: ${sweNames.join(', ')}`);
  } catch (error) {
    console.error('Cannot load the database');
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
