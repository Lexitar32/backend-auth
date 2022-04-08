const BoardModel = require("../models/boards.model");
const Status = require("../models/status.model");
const {
  createBoardValidation,
  updateBoardValidation,
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

    const board = await BoardModel.create(data);
    const boardId = board._id;

    const statusArray = [
      {
        statusName: "To Do",
        boardId: boardId,
        projects: [],
      },
      {
        statusName: "Incoming",
        boardId: boardId,
        projects: [],
      },
      {
        statusName: "Completed",
        boardId: boardId,
        projects: [],
      },
    ];

    const tempStatus = await Status.insertMany(statusArray)
    const statusArr = [];

    tempStatus.map(status => statusArr.push(status._id))
    
    await BoardModel.findOneAndUpdate(
        { _id: boardId },
        { $push: { status:  statusArr } },
        { new: true }
      );

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
    const boards = await BoardModel.find({ userId: req.id }).populate(
      "status"  
    );
    res.send(boards);
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};

exports.getBoard = async (req, res) => {
  try {
    const board = await BoardModel.findOne({
      userId: req.id,
      _id: req.params.boardId,
    }).populate("status");
    res.send(board);
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const data = {};
    const { boardTitle, label, processName } = req.body;

    data.boardTitle = boardTitle;
    data.label = label;
    data.processName = processName;

    const { error } = updateBoardValidation().validate(data);

    if (error) {
      return res.send(error.message);
    }

    const existingBoard = await BoardModel.findOne({
      boardTitle: data.boardTitle,
      label: data.label,
    });

    if (existingBoard) {
      throw new Error("Board Already Exists");
    }

    let response = await BoardModel.findOneAndUpdate(
      { _id: req.params.boardId, userId: req.id },
      data
    );

    if (!response) {
      throw new Error("Board not found");
    }

    res.send({
      message: "Board successfully updated",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    let response = await BoardModel.findOneAndDelete({
      _id: req.params.boardId,
      userId: req.id,
    });

    if (!response) {
      throw new Error("Board not found");
    }

    res.send({
      message: "Board deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};
