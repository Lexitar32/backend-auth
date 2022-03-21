const BoardModel = require("../models/boards.model");
const {
    createBoardValidation
} = require("../validation/board.validation");

exports.createBoard = async (req, res) => {
    try {
        const data = {};
        const { boardTitle, label, userId, processName } = req.body;

        data.boardTitle = boardTitle;
        data.label = label;
        data.processName = processName;
        data.userId = userId;

        const { error } = createBoardValidation().validate(data);

        if (error) {
            return res.status(400).send({
                error: error.message,
            });
        }

        const existingBoard = await BoardModel.findOne({
            boardTitle,
            userId,
        });

        if (existingBoard) {
            throw new Error("Board Already Exists");
        }

        const board = new BoardModel(data);
        await board.save();
        res.send({
            message: "Board successfully created",
        });
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
};

exports.getBoards = async (req, res) => {
    try {
        const boards = await BoardModel.find({ userId: req.params.id });
        res.send(boards);
    } catch (error) {
        res.status(400).send({
            error: error.message || "Something went wrong",
        });
    }
};