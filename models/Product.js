var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  cate:String,
  desc: String,
  item: String,
  price: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
