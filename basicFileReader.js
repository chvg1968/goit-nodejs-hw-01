const fs = require("fs").promises;

fs.readFile("./textfile.txt").then((data) => {
  console.log(data.toString());
});
