import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm.jsx';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        username: '',
        password: ''
      }
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
    const username = encodeURIComponent(this.state.user.username);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `username=${username}&password=${password}`;

    // create an AJAX request
    fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
      })
      .then(res => res.json())
      .then((res) => {
        if (res.status === 200){
          this.setState({
            errors: {}
          });
          console.log('Valid form.')
        } else {
          const errors = res.errors ? res.errors : {};
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
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

export default LoginPage;