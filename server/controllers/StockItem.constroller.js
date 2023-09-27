const StockItemsModel = require('../models/SٍٍٍtockItems.model');


const CreateStockItem = async (req, res) => {
    try {
        const itemName = await req.body.itemName;
        const unit = await req.body.unit;
        const openingBalance = await req.body.openingBalance;
        const price = await req.body.price;
        const createBy = await req.body.createBy;             
        const createAt = await req.body.createAt;      

        const newstockitem = await StockItemsModel.create({ itemName, unit, openingBalance, price, createBy, createAt });
        
        newstockitem.save();
        res.status(200).json(newstockitem);
    } catch (err) {
        res.status(400).json(err)
    }
}



const getAllStockItems = async (req, res) => {
    try {
        const allItems = await StockItemsModel.find({});
        res.status(200).json(allItems);
    } catch (err) {
        res.status(400).json(err)
    }
}


const getoneItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const oneItem = await StockItemsModel.findById(itemId);
        res.status(200).json(oneItem);
    } catch (err) {
        res.status(400).json(err)
    }
}

const updateStockItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const itemName = await req.body.itemName;
        const unit = await req.body.unit;
        const openingBalance = await req.body.openingBalance;
        const price = await req.body.price;

        const newstockitem = await StockItemsModel.findByIdAndUpdate({ _id: itemId },{ itemName, unit, openingBalance, price });
        newstockitem.save();
        res.status(200).json(newstockitem);
    } catch (err) {
        res.status(500).json({ err: err });
    }
}


const deleteItem = async (req, res) => {
    try {
        const itemId = await req.params.itemId;
        const itemdelete = await StockItemsModel.findByIdAndDelete(itemId);
        res.status(200).json(itemdelete);
    } catch (err) {
        res.status(500).json(err)
    }
}



module.exports = { CreateStockItem, getAllStockItems, getoneItem, updateStockItem, deleteItem }