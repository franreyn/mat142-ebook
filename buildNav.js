const fs = require("fs");
const dir = require('node-dir');

// display contents of files in this directory
dir.readFiles("dist/chapters",
  function(err, content, next) {
      if (err) throw err;
      next();
  },
  function(err, files){
      if (err) throw err;

      // if `dist` folder does not exist create it
      try {
        fs.readdirSync("dist/api");
      } catch (e) {
        fs.mkdirSync("dist/api");
      }

      // create JSON file of our navigation
      fs.writeFile("dist/api/nav.json", JSON.stringify(files), err => {
        if (err) return console.log(err);
      });
      
});

