import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm.jsx';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        password: ''
      },
      signedIn: false
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Change the user object on each keypress
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
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    const formData = {
      username : this.state.user.username,
      email : this.state.user.email,
      password : this.state.user.password,
      firstname : this.state.user.firstname,
      lastname : this.state.user.lastname
    };

    fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(res => res.json())
      .then(res => {
        const errors = res.errors ? res.errors : {};
        if (!Object.keys(errors).length){
          this.setState({
            errors: {},
            signedIn: true
          });
          // REDIRECT HERE
        } else {
          errors.summary = res.message;
          this.setState({ errors });
        }
      })
      .catch(err => {
        console.log('ERROR!', err);
      });
  }

  /**
   * Render the component.
   */
  render() {
    console.log(this.state.signedIn)
    return (
      <div>
        <SignUpForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />
        <Card>
          <CardText>Already have an account? <Link to='/login'>Log in</Link></CardText>
        </Card>

        

        {this.state.signedIn && <Redirect to='/dashboard' />}
        
      </div>
    );
  }

}

export default SignUpPage;