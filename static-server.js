var express = require('express'),
    app = express(),
    __dirname = './';

app.use(express.static(__dirname));
console.info('Static server started! Port 1080');
process.send('done');
app.listen(1080);