const DoctorModel = require("./doctor.model");

const add = async (doctor) => {
  const newDoctor = new DoctorModel(doctor);
  const doctorSaved = await newDoctor.save();
  return doctorSaved;
};
const list = async (filter) => {
  const doctors = await DoctorModel.find(filter).populate("specialty");
  return doctors;
};

const listWithPatients = async (filter = {}) => {
  return DoctorModel.aggregate([
    { $match: filter },

    {
      $lookup: {
        from: "specialties",
        localField: "specialty",
        foreignField: "_id",
        as: "specialty",
      },
    },

    { $unwind: "$specialty" },

    {
      $lookup: {
        from: "appointments",
        let: { doctorId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$doctor", "$$doctorId"] },
                  { $eq: ["$status", "active"] },
                ],
              },
            },
          },

          {
            $lookup: {
              from: "patients",
              localField: "patient",
              foreignField: "_id",
              as: "patient",
            },
          },

          { $unwind: "$patient" },

          {
            $group: {
              _id: "$patient._id",
              patient: { $first: "$patient" },
            },
          },

          {
            $project: {
              _id: 0,
              patient: {
                _id: 1,
                name: 1,
              },
            },
          },
        ],
        as: "patients",
      },
    },

    {
      $project: {
        name: 1,
        phone: 1,
        specialty: { name: 1 },
        patients: "$patients.patient",
      },
    },
  ]);
};

const update = async (doctorId, body) => {
  const updatedDoctor = await DoctorModel.findByIdAndUpdate(
    doctorId,
    {
      ...body,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  return updatedDoctor;
};

const getDoctorToAuth = async (email) => {
  const doctors = await DoctorModel.find(email).select("+password");
  return doctors;
};
module.exports = { add, list, update, getDoctorToAuth, listWithPatients };
