const fs = require('fs');

function countStudents (filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8').trim().split('\n');
    let CS = 0; let SWE = 0;
    const csNames = [];
    const SWENames = [];

    for (let i = 1; i < data.length; i++) {
      const columns = data[i].split(',');

      if (columns[3] === 'CS') {
        CS++;
        csNames.push(columns[0]);
      } else if (columns[3] === 'SWE') {
        SWE++;
        SWENames.push(columns[0]);
      }
    }

    const totalStudents = CS + SWE;
    console.log(`Number of students: ${totalStudents}`);
    console.log(`Number of students in CS: ${CS}. List: ${csNames.join(', ')}`);
    console.log(`Number of students in SWE: ${SWE}. List: ${SWENames.join(', ')}`);
  } catch (error) {
    console.error('Cannot load the database');
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
