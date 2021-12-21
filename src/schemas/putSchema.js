const Joi = require('joi');

const putSchema = Joi.object({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categories: Joi.array(),
  categoryIds: Joi.array(),
});

module.exports = {
  putSchema,
};
