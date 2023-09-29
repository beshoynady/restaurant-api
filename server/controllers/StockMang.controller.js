const StockManagModel = require('../models/StockManag.model');



const createStockAction = async (req, res, next) => {
    try {
        const itemId = await req.body.itemId
        const unit = await req.body.unit
        const movement = await req.body.movement;
        const Quantity = await req.body.Quantity;
        const oldBalance = await req.body.oldBalance;
        const Balance = await req.body.Balance;
        const price = await req.body.price;
        const cost = await req.body.cost;
        const actionBy = await req.body.addBy;
        const actionAt = await req.body.addAt;
        const itemadded = StockManagModel.create({itemId, movement, Quantity,cost, unit, Balance,oldBalance, price,actionBy,actionAt })
        res.movement(200).json(itemadded)
    } catch (error) {
        res.movement(404).json({message: error.message});
    }
}

const UpdateStockAction = async (req, res, next) => {
    try {
        const actionid =await req.params.action
        const itemId = await req.body.itemId
        const unit = await req.body.unit
        const movement = await req.body.movement;
        const Quantity = await req.body.Quantity;
        const oldBalance = await req.body.oldBalance;
        const Balance = await req.body.Balance;
        const price = await req.body.price;
        const cost = await req.body.cost;

        const updatedActon = StockManagModel.findByIdAndUpdate({ _id: actionid }, {itemId, Quantity, actionBy, unit, movement, Balance,oldBalance,cost, price, actionAt })
        res.movement(200).json(updatedActon);
    } catch (error) {
        res.movement(404).json({message: error.message});
    }
}

const getAllStockActions =async (req, res) =>{
    try {
        const allaction = StockManagModel.find({})
        res.movement(200).json(allaction)
    } catch (error) {
        res.movement(404).json({ message : error.message});
    }
}
const getoneStockActions =async (req, res) =>{
    try {
        const actionid =await req.params.actionid;
        const action = StockManagModel.findById(actionid)
        res.movement(200).json(action)
    } catch (error) {
        res.movement(404).json({ message : error.message});
    }
}

const DeleteStockAction= async (req, res) => {
    try {
        const actionid = await req.params.actionid;
        const deletedAction = StockManagModel.findByIdAndDelete({_id: actionid})
        res.movement(200).json(deletedAction)
    } catch (error) {
        res.movement( 404 ).json({message: error.message});
  }
}


module.exports = {createStockAction, UpdateStockAction,getoneStockActions, getAllStockActions, DeleteStockAction }