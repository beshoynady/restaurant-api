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
    },
    price: {
      type: Number,
      require: true,
    },
    cost: {
      type: Number,
      require: true,
    },
    addBy: {
      type: ObjectId,
      ref: 'User',
    },
    addAt: {
      type: Date,
    },
    takeOutBy: {
      type: ObjectId,
      ref: 'User',
    },
    takeOutAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['مشتريات', 'منصرف', 'راجع'],
    },
  },
  {
    timestamps: true,
  }
)


const StockManagModel = mongoose.model('StockManag', StockManagSchema)
module.exports = StockManagModel
