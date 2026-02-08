const PatientModel = require("./patient.model");

const add = async (patient) => {
  const newPatient = new PatientModel(patient);
  const savedUser = await newPatient.save();
  return savedUser;
};
const list = async (filter) => {
  const patients = await PatientModel.find(filter);
  return patients;
};

const listPatientsWithTreatments = async (filter = {}) => {
  return PatientModel.aggregate([
    { $match: filter },

    {
      $lookup: {
        from: "appointments",
        localField: "_id",
        foreignField: "patient",
        as: "appointments",
      },
    },

    { $unwind: "$appointments" },

    {
      $lookup: {
        from: "doctors",
        localField: "appointments.doctor",
        foreignField: "_id",
        as: "doctor",
      },
    },
    { $unwind: "$doctor" },

    {
      $lookup: {
        from: "specialties",
        localField: "doctor.specialty",
        foreignField: "_id",
        as: "specialty",
      },
    },
    { $unwind: "$specialty" },

    {
      $lookup: {
        from: "reports",
        localField: "appointments._id",
        foreignField: "appointment",
        as: "reports",
      },
    },

    {
      $unwind: {
        path: "$reports",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $group: {
        _id: {
          patientId: "$_id",
          specialtyId: "$specialty._id",
          doctorId: "$doctor._id",
        },
        patient: { $first: "$$ROOT" },
        specialty: { $first: "$specialty" },
        doctor: { $first: "$doctor" },
        reports: {
          $push: {
            date: "$reports.date",
            progressNote: "$reports.progressNote",
          },
        },
      },
    },

    {
      $group: {
        _id: "$_id.patientId",
        patient: { $first: "$patient" },
        treatments: {
          $push: {
            specialty: "$specialty.name",
            doctor: "$doctor.name",
            reports: {
              $filter: {
                input: "$reports",
                as: "r",
                cond: { $ne: ["$$r.date", null] },
              },
            },
          },
        },
      },
    },

    {
      $project: {
        _id: 1,
        name: "$patient.name",
        birthday: "$patient.birthday",
        phone: "$patient.phone",
        address: "$patient.address",
        diagnosis: "$patient.diagnosis",
        treatments: 1,
      },
    },
  ]);
};

module.exports = { add, list, listPatientsWithTreatments };
