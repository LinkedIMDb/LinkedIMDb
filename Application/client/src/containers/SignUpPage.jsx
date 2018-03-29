import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm.jsx';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div className="container">
        <SignUpForm
          onSubmit={this.props.onSubmit}
          onChange={this.props.onChange}
          errors={this.props.errors}
          user={this.props.user}
        />
        <Card className="container">
          <CardText className>Already have an account? <Link to='/login'>Log in</Link></CardText>
        </Card>

        {this.props.signedIn && <Redirect to='/dashboard' />}
        
      </div>
    );
  }

}

export default SignUpPage;