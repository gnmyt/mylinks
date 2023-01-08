const Joi = require("joi");
const {getLinkById} = require("../../server/controller/link");

module.exports.onClick = async (id, accessId, metaData, controller) => {
  controller.locals.meta.title = (await getLinkById(id)).title;
  controller.render(__dirname + "/web/index");
}

module.exports.info = {
    name: "Link mit Text",
    icon: "clipboard",
    validationSchema: Joi.object({
      content: Joi.string().required(),
    }),
    meta: [{
        name: "Link-Einstellungen",
        type: "default",
        fields: {
          content: {
                type: "text",
                name: "Dein Text",
                description: "Der anzuzeigende Text"
            }
        }
    }]
}
