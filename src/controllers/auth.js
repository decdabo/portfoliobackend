const { response } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/users');

const createUser = async(req, res = response) => {
  try {
    const { name, email, password } = req.body;
    const userValidation = await User.findOne({ email });
    if(email !== process.env.ADMIN_EMAIL){
      return res.status(400).json({
        status: false,
        msg: 'Email not authorized'
      });
    }
    if(userValidation){
      return res.status(400).json({
        status: false,
        msg: 'User already exists'
      });
    }

    const user = new User(req.body);

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    return res.status(201).json({
      status: true,
      msg: 'Registered!',
      name,
      email      
    });
  } catch (error) {
    console.log(error)
  } 
}

const loginUser = async(req, res = response) => {
  try {
    const { email, password } = req.body;
    const userValidation = await User.findOne({ email });
    if(!userValidation){
      return res.status(400).json({
        status: false,
        msg: 'Email or password wrong'
      });
    };
    
    const passwordValidator = bcrypt.compareSync(password, userValidation.password);
    if (!passwordValidator) return res.status(400).json({ ok: false, msg: 'Email or password wrong' });

    return res.status(200).json({
      ok: true,
      msg: 'Logged!',
      name: userValidation.name,
      email: userValidation.email
    });

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  loginUser,
}
