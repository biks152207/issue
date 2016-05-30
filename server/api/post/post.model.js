'use strict';

import mongoose from 'mongoose';

var PostSchema = new mongoose.Schema({
  post: String,
  info: String,
  active: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  correction: { type: mongoose.Schema.Types.ObjectId, ref: 'Correction'}
});

export default mongoose.model('Post', PostSchema);
