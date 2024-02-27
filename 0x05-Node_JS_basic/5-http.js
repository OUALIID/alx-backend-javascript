const http = require("http");
const { readFile } = require("fs").promises;

const countStudents = async (filePath) => {
  try {
    const data = (await readFile(filePath, "utf8")).split("\n");
    let NUMBER_OF_STUDENTS = 0;
    const csNames = [];
    const sweNames = [];
    let CS = 0;
    let SWE = 0;

    for (let i = 1; i < data.length; i += 1) {
      const columns = data[i].split(",");

      if (columns.length >= 4) {
        if (columns[3] === "CS") {
          CS += 1;
          csNames.push(columns[0]);
        } else if (columns[3] === "SWE") {
          SWE += 1;
          sweNames.push(columns[0]);
        }
        NUMBER_OF_STUDENTS += 1;
      }
    }

    const output = `
Number of students: ${NUMBER_OF_STUDENTS}
Number of students in CS: ${CS}. List: ${csNames.join(", ")}
Number of students in SWE: ${SWE}. List: ${sweNames.join(", ")}`;

    return output;
  } catch (error) {
    console.error("Cannot load the database");
    throw new Error("Cannot load the database");
  }
};

const app = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  if (req.url === "/") {
    res.write("Hello Holberton School!");
    res.end();
  } else if (req.url === "/students") {
    try {
      res.write("This is the list of our students");
      const data = await countStudents("database.csv");
      res.end(data);
    } catch (error) {
      res.statusCode = 404;
      res.end(error.message);
    }
  }
});

app.listen(1245);
module.exports = app;
