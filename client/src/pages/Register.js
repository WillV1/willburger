import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import { setAlert } from '../actions/alert';

const Register = ({setAlert, register, isAuthenticated}) => {
  const [ state, setState ] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  })

  const { username, email, password, password2 } = state

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if(password !== password2){
      setAlert('Passwords do not match', 'danger')
    } else {
      register({username, email, password})
    }

    setState({
      username: '',
      email: '',
      password: '',
      password2: ''
    })
  };

  if(isAuthenticated) {
    return <Redirect to='/main' />
  }

  return (
    <div>
      <h3 className="center-align">Sign Up</h3>
      <div className="row">
    <form className="col s6" onSubmit={e => onSubmit(e)}>
      <div className="row">
      <div className="input-field col s6 offset-s10">
        <input name="username" id="username" type="text" value={username} 
        onChange={e => onChange(e)} 
        className="validate"/>
        <label htmlFor="username">Username</label>
      </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input name="email" id="email" type="email" value={email} 
          onChange={e => onChange(e)} 
          className="validate"/>
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input name="password" id="password" type="password" value={password} 
          onChange={e => onChange(e)} 
          className="validate"/>
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6 offset-s10">
          <input name="password2" id="password" type="password" value={password2} 
          onChange={e => onChange(e)} 
          className="validate"/>
          <label htmlFor="password">Confirm Password</label>
        </div>
      </div>
      <div className="col s6 offset-s10">
        <button className="btn waves-effect waves-light" type="submit" name="action">Sign Up
        </button>
      </div>
    </form>
  </div>
    </div>
  )
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {setAlert, register})(Register);