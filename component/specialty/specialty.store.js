const SpecialtyModel = require("./specialty.model");
const addSpecialty = async (specialty) => {
  const newSpecialty = new SpecialtyModel(specialty);
  const specialtySaved = await newSpecialty.save();
  return specialtySaved;
};

const listSpecialties = async (filter) => {
  const specialties = await SpecialtyModel.find(filter);
  return specialties;
};

module.exports = { addSpecialty, listSpecialties };
