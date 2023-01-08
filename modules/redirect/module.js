const Joi = require("joi");

module.exports.onClick = (id, accessId, metaData, controller) => {
    controller.locals.meta.timer = controller.locals.meta.timer || 5;
    controller.render(__dirname + "/web/index");
}

module.exports.info = {
    name: "Nutzer weiterleiten",
    icon: "clock",
    validationSchema: Joi.object({
        shortenUrl: Joi.string().max(2500).uri().required(),
        timer: Joi.number().min(1).max(60)
    }),
    meta: [{
        name: "Link-Einstellungen",
        type: "default",
        fields: {
            shortenUrl: {
                type: "text",
                name: "Zu kürzende URL",
                description: "Die zu kürzende (lange) URL"
            },
            timer: {
                type: "number",
                name: "Weiterleitung in Sekunden",
                description: "Wann soll weitergeleitet werden?"
            }
        }
    }]
}
