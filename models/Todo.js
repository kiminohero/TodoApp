const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  done: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
