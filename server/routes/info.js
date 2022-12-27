const app = require('express').Router();

app.get("/status", (req, res) => {
    res.json({message: "logged in"});
});

module.exports = app;