const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const StockManagSchema = new mongoose.Schema(
  {
    item: {
      type: ObjectId,
      ref: 'StockItems',
      require: true,
    },
    unit: {
      type: String,
      require: true,
    },
    Quantity: {
      type: Number,
      default: 0,
      require: true,
    },
    Balance:{
      type: Number,
      require: true,
    },
    newBalance:{
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    cost: {
      type: Number,
      require: true,
    },
    actionBy: {
      type: ObjectId,
      ref: 'User',
    },
    actionAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['مشتريات', 'منصرف', 'راجع'],
      require: true
    },
  },
  {
    timestamps: true,
  }
)


const StockManagModel = mongoose.model('StockManag', StockManagSchema)
module.exports = StockManagModel
