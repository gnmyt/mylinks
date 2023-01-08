const Joi = require("joi");

// Redirects the user to the provided shortenUrl
module.exports.onClick = (id, accessId, metaData, controller) => controller.redirect(metaData.shortenUrl);

module.exports.info = {
    name: "Link kürzen",
    icon: "link",
    validationSchema: Joi.object({
        shortenUrl: Joi.string().max(2500).uri().required()
    }),
    meta: [{
        name: "Link-Einstellungen",
        type: "default",
        fields: {
            shortenUrl: {
                type: "text",
                name: "Zu kürzende URL",
                description: "Die zu kürzende (lange) URL"
            }
        }
    }]
}
