const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rider',
      required: true,
    },
    type: {
      type: String,
      enum: ['PREMIUM_PAYMENT', 'CLAIM_PAYOUT', 'REFUND'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
    },
    // Payment gateway references
    razorpayPaymentId: String,
    razorpayOrderId: String,
    razorpayPayoutId: String,
    // Links
    policy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Policy',
    },
    claim: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Claim',
    },
    // Meta
    method: {
      type: String,
      enum: ['UPI', 'BANK_TRANSFER', 'MOCK'],
      default: 'MOCK',
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

// Indexes
transactionSchema.index({ rider: 1, createdAt: -1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ status: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);
