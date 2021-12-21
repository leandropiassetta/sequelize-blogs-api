const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categoryIds: Joi.array().not().empty().required(),
});

module.exports = {
  postSchema,
};
