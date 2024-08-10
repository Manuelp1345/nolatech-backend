//user model mongoose
import mongoose, { Schema } from "mongoose";

const evaluationSchema = new Schema({
  period: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "in progress"],
    required: true,
  },
  type: { type: String, required: true },
  employer: { type: Schema.Types.ObjectId, ref: "employers" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

evaluationSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("evaluation", evaluationSchema);
