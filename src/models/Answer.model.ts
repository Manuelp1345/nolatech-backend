//user model mongoose
import mongoose, { Schema } from "mongoose";

const answerSchema = new Schema({
  answerText: { type: String, required: true },
  rating: { type: Number, required: true },
  question: { type: Schema.Types.ObjectId, ref: "question" },
  evaluator: { type: Schema.Types.ObjectId, ref: "employer" },
  evaluatedEmployee: { type: Schema.Types.ObjectId, ref: "employer" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

answerSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("answer", answerSchema);
