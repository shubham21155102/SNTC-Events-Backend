const { Router } = require("express");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//usermodel Import
const userModel = require("../models/users");
router.post("/register", async (req, res) => {
  try {
    var { email, password, name } = req.body;
    const user = new userModel({
      email: email,
      password: password,
      name: name,
    });
    const token = await user.generateAuthToken(); //model me jakar generateAuthToken function ko call kia
    //cookie me token ko save kia
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 300000),
      httpOnly: true,
      secure: true,
    });
    // console.log(user);
    await user.save();
    res
      .status(201)
      .send({ message: "User Created Successfully", success: true });
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await userModel.findOne({
      email: email,
    });
    if (users.email === email && bcrypt.compareSync(password, users.password)) {
      const token = await users.generateAuthToken(); //model me jakar generateAuthToken function ko call kia
      //cookie me token ko save kia
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 300000),
        httpOnly: true,
        secure: true,
      });
      await users.save();
      res
        .status(201)
        .send({ message: "Successfully Logged In", success: true });
    } else {
      res.send("error");
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});
router.get("/", (req, res) => {
  res.send("Hello World");
});
module.exports = router;
