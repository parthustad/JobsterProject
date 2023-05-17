const jobModel = require("../models/jobModel");

const getJobs = async (req, res) => {
  let jobs = await jobModel
    .find({ createdBy: req.user.id })
    .populate("createdBy");

  res.status(200).json({ jobs });
};

const getJob = async (req, res) => {
  const id = req.params.id;
  const createdBy = req.user.id;
  let jobs = await jobModel.findOne({ createdBy, _id: id });

  res.status(200).json({ jobs });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.id;
  let job = await jobModel.create(req.body);
  res.status(201).json({ job });
};

const deleteJob = async (req, res) => {
  let _id = req.params.id;
  let createdBy = req.user.id;
  let result = await jobModel.deleteOne({ createdBy, _id });
  if (result.deletedCount == 1) {
    res.status(200).json({ result });
  }
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  deleteJob,
};
