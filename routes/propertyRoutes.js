const express = require('express');
const { createProperty, getProperties, updateProperty, deleteProperty, likeProperty, interestInProperty } = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createProperty);
router.get('/', getProperties);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);
router.post('/like/:id', likeProperty);
router.post('/interest/:id', protect, interestInProperty);

module.exports = router;
