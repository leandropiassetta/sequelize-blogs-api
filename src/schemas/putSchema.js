const Joi = require('joi');

const putSchema = Joi.object({
  title: Joi.string().not().empty().required(),
  content: Joi.string().not().empty().required(),
  categoryId: Joi.array(),
  categories: Joi.array(),
});

module.exports = {
  putSchema,
};
