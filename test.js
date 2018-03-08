const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.json({
        'Hi': 'Hello'
    })
})

app.listen(5000);