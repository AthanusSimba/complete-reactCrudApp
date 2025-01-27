import React, {Component} from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from "../../actions/auth";

class Login extends Component {
    state = {
        username: '',
        password: ''
    }
    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }
    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    onChange = e => this.setState({
        [e.target.name]:e.target.value})

    render() {
        if(this.props.isAuthenticated){
            return <Redirect to='/'/>
        }
        const {username, password} = this.state;
        return (
            <div>
          <div className="card card-body mt-4 mb-4">
              <h2 className='text-center'>Login</h2>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Name</label>
                      <input
                      className='form-control'
                      type='text'
                      name='username'
                      onChange={this.onChange}
                      value={username}
                      />
                  </div>
                  <div className="form-group">
                      <label>Password</label>
                      <input
                      className='form-control'
                      type='password'
                      name='password'
                      onChange={this.onChange}
                      value={password}
                      />
                  </div>
                  <div className='form-group'>
                      <button type='submit' className='btn btn-primary'>Login</button>
                  </div>
                  <p>Don't have an account?<Link to='/register'>Register</Link></p>
              </form>
          </div>
      </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);