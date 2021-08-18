const express = require('express')
const app = express()
const port = 3000

app.get('/getFolders/:user', (req, res) => {
  var user = req.params.user;
  res.json({ "hello": user });
})

app.listen(port, () => {
  console.log(`Folder getter app listening at http://localhost:${port}`)
})