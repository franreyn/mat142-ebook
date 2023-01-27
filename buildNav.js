const fs = require("fs");
const nodedir = require('node-dir');

const dirs = fs.readdirSync("src/chapters");

const chapters = dirs.map((dir) => { 
  const pages = nodedir.files(`src/chapters/${dir}`, {sync:true});
  let mapped = pages.map((page) => {
    const replaced = page.replace("src", "");
    return replaced;
  });
  return mapped;
});

try {
  fs.readdirSync("api");
} catch (e) {
  fs.mkdirSync("api");
}

// create JSON file of our navigation
fs.writeFile("api/toc.json", JSON.stringify(chapters), err => {
  if (err) return console.log(err);
});
