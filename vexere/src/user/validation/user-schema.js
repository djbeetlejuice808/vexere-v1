const Joi = require('joi');

const userJoiSchema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': 'Username is required',
        'string.empty': 'Username cannot be empty'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
        'string.empty': 'Password cannot be empty'
    }),
    role: Joi.string().valid('user', 'admin').default('user').messages({
        'any.only': 'Role must be either user or admin'
    })
});

module.exports = { userJoiSchema };
