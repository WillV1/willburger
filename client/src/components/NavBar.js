import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import M from 'materialize-css';

const NavBar = ({auth: {isAuthenticated, user, loading}, logout}) => {

  useEffect(() => {
    M.AutoInit();
  })

  const authLinks = (
    <Fragment>
    {/* Dropdown Structure */}
    <ul id="dropdown1" class="dropdown-content">
    <li><a href="#!">Place Order</a></li>
    <li><a href="#!">Current Order</a></li>
    <li><a href="#!">Account</a></li>
    </ul>

    <ul class="right hide-on-med-and-down">
          <li><a href="sass.html">Place Order</a></li>
          <li><a href="badges.html">Locations</a></li>
          {/*} Dropdown Trigger */}
          <li><a class="dropdown-trigger" href="#!" data-target="dropdown1"><span>{user ? `Hi ${user.username} !`: ''}</span><i class="material-icons right">arrow_drop_down</i></a></li>
        </ul>
    </Fragment>
  )

  return (
    <div>
    
      <nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo">WillBurger</a>
        {!loading && <Fragment>{isAuthenticated ? authLinks : ''}</Fragment>}
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