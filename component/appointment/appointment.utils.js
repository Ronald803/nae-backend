const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const generateHours = (start = "08:00", end = "19:30", interval = 30) => {
  const hours = [];
  let [h, m] = start.split(":").map(Number);

  while (true) {
    const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    hours.push(time);

    if (time === end) break;

    m += interval;
    if (m >= 60) {
      m = 0;
      h++;
    }
  }

  return hours;
};

const createEmptySchedule = () => {
  const schedule = {};
  const hours = generateHours();

  hours.forEach((hour) => {
    schedule[hour] = {};
    DAYS.forEach((day) => {
      schedule[hour][day] = {};
    });
  });

  return schedule;
};

const shapeSchedule = (appointments) => {
  const schedule = createEmptySchedule();

  appointments.forEach((appointment) => {
    const { _id: appointmentId, day, startHour, patient, doctor } = appointment;

    const { _id: patientId, name: patientName } = patient;
    const { _id: doctorId, name: doctorName, specialty } = doctor;
    const { id: specialtyId, name: specialtyName } = specialty;

    schedule[startHour][day][specialtyId] = {
      specialtyName,
      patientId,
      patientName,
      doctorId,
      doctorName,
      appointmentId,
      startEndHour: generateStartEndHours(startHour),
    };
  });

  return schedule;
};

const generateStartEndHours = (startAt) => {
  const [h, m] = startAt.split(":").map(Number);

  const endHour = m === 0 ? `${h}:30` : `${h + 1}:00`;

  return `${startAt} - ${endHour}`;
};

module.exports = { shapeSchedule };
