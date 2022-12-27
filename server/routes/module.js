const {getModules} = require("../controller/module");
const app = require('express').Router();

app.get("/list", (req, res) => {
    const moduleInfo = getModules();
    const modules = {};

    for (let module in moduleInfo) {
        modules[module] = {...moduleInfo[module]["info"], validationSchema: undefined};
    }

    res.json(modules);
});

module.exports = app;