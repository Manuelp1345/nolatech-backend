//user model mongoose
import mongoose, { Schema } from "mongoose";

const employerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  hireDate: { type: Date, required: true },
  supervisor: { type: Schema.Types.ObjectId, ref: "employers" },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

employerSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("employers", employerSchema);
