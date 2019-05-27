const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  amount: {
    type: Number
  },
  publishedNews: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model("News", newsSchema);
