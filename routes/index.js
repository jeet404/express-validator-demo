const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const { matchedData, sanitizeBody } = require("express-validator");
const jsonParser = bodyParser.json();

/* GET home page. */
router.get("/", jsonParser, function (req, res, next) {
  res.render("index", {
    title: "Login Page",
    msg: "Enter Your Email and Password For Login",
    error: {},
    user: {},
  });
});

router.post(
  "/",
  jsonParser,
  [
    check("username", "Enter valid Email address !").isEmail(),
    check("password", "Enter valid Password !").isLength({ min: 6 }),
    check("cpassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      } else {
        return true;
      }
    }),
  ],
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const user = matchedData(req);
      res.render("index", {
        title: "Login Page",
        msg: "Enter Your Email and Password For Login",
        error: errors.mapped(),
        user: user,
      });
    } else {
      const user = matchedData(req);
      res.render("dashboard", {
        title: "Dashboard",
        msg: "Welcome to Dashboard",
        user: user,
      });
    }
  }
);

module.exports = router;
