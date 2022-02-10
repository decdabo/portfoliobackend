const { response } = require('express');
const { find } = require('../models/image');
const Image = require('../models/image');

const postSectionImage = async(req, res = response) => {
  try {
    const { section, imageURL, publicID } = req.body;
    const validImage = await Image.findOne({ publicID });
    if(validImage) {
      return res.status(400).json({ 
        ok: false, 
        msg:'This image already exists' 
      });
    }
  
    const image = new Image(req.body);
    await image.save();
    
    res.status(200).json({
      ok: true,
      data: {
        section,
        imageURL,
        publicID
      }
    });
  } catch (error) {
    console.log(error)
  }
}

const deleteSectionImage = async(req, res = response) => {
  try {
    const { publicID } = req.body;
    const image = await Image.findOne({ publicID });
    if(!image) {
      return res.status(400).json({ 
        ok: false,
        msg: "This image doesn't exists", 
      });
    }

    await Image.deleteOne({ publicID });
    
    return res.status(200).json({
      ok: true,
      msg: 'Image delete!',
    })
  } catch (error) {
    console.log(error)
  }
}

const getSectionImages = async(req, res = response) => {
  if (req.body.section) {
    try {
      const { section } = req.body;
      const image = await Image.find({ section });

      if(!image) return res.status(400).json({
        ok: false,
        msg: 'No images in this section yet'
      })

      return res.status(200).json({
        ok: true,
        data: image
      });
    } catch (error) {
      console.log(error)
    }
  }else {
    try {
      const images = await Image.find();
      if(!images) return res.status(400).json({
        ok: false,
        msg: 'No images yet'
      });

      return res.status(200).json({
        ok: true,
        data: images
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = {
  postSectionImage,
  deleteSectionImage,
  getSectionImages
}
