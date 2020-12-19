import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import M from 'materialize-css';
import { authenticate } from 'passport';

const NavBar = ({auth: {isAuthenticated}, logout}) => {

  useEffect(() => {
    M.AutoInit();
  })
  return (
    <div>
    {/* Dropdown Structure */}
      <ul id="dropdown1" class="dropdown-content">
      <li><a href="#!">Place Order</a></li>
      <li><a href="#!">Current Order</a></li>
      <li><a href="#!">Account</a></li>
      </ul>
      <nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo">Logo</a>
        <ul class="right hide-on-med-and-down">
          <li><a href="sass.html">Place Order</a></li>
          <li><a href="badges.html">Locations</a></li>
          {/*} Dropdown Trigger */}
          <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Hi Customer!<i class="material-icons right">arrow_drop_down</i></a></li>
        </ul>
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