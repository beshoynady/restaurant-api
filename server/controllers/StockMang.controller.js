const StockManagModel = require('../models/StockManag.model');



const addQuantity = async (req, res, next) => {
    try {
        const itemId = req.params.itemId;
        const Quantity = await req.body.Quantity;
        const addBy = await req.body.addBy;
        const price = await req.body.price;
        const addAt = await req.body.addAt;
        const unit = await req.body.unit;
        const status = await req.body.status;
        const remainingQuantity = await req.body.remainingQuantity;

        const itemadded = StockManagModel.findByIdAndUpdate({ _id: itemId }, { Quantity, addBy, unit, status, remainingQuantity, price, addAt })
        res.status(200).json(itemadded)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const takeOutQuantity = async (req, res, next) => {
    try {
        const itemId = req.params.itemId;
        const Quantity = await req.body.Quantity;
        const takeOutBy = await req.body.takeOutBy;
        const takeOutAt = await req.body.takeOutAt;
        const unit = await req.body.unit;
        const status = await req.body.status;
        const remainingQuantity = await req.body.remainingQuantity;

        const itemtakeOut = StockManagModel.findByIdAndUpdate({ _id: itemId }, { Quantity, takeOutAt, unit, status, remainingQuantity, takeOutBy })
        res.status(200).json(itemtakeOut);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


module.exports = { addQuantity, takeOutQuantity }