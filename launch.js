const express = require('express'),
    path = require('path');

const app = express();

app.use(express.static('./dist/quick-app'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname,'/dist/quick-app/index.html'));
});

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});