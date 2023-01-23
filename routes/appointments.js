const express = require("express");

const router = express.Router();

// import controller of appointments
const appointmentsController = require("../controllers/appointments");

router.get("/appointments", appointmentsController.getAllAppointments);
router.post("/appointments", appointmentsController.postAppointments);
router.delete(
  "/appointments/:appointmentId",
  appointmentsController.deleteAppointment
);
router.put(
  "/appointments/:appointmentId",
  appointmentsController.editAppointment
);

module.exports = router;
