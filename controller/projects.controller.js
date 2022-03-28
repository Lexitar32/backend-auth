const Status = require("../models/status.model");
const ProjectModel = require("../models/projects.model");
const {
  createProjectValidation,
  updateProjectValidation
} = require("../validation/projects.validation");

exports.createProject = async (req, res) => {
  try {
    const data = {};
    const { projectName, statusId, boardId } = req.body;

    data.projectName = projectName;
    data.statusId = statusId;
    data.boardId = boardId

    const { error } = createProjectValidation().validate(data);

    if (error) {
      return res.status(400).send({
        error: error.message,
      });
    }

    const project = new ProjectModel(data);
    await project.save();

    await Status.findOneAndUpdate(
      { _id: data.statusId },
      { $push: { projects: project._id } },
      { new: true }
    );

    res.send({
      message: "Project successfully created",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
      const projects = await ProjectModel.find({
          boardId: req.params.id
      })
      res.send(projects);
  } catch (error) {
      res.status(400).send({
          error: error.message || "Something went wrong",
      });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await ProjectModel.findOne({
      statusId: req.params.id,
      _id: req.params.projectId,
    })
    res.send(project);
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const data = {};
    const { projectName } = req.body;

    data.projectName = projectName;

    const { error } = updateProjectValidation().validate(data);

    if (error) {
      return res.send(error.message);
    }

    const existingProject = await ProjectModel.findOne({
      projectName: data.projectName,
    });

    if (existingProject) {
      throw new Error("Project Already Exists");
    }

    let response = await ProjectModel.findOneAndUpdate(
      { _id: req.params.projectId, statusId: req.params.statusId },
      data
    );

    if (!response) {
      throw new Error("Project not found");
    }

    res.send({
      message: "Project successfully updated",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message || "Something went wrong",
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
      let response = await ProjectModel.findOneAndDelete({
          _id: req.params.projectId,
          statusId: req.params.statusId,
      });

      if (!response) {
          throw new Error("Project not found");
      }

      res.send({
          message: "Project deleted successfully",
      });
  } catch (error) {
      res.status(400).send({
          error: error.message || "Something went wrong",
      });
  }
}

