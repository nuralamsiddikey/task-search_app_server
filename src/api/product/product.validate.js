import Joi from 'joi';

const productQuerySchema = Joi.object({
  query: Joi.string().allow("").required(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
  order: Joi.string().valid('asc', 'desc').optional(),
});
export const productQueryValidate = (value) => {
  return productQuerySchema.validate(value);
};
