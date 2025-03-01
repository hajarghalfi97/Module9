const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // foreign key needs ObjectId type and a 'ref' to the referenced schema
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'post' }, // foreign key needs ObjectId type and a 'ref' to the referenced schema
  comment: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})  

module.exports = mongoose.model("comment", commentSchema); // lowercase singular schema name