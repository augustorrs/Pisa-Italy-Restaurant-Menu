var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  cate:String,
  item: String,
  desc: String,
  price: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
