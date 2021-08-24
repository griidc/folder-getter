const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.get('/getFolders/:user', (req, res) => {
  const {user} = req.params;

  fs.readdir(`${user}/incoming/`,
    { withFileTypes: true },
    (err, files) => {
      // eslint-disable-next-line no-console
      console.log('\nCurrent directory files:');
      const dirArry = new Array;
      if (err)
        // eslint-disable-next-line nonblock-statement-body-position
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
