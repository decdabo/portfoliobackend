const Ajv = require('ajv');

const ajv = new Ajv();
const imagePostSchema = {
  type: 'object',
  properties: {
    section: { type: 'string' },
    imageURL: { type: 'string' },
    publicID: { type: 'string' }
  },
  required: ['section'],
  additionalProperties: false
}
const imageDeleteSchema = {
  type: 'object',
  properties: {
    publicID: { type: 'string' }
  },
  required: ['publicID'],
  additionalProperties: false
}

const postValidator = ajv.compile(imagePostSchema);
const deleteValidator = ajv.compile(imageDeleteSchema);

const postImageValidator = async( req, res, next ) => {
  const valid = await postValidator( req.body );
  if (!valid) return res.status(400).send(postValidator.errors);

  return next();
}

const deleteImageValidator = async(req, res, next) => {
  const valid = await deleteValidator(req.body);
  if(!valid) return res.status(400).send(deleteValidator.errors);

  return next();
}

module.exports = {
  postImageValidator,
  deleteImageValidator
}
