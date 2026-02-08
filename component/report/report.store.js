const ReportModel = require("./report.model");

const add = async (report) => {
  const newReport = new ReportModel(report);
  const savedReport = await newReport.save();
  return savedReport;
};

const list = async (filter) => {
  const reports = await ReportModel.find(filter);
  return reports;
};

module.exports = { add, list };
