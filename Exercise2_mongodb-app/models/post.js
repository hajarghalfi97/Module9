const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  image: { type: String, trim: true, required: true },
  likes: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // foreign key needs ObjectId type and a 'ref' to the referenced schema
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})  

module.exports = mongoose.model("post", postSchema); // lowercase singular schema name