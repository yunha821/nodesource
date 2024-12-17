import fs from "fs";

fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }

  console.log(data);
  console.log(data.toString());
});
