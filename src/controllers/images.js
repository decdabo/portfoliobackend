const { response } = require('express');
const Image = require('../models/image');
const cloudinary = require('cloudinary').v2;

const postSectionImage = async(req, res = response) => {
  const { section } = req.params
  const { email, image } = req.body;
  try {
    const data = await Image.findOne({ email });

    if(!data) return res.status(403).json({ ok: false, msg:'User not exists' });
    if( data.images[section].cloudinaryId.length ) {
      await cloudinary.uploader.destroy(data.images[section].cloudinaryId);
    }

    const { public_id, url } = await cloudinary.uploader.upload(image.imageURL);

    const imageData = {
      cloudinaryId: public_id,
      imageURL: url
    }

    switch (section) {
      case "home":
        data.overwrite({ 
          email: data.email ,
          images: { 
            home: imageData,
            about: data.images.about,
            skills: data.images.skills,
            contact: data.images.contact,
         }})
        await data.save();
        
        return res.status(200).json({
          ok:true,
          data
        })
      case "about":
        data.overwrite({ 
          email: data.email ,
          images: { 
            home: data.images.home,
            about: imageData,
            skills: data.images.skills,
            contact: data.images.contact,
         }})
        await data.save();
        
        return res.status(200).json({
          ok:true,
          data
        })
      case "skills":
        data.overwrite({ 
          email: data.email ,
          images: { 
            home: data.images.home,
            about: data.images.about,
            skills: imageData,
            contact: data.images.contact,
         }})
        await data.save();
        
        return res.status(200).json({
          ok:true,
          data
        })
      case "contact":
        data.overwrite({ 
          email: data.email ,
          images: { 
            home: data.images.home,
            about: data.images.about,
            skills: data.images.skills,
            contact: imageData,
         }})
        await data.save();
        
        return res.status(200).json({
          ok:true,
          data
        })
      default:
        return res.status(400).json({ ok: false, msg: 'This section not exists' });
    }
    
  } catch (error) {
    console.log(error)
  }
}

const getSectionImages = async (req, res = response) => {
  try {
    const param = req.params.email 
    const validEmail = await Image.findOne({ email: param });
    
    if (!validEmail) return res.status(200).json({ ok: false, msg: "This user with this email doesn't exists" })
    
    return res.status(200).json({
      ok: true,
      data: validEmail,
    })
  } catch (error) {
    console.log(error)
  }
}

const getAllImages = async (_, res = response) => {
  try {
    const images = await Image.findOne({ email: process.env.ADMIN_EMAIL });
    if (!images) return res.json({ ok: false, msg: 'No user with data' })
  
    return res.json({
      ok: true,
      data: images.images
    })
  } catch (error) {
    console.log
  }
}

module.exports = {
  postSectionImage,
  getSectionImages,
  getAllImages
}
