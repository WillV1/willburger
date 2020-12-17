const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { User } = require('../models');

//REGISTER NEW USER 

router.post('/',  [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], async (req,res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const { email, password } = req.body;

  try {

    //Check for existing user 

    let user = await db.User.findOne({email});
    if(user){
      return res.status(400).json({errors: [{msg: 'User already exists'}]})
    }
    user = new User({
      email, password
    });

    //Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    const savedUser = await user.save();
    
    const token = jwt.sign(
      { id: savedUser._id},
      process.env.SECRET,
      { expiresIn: 3600 }, 
    )
      res.json({user, token});

  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server error')
  }

});




module.exports = router;

