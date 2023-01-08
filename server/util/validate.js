module.exports.validateSchema = (schema, object) => {
    const {error} = schema.validate(object, {errors: {wrap: {label: ''}}});

    return error ? {message: error.details[0].message, field: error.details[0].path[0]}: undefined;
}
