const express = require("express");
const router = express.Router();
const {
  getJobs,
  getJob,
  createJob,
  deleteJob,
} = require("../controllers/jobsController");

router.get("/", getJobs);
router.get("/:id", getJob);
router.post("/", createJob);
router.delete("/:id", deleteJob);

/*router.put("/:id", updateJob);
router.delete("/:id", deleteJob); */

module.exports = router;
