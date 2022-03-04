const router = require("express").Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {check , validationResult} = require('express-validator')


router.post(
    "/",
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check("nationality", "nationality is required").not().isEmpty(),
      check("address", "Address is required").not().isEmpty(),
      check("birthday", "Birthday is required").not().isEmpty(),
      check("password", "Password must be more than 6 letter").isLength({
        min: 5,
      }),
      check("nationalID", "ID must be more 14 letter").isLength({
        min: 14,
        max:14
      }),
      
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, password, nationalID,birthday,address, nationality, } = req.body;
      //check user exists with email
      try {
        let user = await User.findOne({ email });
        if (user) {
          return res
            .status(500)
            .json({ errors: [{ msg: "user already exists" }] });
        }
        //using gravatar with email
        const avatar = gravatar.url(email, {
          s: "200", //default size
          r: "pg", //prevent from bad image
          d: "mm",
        });
  
        user = new User({
          name,
          email,
          avatar,
          password,
          birthday,
          nationality,
          nationalID,
          address
        });
        //encrypt password with bycrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        //save to mongoose
        await user.save();
        //return jwt jsonWebToken
        const payload = {
          _id: user._id,
        };
        jwt.sign(
          payload,
          process.env.jwtSecret,
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (error) {
        console.log(error.message);
        res.status(500).send("server error");
      }
    }
  );