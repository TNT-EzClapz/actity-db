const express = require('express')
const path = require("path")
const app = express()
const port = 3000
const fs = require("fs");

app.use(express.static(path.join(__dirname, 'public'))); //Serves resources from public folder

app.listen(port, () => {
  console.log(`activity database listening on port ${port}`)
})