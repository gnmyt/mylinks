module.exports.validateSchema = (schema, object) => {
    const {error} = schema.validate(object, {errors: {wrap: {label: ''}}});

    return error ? error.details[0].message : undefined;
}