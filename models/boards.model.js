const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StatusModel = require("../models/status.model");

const boardSchema = new Schema(
  {
    boardTitle: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    processName: {
      type: Object,
      default: null,
    },
    userId: {
      type: String,
      required: true,
    },
    status: [{ type: Schema.Types.ObjectId, ref: "Status" }],
  },
  {
    timestamps: true,
  }
);

boardSchema.methods.toJSON = function () {
  const board = this;
  const boardObject = board.toObject();

  delete boardObject.__v;
  return boardObject;
};

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
