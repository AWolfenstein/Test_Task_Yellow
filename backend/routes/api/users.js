/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          password:
 *             type: string
 *             format: password
 *        example:
 *           name: Fake
 *           email: fake@email.com
 *           password: $2a$10$4bDRkZidoZXKmXEOMFb.vOJS1tIun8xItTwjbIneZz4aB29Gnr0h2
 */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/mongo");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");


// Routes
/**
 * @swagger
 * tags:
 * - name: "/api/user/"
 *   description: "Operations about user"
 * - name: "/api/profile"
 *   description: "Access to Profile"
 * path:
 * /api/user/register:
 *   post:
 *    tags:
 *    - "/api/user/"
 *    description: Use to register user
 *    parameters:
 *      - name: name
 *        in: body
 *        description: Name User
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: Email
 *        in: body
 *        description: Email User
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: password
 *        in: body
 *        description: password User
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created user
 * /api/user/login:
 *   post:
 *    tags:
 *    - "/api/user/"
 *    description: Use to login user
 *    parameters:
 *      - name: Email
 *        in: body
 *        description: Email User
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: password
 *        in: body
 *        description: password User
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully 
 */
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
router.post("/login", (req, res) => {
console.log(req.body);
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        
        const payload = {
          id: user.id,
          name: user.name
        };
        jwt.sign(
          payload,
          keys.secret,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ message: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
