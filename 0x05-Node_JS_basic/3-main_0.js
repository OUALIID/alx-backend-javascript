const countStudents = require('./3-read_file_async');
console.log("After!");

countStudents("database.csv")
    .then(() => {
        console.log("Done!");
    })
        .catch((error) => {
        console.log(error);
    });
