class StudentsController {
  static getAllStudents(req, res) {
    const studentsPerField = {
      CS: ['Johann', 'Arielle', 'Jonathan', 'Emmanuel', 'Guillaume', 'Katie'],
      SWE: ['Guillaume', 'Joseph', 'Paul', 'Tommy'],
    };

    const responseBody = Object.entries(studentsPerField)
      .map(([field, students]) => `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`)
      .join('\n');
    res.status(200).send(`This is the list of our students\n${responseBody}`);
  }

  static getAllStudentsByMajor(req, res) {
    const students = {
      CS: ['Johann', 'Arielle', 'Jonathan', 'Emmanuel', 'Guillaume', 'Katie'],
      SWE: ['Guillaume', 'Joseph', 'Paul', 'Tommy'],
    };

    const { major } = req.params;
    if (!students[major]) {
      res.status(500).send('Major parameter must be CS or SWE');
    } else {
      res.status(200).send(`List: ${students[major].join(', ')}`);
    }
  }
}

module.exports = StudentsController;
