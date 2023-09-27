const express = require("express");

const { CreateStockItem, getAllStockItems, getoneItem, updateStockItem, deleteItem } = require('../controllers/StockItem.constroller')


const router = express.Router();

router.route('/').post(CreateStockItem).get(getAllStockItems);
router.route('/:itemId').get(getoneItem).delete(deleteItem).put(updateStockItem);
module.exports = router;
