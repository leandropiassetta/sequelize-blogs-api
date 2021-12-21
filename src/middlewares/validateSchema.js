const validateSchema = (schema) => (req, res, next) => {
  let error = false;
  console.log(req.headers);
  const isValid = schema.validate(req.body);

  if (isValid.error) {
    console.log(isValid.error);
    const detailsMessage = isValid.error.details[0].message;
    error = detailsMessage;
  }

  if (!error) {
    return next();
  }

  return res.status(400).json({ message: error });
};

module.exports = {
  validateSchema,
};
