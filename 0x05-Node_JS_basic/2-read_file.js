const fs = require('fs');

function countStudents (path) {
  try {
    const data = fs.readFileSync(path, 'utf8').trim().split('\n');
    let CS = 0;
    let SWE = 0;
    const csNames = [];
    const sweNames = [];

    for (let i = 1; i < data.length; i++) {
      const columns = data[i].split(',');

      if (columns[3] === 'CS') {
        CS++;
        csNames.push(columns[0]);
      } else if (columns[3] === 'SWE') {
        SWE++;
        sweNames.push(columns[0]);
      }
    }
    console.log(`Number of students: ${CS + SWE}`);
    console.log(`Number of students in CS: ${CS}. List: ${csNames.join(', ')}`);
    console.log(`Number of students in SWE: ${SWE}. List: ${sweNames.join(', ')}`);
  } catch (error) {
    console.error('Cannot load the database');
  }
}

module.exports = countStudents;
