'use strict';

import mongoose from 'mongoose';

var CorrectionSchema = new mongoose.Schema({
  post: String,
  info: String,
  active: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

export default mongoose.model('Correction', CorrectionSchema);
