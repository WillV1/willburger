import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Register = () => {
  const [ state, setState ] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  })

  const { username, email, password, password2 } = state

  
}

export default Register;