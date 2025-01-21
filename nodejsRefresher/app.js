const fs = require("fs");

const userName = "Vivek";

fs.writeFile("user-data.txt", `Name: ${userName}`, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Wrote to file");
});
