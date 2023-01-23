const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");

const appointmentRoute = require("./routes/appointments");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(appointmentRoute);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("DB connected");
    });
  })
  .catch((error) => {
    console.log("error>>>", error);
  });
