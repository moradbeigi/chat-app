const path = require('path');
const express = require('express');
const PubilcPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4000;

var app = express();

app.use(express.static(PubilcPath));


app.listen(port, ()=>{
    console.log(`active on port ${port}`);
})