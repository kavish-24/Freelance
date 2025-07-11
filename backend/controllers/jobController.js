const Job = require('../models/Job');

exports.postJob = async (req, res) => {
  try {
    const { title, description, location, date, client, paymentType } = req.body;
    if (!title || !client) return res.status(400).json({ message: 'Missing required fields' });
    const job = new Job({ title, description, location, date, client, paymentType });
    await job.save();
    res.status(201).json({ message: 'Job posted', job });
  } catch (err) {
    res.status(500).json({ message: 'Failed to post job', error: err.message });
  }
};

exports.listJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('client', 'name').populate('worker', 'name');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list jobs', error: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update job', error: err.message });
  }
}; 