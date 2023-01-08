const Joi = require("joi");
const {getLinkById} = require("../../server/controller/link");

module.exports.onClick = async (id, accessId, metaData, controller, request) => {
  if (request?.body?.password === metaData.password)
    return controller.redirect(metaData.shortenUrl)

  controller.locals.meta.title = (await getLinkById(id)).title;
  controller.render(__dirname + "/web/password");
}

module.exports.info = {
  name: "Link mit Passwort",
  icon: "key",
  validationSchema: Joi.object({
    shortenUrl: Joi.string().max(2500).uri().required(),
    password: Joi.string().min(5).max(50).required()
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
      password: {
        type: "password",
        name: "Passwort",
        description: "Das gesicherte Passwort"
      }
    }
  }]
}
