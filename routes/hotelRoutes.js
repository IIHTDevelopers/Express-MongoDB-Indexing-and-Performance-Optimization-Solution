const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

// POST route to create a hotel
router.post('/hotels', hotelController.createHotel);

// GET routes to test query performance with different indexes
router.get('/hotels/test-single-field', hotelController.testSingleFieldIndex);
router.get('/hotels/test-compound', hotelController.testCompoundIndex);
router.get('/hotels/test-text', hotelController.testTextIndex);
router.get('/hotels/test-dynamic', hotelController.testDynamicIndex);

module.exports = router;
