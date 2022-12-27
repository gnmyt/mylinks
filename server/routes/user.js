const app = require('express').Router();

app.get("/me", (req, res) => {
    res.json({id: req.user.id, username: req.user.username, email: req.user.email, rank: req.user.rank});
});

// TODO: Create user, delete user, get user by id routes

module.exports = app;