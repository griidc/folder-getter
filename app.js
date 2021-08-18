const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');


app.get('/getFolders/:user', (req, res) => {
  var user = req.params.user;

  fs.readdir(user + "/incoming/", 
    { withFileTypes: true },
    (err, files) => {
    console.log("\nCurrent directory files:");
    let dirArry = new Array;
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if(file.isDirectory()) {
          dirArry.push(file.name);
          console.log('pushed ' + file.name);
        }
      })
    }
    res.json([dirArry]);
  })
})

app.listen(port, () => {
  console.log(`Folder getter app listening at http://localhost:${port}`)
});
