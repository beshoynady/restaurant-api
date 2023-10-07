const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const DeliverySchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        price: Number,
        quantity: Number,
        variableData: Object,
        discount:{
          type: Number,
          default: 0,
        },
        discountType: {
          type: String,
          enum: ['percentage', 'fixed'],
          default: 'percentage',
        },
      },
    ],
    orderTotal: Number,
    totalAfterDiscount: Number,
    couponApplied: {
      type: Boolean,
      default: false,
    },
    orderdBy:[
      {
        type: ObjectId,
        ref: 'User',
        required: true,
        default: null,
        select: false,
        name: String,
        phone: String,
        email: String,
        address:{
          type: String,
          required: true,
        }
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'delivered', 'canceled','Rejected'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
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
module.exports = mongoose.model('Delivery', DeliverySchema)