import { Schema, model, models } from "mongoose";
const schema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  salary: { type: Number },
  date: { type: Date, default: Date.now() },
  isactive: { type: String ,default: 'inactive'},
});

export const userModel = models.newschema || model("newschema", schema);
