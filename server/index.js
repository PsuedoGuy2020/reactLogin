const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterModel = require("./models/Register");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

mongoose.connect("mongodb://127.0.0.1:27017/test");

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  RegisterModel.findOne({ email: email })
  .then(user => {
    if (user) {
      res.json("Already have account!");
    } else {
      RegisterModel.create({ name: name, email: email, password: password })
        .then(result => res.json(result))
        .catch(error => res.json(error));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
