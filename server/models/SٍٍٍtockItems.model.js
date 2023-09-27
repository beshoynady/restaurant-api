const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const StockItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      require: true, 
      unique: true
    },
    unit: {
      type: String,
      require: true, 
    },
    openingBalance:{
      type: Number,
      require: true,
      default: 0, // default value is 0 for default value of opening balance
      
    },
    price: {
      type: Number,
      require: true,
    },
    cost:{
      type: Number,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    balance:{
      type: Number,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)
const StockItemModel = mongoose.model('StockItem', StockItemSchema)
module.exports = StockItemModel
