const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// POST /api/jobs (post a new job)
router.post("/", jobController.postJob);

// GET /api/jobs (list jobs)
router.get("/", jobController.listJobs);

// PATCH /api/jobs/:id (update job status, assign worker, etc.)
router.patch("/:id", jobController.updateJob);

module.exports = router;
