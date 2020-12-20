const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:id', async (req,res) => {
  try {
    const response = await db.User.findById(req.params.id)
    res.json(response)
  } catch(err) {
    console.log('Error on show.route', err);
    res.json({Error: 'Unable to retrieve user'})
  }
});

module.exports = router;