import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm.jsx';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        username: '',
        password: ''
      },
      signedIn: false
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const formData = {
      username : this.state.user.username,
      password : this.state.user.password,
    };

    // create an AJAX request
    fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include' // COOKIES
      })
      .then(res => res.json())
      .then((res) => {
        const errors = res.errors ? res.errors : {};
        if (!Object.keys(errors).length){
          this.setState({
            errors: {},
            signedIn: true
          });
          console.log('Valid form.')
        } else {
          errors.summary = res.message;
          this.setState({ errors });
        }
      });
  }
  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />
        <Card>
          <CardText>Need to make an account? <Link to='/signup'>Sign Up</Link></CardText>
        </Card>

        {this.state.signedIn && <Redirect to='/dashboard' />}
      </div>
    );
  }

}

export default LoginPage;