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
      default: 0,
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
