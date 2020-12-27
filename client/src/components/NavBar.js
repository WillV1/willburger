import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import M from 'materialize-css';

const NavBar = ({auth: {isAuthenticated, user, loading}, logout}) => {

  useEffect(() => {
    M.AutoInit();
  })

  const authLinks = (
    <Fragment>

      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <span>{user ? `Hi ${user.username} !`: ''}</span>
        <li><Link to="/main">Dashboard</Link></li>
        <li><a href="badges.html">Add Recipe</a></li>
        <li><a href="badges.html">Edit Recipe</a></li>
        <li><Link onClick={logout} to="/">Log Out</Link></li>       
      </ul>

      <ul id="slide-out" className="sidenav">
        <li><Link to="/search">Search New Recipes</Link></li>
        <li><a href="badges.html">Add Recipe</a></li>
        <li><a href="badges.html">Edit Recipe</a></li>
        <li><Link onClick={logout} to="/">Log Out</Link></li>  
      </ul>
      <a href="/" data-target="slide-out" className="sidenav-trigger">
      <i className="material-icons">menu</i></a>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>

        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>

        <ul id="slide-out" className="sidenav">
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
      </ul>
      <a href="/" data-target="slide-out" className="sidenav-trigger">
      <i className="material-icons">menu</i></a>
    </Fragment>
  )

  return (
    <div>
      <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">Recipe Tracker</Link>
        {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
      </div>
      </nav>
    </div>
  )
}

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = states => ({
  auth: states.auth
})

export default connect(mapStateToProps, { logout })(NavBar);