const { Router } = require('express');

const { postSectionImage, getSectionImages, getAllImages } = require('../controllers/images');
const { postImageValidator } = require('../middlewares/image-validator');

const router = Router();

router.post('/:section', postImageValidator, postSectionImage);
router.get('/', getAllImages);
router.get('/:email', getSectionImages);

module.exports = router;
