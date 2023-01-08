const fs = require('fs');
const path = require('path');
const moduleValidation = require('../validations/module');
const {validateSchema} = require("../util/validate");

const modules = {};

module.exports.initialize = () => fs.readdirSync(path.join(process.cwd(), 'modules'))
    .forEach(moduleName => {
        const currentModule = require(process.cwd() + `/modules/${moduleName}/module`);

        const moduleError = this.isValidModule(currentModule.info);
        if (moduleError) return console.log(`Could not load module ${moduleName}: ${moduleError.message}`);

        modules[moduleName] = currentModule;
        console.log(`Module ${moduleName} has been loaded`);
    });

module.exports.getModule = (name) => modules[name];

module.exports.getModules = () => modules;

module.exports.isValidModule = (module) => validateSchema(moduleValidation, module);
