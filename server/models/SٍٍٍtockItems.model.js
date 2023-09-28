const mongoose = require('mongoose')

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
    openingBalance: {
      type: Number,
      require: true,
      default: 0,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    cost: {
      type: Number,
      require: true,
      default: 0,
    },
    createAt: {
      type: Date,
    },
    createBy: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    balance: {
      type: Number,
      default: 0,
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
