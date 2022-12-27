const {createLink, getLinkByAccess, listLinks, mapLink, getLinkById, deleteById} = require("../controller/link");
const {validateSchema} = require("../util/validate");
const {createLinkValidation, listLinksValidation} = require("../validations/link");
const {getModule} = require("../controller/module");
const app = require('express').Router();

app.get("/:domain/list", async (req, res) => {
    const error = await validateSchema(listLinksValidation, req.query);
    if (error) return res.status(400).json({message: error});

    let links = await listLinks(req.params.domain, req.query);
    if (!links) return res.status(400).json({message: "Could not use the provided filter"});

    res.json(links.map(link => mapLink(link)));
});

app.get("/:domain/:accessId", async (req, res) => {
    let link = await getLinkByAccess(req.params.accessId, req.params.domain);
    if (!link) return res.status(404).json({message: "This link does not exist"});

    res.json(mapLink(link));
});

app.get("/:id", async (req, res) => {
    let link = await getLinkById(req.params.id);
    if (!link) return res.status(404).json({message: "This link does not exist"});

    res.json(mapLink(link));
});

app.put("/", async (req, res) => {
    const error = await validateSchema(createLinkValidation, req.body);
    if (error) return res.status(400).json({message: error});

    const module = getModule(req.body.type);
    if (!module) return res.status(404).json({message: "The provided module does not exist"});

    if (req.body.accessId && await getLinkByAccess(req.body.accessId, req.body.domainName) !== null)
        return res.status(409).json({message: "The provided access id already exists"});

    const moduleError = await validateSchema(module.info.validationSchema, req.body.meta);
    if (moduleError) return res.status(400).json({message: moduleError});

    let link = await createLink({...req.body, creatorId: req.user.id});

    res.json({message: "Link created successfully", accessId: link.accessId})
});

app.delete("/:id", async (req, res) => {
    if (!await getLinkById(req.params.id)) return res.status(404).json({message: "This link does not exist"});

    await deleteById(req.params.id);
    res.json({message: "Link successfully deleted"});
});

module.exports = app;