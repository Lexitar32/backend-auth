const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const processSchema = new Schema(
    {
        processName: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        steps: {
            type: Number,
            default: 0,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

processSchema.methods.toJSON = function () {
    const process = this;
    const processObject = process.toObject();

    delete processObject.__v;
    return processObject;
};

const Process = mongoose.model("process", processSchema);

module.exports = Process;
