const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workspaceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        shortName: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: "link to a default image"
        }
    },
    {
        timestamps: true,
    }
);


const Workspace = mongoose.model("workspace", workspaceSchema);

module.exports = Workspace;
