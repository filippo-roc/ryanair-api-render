const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const auth = require("../middleware/auth");


router.post("/users/sign-in", usersController.createUser);
router.post("/users/login", usersController.login);
router.get("/users/get-user",auth, usersController.getUser)
module.exports = router;