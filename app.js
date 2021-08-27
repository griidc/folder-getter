const express = require('express');
const https = require('https');
const fs = require('fs');
const { Http2ServerRequest } = require('http2');

const port = 3000;
const sslMode = false;
const baseDir = '';

const privateKeyFile = '';
const sslCertFile = '';

const app = express();

app.get('/getFolders/:user', (req, res) => {
  const { user } = req.params;

  fs.readdir(`${baseDir}/${user}/incoming/`,
    { withFileTypes: true },
    (err, files) => {
      const dirArry = [];
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      } else {
        files.forEach((file) => {
          if (file.isDirectory()) {
            dirArry.push(file.name);
          }
        });
      }
      res.json([dirArry]);
    });
});

if (sslMode === true) {
  const privateKey = fs.readFileSync(privateKeyFile);
  const sslCertificate = fs.readFileSync(sslCertFile);

  https.createServer({
    key: privateKey,
    cert: sslCertificate
  }, app).listen(port);
  // eslint-disable-next-line no-console
  console.log(`Folder getter app listening at https://localhost:${port}`);
} else {
  app.listen(port, () => {
  });
  // eslint-disable-next-line no-console
  console.log(`Folder getter app listening at http://localhost:${port}`);
}
