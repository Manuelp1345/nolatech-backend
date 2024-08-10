//user model mongoose
import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  text: { type: String, required: true },
  evaluation: { type: Schema.Types.ObjectId, ref: "evaluation" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

questionSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("question", questionSchema);
