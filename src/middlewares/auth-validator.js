const Ajv = require('ajv');

const ajv = new Ajv();
const authCreateSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false
}

const authLoginSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['email', 'password'],
  additionalProperties: false
}

const createValidator = ajv.compile(authCreateSchema);
const loginValidator = ajv.compile(authLoginSchema);

const createUserValidator = async (req, res, next) => {
  const valid = await createValidator(req.body);
  if (!valid) return res.status(400).send(createValidator.errors);
  
  return next();
} 

const loginUserValidator = async (req, res, next) => {
  const valid = await loginValidator(req.body);
  if (!valid) return res.status(400).send(loginValidator.errors); 

  return next();
}

module.exports = {
  createUserValidator,
  loginUserValidator,
}
