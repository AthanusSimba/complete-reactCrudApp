import React from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth";

class NavBar extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }
 render() {
        const {isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item" ><span>
                    <strong>
                        <a className="nav-link" href="#">{user ? `Welcome ${user.username}` : ''}</a>
                    </strong>
                </span></li>
                  <li className="nav-item">
                      <button onClick={this.props.logout} className='nav-link btn btn-info btn-sm text-light'>Logout</button>
                  </li>

              </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                      <a className="nav-link" href="#">Home</a>
                  </li>
                  <li className="nav-item">
                      <Link to='/register' className='nav-link'>Register</Link>
                  </li>
                  <li className="nav-item">
                      <Link to='/login' className='nav-link'>Login</Link>
                  </li>
              </ul>
        )
  return (

      <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className='container'>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <a className="navbar-brand" href="#">Lead Manager</a>
              {isAuthenticated ? authLinks: guestLinks}
          </div>
          </div>
      </nav>
  )
 }
}
const mapStateProps = state => ({
    auth: state.auth
})

export default connect(mapStateProps, {logout})(NavBar);