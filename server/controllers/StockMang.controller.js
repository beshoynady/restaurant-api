const StockManagModel = require('../models/StockManag.model');



const createStockAction = async (req, res, next) => {
    try {
        const itemId = await req.body.itemId
        const Quantity = await req.body.Quantity;
        const price = await req.body.price;
        const actionBy = await req.body.addBy;
        const actionAt = await req.body.addAt;
        const status = await req.body.status;
        const newBalance = await req.body.newBalance;

        const itemadded = StockManagModel.create({itemId, Quantity, actionBy, unit, status, newBalance, price, actionAt })
        res.status(200).json(itemadded)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const UpdateStockAction = async (req, res, next) => {
    try {
        const actionid = req.params.actionid;
        const itemId = await req.body.itemId
        const Quantity = await req.body.Quantity;
        const price = await req.body.price;
        const actionBy = await req.body.addBy;
        const actionAt = await req.body.addAt;
        const status = await req.body.status;
        const newBalance = await req.body.newBalance;

        const updatedActon = StockManagModel.findByIdAndUpdate({ _id: actionid }, {itemId, Quantity, actionBy, unit, status, newBalance, price, actionAt })
        res.status(200).json(updatedActon);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getAllStockActions =async (req, res) =>{
    try {
        const allaction = StockManagModel.find({})
        res.status(200).json(allaction)
    } catch (error) {
        res.status(404).json({ message : error.message});
    }
}
const getoneStockActions =async (req, res) =>{
    try {
        const actionid =await req.params.actionid;
        const action = StockManagModel.findById(actionid)
        res.status(200).json(action)
    } catch (error) {
        res.status(404).json({ message : error.message});
    }
}

const DeleteStockAction= async (req, res) => {
    try {
        const actionid = await req.params.actionid;
        const deletedAction = StockManagModel.findByIdAndDelete({_id: actionid})
        res.status(200).json(deletedAction)
    } catch (error) {
        res.status( 404 ).json({message: error.message});
  }
}


module.exports = {createStockAction, UpdateStockAction,getoneStockActions, getAllStockActions, DeleteStockAction }