const fs = require("fs");
const dir = require('node-dir');

// display contents of files in this directory
dir.readFiles("src/chapters",
  // get content of files
  function(err, content, next) {
      if (err) throw err;
      next();
  },
  // get file names
  function(err, files){
      if (err) throw err;

      // if `dist` folder does not exist create it
      try {
        fs.readdirSync("api");
      } catch (e) {
        fs.mkdirSync("api");
      }

      // map through file names and remove `dist/`
      let paths = files.map((path) => {
        let replaced = path.replace("dist", "");
        return replaced;
      });

      // create JSON file of our navigation
      fs.writeFile("api/toc.json", JSON.stringify(paths), err => {
        if (err) return console.log(err);
      });
      
});

