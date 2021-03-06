import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const SignUpForm = (props) => {
  return (
  <Card className='container'>
    <form action='/' onSubmit={props.onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {props.errors.summary && <p className="error-message">{props.errors.summary}</p>}
  
      <div className="field-line">
        <TextField
          floatingLabelText="Username"
          name="username"
          onChange={props.onChange}
          errorText={props.errors.username}
          value={props.user.username}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="First Name"
          name="firstname"
          onChange={props.onChange}
          errorText={props.errors.firstname}
          value={props.user.firstname}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Last Name"
          name="lastname"
          onChange={props.onChange}
          errorText={props.errors.lastname}
          value={props.user.lastname}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={props.errors.email}
          onChange={props.onChange}
          value={props.user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={props.onChange}
          errorText={props.errors.password}
          value={props.user.password}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Create A New Account" primary />
      </div>
    </form>
  </Card>
)};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;