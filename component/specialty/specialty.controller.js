const specialtyStore = require("./specialty.store");

const postSpecialty = async (specialty) => {
  const { name } = specialty;
  if (!name) {
    throw new Error("Incomplete data");
  }
  const newSpecialty = { name };
  const specialtySaved = await specialtyStore.addSpecialty(newSpecialty);
  return specialtySaved;
};

const getSpecialties = async () => {
  const specialties = await specialtyStore.listSpecialties();
  return specialties;
};

module.exports = { postSpecialty, getSpecialties };
