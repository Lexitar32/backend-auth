const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema(
  {
    statusName: {
      type: String,
      required: true,
    },
    boardId: {
      type: String,
      required: true,
    },
    projects: [{ type: Schema.Types.ObjectId, ref: "Projects" }],
  },
  {
    timestamps: true,
  }
);

statusSchema.methods.toJSON = function () {
  const status = this;
  const statusObject = status.toObject();

  delete statusObject.__v;
  return statusObject;
};

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
