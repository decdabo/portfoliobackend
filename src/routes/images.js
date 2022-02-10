const { Router } = require('express');

const { postSectionImage, deleteSectionImage, getSectionImages } = require('../controllers/images');
const { postImageValidator, deleteImageValidator } = require('../middlewares/image-validator');

const router = Router();

router.post('/', postImageValidator, postSectionImage);
router.delete('/', deleteImageValidator, deleteSectionImage);
router.get('/', getSectionImages);

module.exports = router;
