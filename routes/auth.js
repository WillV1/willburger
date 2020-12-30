const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { User } = require('../models');
const auth = require('../middleware/auth');


router.get('/', auth, async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

//Authenticate user and get token

router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required')
  .exists()
], 
async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const { email, password } = req.body;
  try {
  let user = await User.findOne({email});

  if(!user) {
    return res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
    return res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
  }

  const payload = {
    user: {
      id: user.id
    }
  }

  jwt.sign(payload, process.env.SECRET,
  { expiresIn: 3600 },
  ( err, token ) => {
    if (err) throw err;
    res.json({ token });
  }
  )
  } catch(err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});


module.exports = router;