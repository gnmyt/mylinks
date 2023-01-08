const {getDomains, createDomain, deleteDomain} = require("../controller/domain");
const {validateSchema} = require("../util/validate");
const {domainValidation} = require("../validations/domain");
const app = require('express').Router();

app.get("/", async (req, res) => {
    res.json(await getDomains());
});

app.put("/", async (req, res) => {
    const error = await validateSchema(domainValidation, req.body);
    if (error) return res.status(400).json(error);

    const domain = await createDomain(req.body.domainName);
    if (domain === null) return res.status(409).json({message: "This domain already exists"});

    res.json({message: "Domain successfully added"});
});

app.delete("/:domain", async (req, res) => {
    const domain = await deleteDomain(req.params.domain);
    if (domain === null) return res.status(404).json({message: "The provided domain does not exist"});

    res.json({message: "The provided domain has been successfully removed"});
});

module.exports = app;
