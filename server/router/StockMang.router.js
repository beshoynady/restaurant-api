const exports = require('exports');

const { addQuantity, takeOutQuantity } = require('../controllers/StockMang.controller');

const router = express.router();

router.route('/add').post(addQuantity)
router.route('/takeOut').post(takeOutQuantity)

module.exports = router;
