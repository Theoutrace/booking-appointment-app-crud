const Appointment = require("../models/appointment");

// get all appointements
exports.getAllAppointments = async (req, res, next) => {
  let appointments = await Appointment.findAll();
  res.json(appointments);
};

// add new appointment
exports.postAppointments = async (req, res, next) => {
  console.log("values>>>>>>>", req.body);
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  let result = await Appointment.create({
    name: name,
    email: email,
    phone: phone,
  });
  res.json(result);
};
// delete an appointment (will need id)
exports.deleteAppointment = async (req, res, next) => {
  //   console.log("here>>>>>>", req.params);
  let appointmentId = req.params.appointmentId;
  let appointment = await Appointment.findByPk(appointmentId);
  await appointment.destroy();
  console.log("An appointment destroyed");
};

//edit an appointment (will need id)

exports.editAppointment = async (req, res, next) => {
  console.log(req.params);

  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  let appointmentId = req.params.appointmentId;
  let appointment = await Appointment.findByPk(appointmentId);

  let result = await appointment.update({
    name: name,
    email: email,
    phone: phone,
  });
  res.json(result);
};
