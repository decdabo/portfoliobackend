const Ajv = require('ajv');

const ajv = new Ajv();
const imagePostSchema = {
  type: 'object',
  properties: {
      email: { type: 'string' },
      image: { type: 'string' },
  },
  required: ['email', 'image'],
  additionalProperties: false
}

const postValidator = ajv.compile(imagePostSchema);

const postImageValidator = async( req, res, next ) => {
  const valid = await postValidator( req.body );
  if (!valid) return res.status(400).send(postValidator.errors);

  return next();
}

module.exports = {
  postImageValidator,
}
