const express = require('express');
const db = require('./config/database');
const path = require('path');

const app = express();
const port = process.env.PORT || 5217;

app.set('view engine', 'ejs');

// Default middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middlewares which require no authentication
app.use("/api/auth", require('./routes/auth'));

// Middlewares which require authentication
app.use("/api*", require('./middlewares/authenticate'));
app.use("/api/link", require('./routes/link'));
app.use("/api/info", require('./routes/info'));
app.use("/api/module", require('./routes/module'));
app.use("/api/user", require('./routes/user'));
app.use("/api/domains", require('./routes/domain'));

app.use("/api*", (req, res) => res.json({message: "Route not found"}));

if (process.env.NODE_ENV === 'production') {
    app.use("/admin", express.static(path.join(__dirname, "../admin/dist")));

    app.get("/admin*", (req, res) => res.sendFile(path.join(__dirname, '../admin/dist', 'index.html')));
} else {
    app.get("/admin*", (req, res) => res.redirect("/"));
}

app.use("*", require('./actions/click'));

const run = async () => {
    require('./controller/token').createToken();
    require('./controller/module').initialize();

    await db.sync({alter: true, force: false});

    app.listen(port, () => console.log(`Server listening on port ${port}`));
}

db.authenticate().then(() => {
   console.log("Successfully connected to the database");
   run();
}).catch(err => {
    console.error("Could not connect to the database: " + err.message);
    process.exit(111);
});
