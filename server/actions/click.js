const {getLinkByAccess, clickLink} = require("../controller/link");
const {getModule} = require("../controller/module");
const app = require('express').Router();

const sendNotFound = (res) => res.status(404).render(process.cwd() + "/server/templates/404");

app.all("/", async (req, res) => {
    res.locals.accessId = req.baseUrl.substring(1, req.baseUrl.length) || "home";
    const currentDomain = req.get('host') || "localhost";

    const link = await getLinkByAccess(res.locals.accessId, currentDomain);
    if (!link) return sendNotFound(res);
    if (!link.isEnabled) return sendNotFound(res);

    const module = getModule(link.type);
    if (!module) return sendNotFound(res);

    await clickLink(link.accessId, link.domainName);

    res.locals.meta = JSON.parse(link.meta);
    module.onClick(link.id, link.accessId, JSON.parse(link.meta), res, req);
});

module.exports = app;
