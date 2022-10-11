require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const User = require("./model/user");
const Service = require("./model/service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./midleware/auth");
const user = require("./model/user");
const Booking = require("./model/booking");
const app = express();

app.use(express.json());

///////////login & register////////////////////////

app.post("/v1/auth/register", async (req, res) => {
  try {
    const { fullName, username, password } = req.body;
    if (!(fullName && username && password)) {
      res.status(400).send("Input require");
    }

    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.status(409).send("Username already exist");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      username,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/v1/auth/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
  }
});
//_______________________________________________________________

///// service: Show & Inputdata/////////
app.get("/v1/services", (req, res) => {
  Service.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

app.get("/v1/services/:_id", (req, res) => {
  Service.findById(req.params._id, (err, Service) => {
    if (err) res.send(err);
    res.json(Service);
  });
});

app.post("/v1/add-service", auth, async (req, res) => {
  try {
    const { name, price, picture, description } = req.body;
    if (!(name && price && picture && description)) {
      res.status(400).send("Input require");
    }

    const service = await Service.create({
      name,
      price,
      picture,
      description,
    });

    res.status(201).json(service);
  } catch (err) {
    console.log(err);
  }
});
//__________________________________________________________________

/////////booking////////////////////////

app.post("/v1/services/:_id/booking", auth, async (req, res) => {
  const ID = req.params._id;
  let c1 = await Service.findById(ID);
  const service = c1;

  const customer = req.user;
  try {
    const booking = await Booking.create({
      service,
      customer,
    });
    booking.createAt;

    res.status(201).json(booking);
  } catch (err) {
    console.log(err);
  }
});

app.get("/v1/orders/:id", auth, (req, res) => {
  Booking.findById(req.params.id, (err, Booking) => {
    if (err) res.send(err);
    res.json(Booking);
  });
});

app.get("/v1/orders", auth, (req, res) => {
  Booking.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = app;
