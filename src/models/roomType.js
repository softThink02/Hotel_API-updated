const { Schema, model } = require("mongoose");
const { SCHEMAS } = require("../utils/constants");

const roomSchema = new Schema(
  {
    // _id: {type: Schema.Types.ObjectId},
    name: {
      type: String,
      required: true,
      // enum: ["Premium", "Standard", "Economic"],
    },
  },
  { timestamps: true }
);

roomSchema.index({ "$**": "text" }, { default_language: "english" });

module.exports = model(SCHEMAS.Room_Type, roomSchema);
