const express = require('express');
const { addQuantity, takeOutQuantity } = require('../controllers/StockMang.controller');

const router = express.Router();

router.route('/add').post(addQuantity)
router.route('/takeOut').post(takeOutQuantity)

module.exports = router;
