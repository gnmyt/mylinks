const fs = require('fs');
const path = require('path');

const modules = {};

module.exports.initialize = () => fs.readdirSync(path.join(process.cwd(), 'modules'))
    .forEach(moduleName => {
        modules[moduleName] = require(process.cwd() + `/modules/${moduleName}/module`);
        console.log(`Module ${moduleName} has been loaded`);
    });

module.exports.getModule = (name) => modules[name];

module.exports.getModules = () => modules;