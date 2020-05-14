const express = require('express');

const app = express();

app.listen(4000,() => {
    console.log("App is running at port 4000")
})

app.get('/',(req,res) => {
    res.send("Get request")
})