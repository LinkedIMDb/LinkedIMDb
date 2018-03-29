import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm.jsx';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    // this.state = {
    //   errors: {},
    //   user: {
    //     username: '',
    //     email: '',
    //     firstname: '',
    //     lastname: '',
    //     password: ''
    //   },
    //   signedIn: false
    // };

    // this.processForm = this.processForm.bind(this);
    // this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <SignUpForm
          onSubmit={this.props.onSubmit}
          onChange={this.props.onChange}
          errors={this.props.errors}
          user={this.props.user}
        />
        <Card>
          <CardText>Already have an account? <Link to='/login'>Log in</Link></CardText>
        </Card>

        {this.props.signedIn && <Redirect to='/dashboard' />}
        
      </div>
    );
  }

}

export default SignUpPage;