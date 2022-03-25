const { response } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/users');
const Images = require('../models/image');

const createUser = async(req, res = response) => {
  const { name, email, password } = req.body;
  const initialImages = {
    email,
    images: {
      home: {
        cloudinaryId: "",
        imageURL: ""
      },
      about: {
        cloudinaryId: "",
        imageURL: ""
      },
      skills: {
        cloudinaryId: "",
        imageURL: ""
      },
      contact: {
        cloudinaryId: "",
        imageURL: ""
      }
    }
  }
  try {
    const userValidation = await User.findOne({ email });
    if( email.length < 5) {
      return res.status(400).json({
        status: false,
        msg: 'Send a valid email'
      });
    }
    if(userValidation){
      return res.status(400).json({
        status: false,
        msg: 'User already exists'
      });
    }
    if(email === process.env.ADMIN_EMAIL){
      const userData = {
        name,
        email,
        password,
        access: true
      }
      const user = new User(userData);
      const images = new Images(initialImages);
      
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);
  
      await user.save();
      await images.save();
  
      return res.status(201).json({
        status: true,
        msg: 'Registered!',
        name,
        email,
        access: true
      });
    }
    const userData = {
      name,
      email,
      password,
      access: false
    }
    const user = new User(userData);
    const images = new Images(initialImages);

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    await images.save();

    return res.status(201).json({
      status: true,
      msg: 'Registered!',
      name,
      email,
      access: false
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
      email: userValidation.email,
      access: userValidation.access
    });

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  loginUser,
}
