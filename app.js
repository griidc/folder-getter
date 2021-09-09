import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'https';
import { readdir, readFileSync } from 'fs';

dotenv.config();

const app = express();

const baseDir = process.env.BASE_DIR;

app.get('/get-folders/:user', (req, res) => {
  const { user } = req.params;

  readdir(`${baseDir}/${user}/incoming/`,
    { withFileTypes: true },
    (err, files) => {
      const dirArry = [];
      if (err) {
        res.status(400).json({ code: 400, message: 'no such file or directory' });
      } else {
        files.forEach((file) => {
          if (file.isDirectory()) {
            dirArry.push([ file.name, baseDir + '/' + user + '/incoming' + '/' + file.name ]);
          }
        });

        res.json(dirArry);
      };
  });
});

const port = process.env.PORT;

if (process.env.SSL_MODE === 'true') {
  const privateKey = readFileSync(process.env.SSL_PRIVATE_KEY);
  const sslCertificate = readFileSync(process.env.SSL_CERTIFICATE);

  createServer({
    key: privateKey,
    cert: sslCertificate,
  }, app).listen(port);
  // eslint-disable-next-line no-console
  console.log(`Folder getter app listening at https://localhost:${port}`);
} else {
  app.listen(port, () => {
  });
  // eslint-disable-next-line no-console
  console.log(`Folder getter app listening at http://localhost:${port}`);
}
