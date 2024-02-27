const fs = require('fs');

function countStudents(filePath) {
  const data = fs.readFileSync(filePath, 'utf8').trim().split('\n');
  let CS = 0, SWE = 0;
  let csNames = [];
  let SWENames = [];

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
  console.log(`Number of students: ${CS + SWE}`)
  console.log(`Number of students in CS: ${CS}. List: ${csNames.join(', ')}`)
  console.log(`Number of students in SWE: ${SWE}. List: ${SWENames.join(', ')}`)
}

module.exports = countStudents;
