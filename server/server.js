const express = require('express');

const app = express()

const port = 8000;

app.use(express.static('./dist'));

app.listen(port, () => console.log('now listening on port ' + port))