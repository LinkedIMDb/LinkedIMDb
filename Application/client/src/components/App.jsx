import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import LoginPage from '../containers/LoginPage.jsx'
import LoginForm from './LoginForm.jsx';
import SignUpPage from '../containers/SignUpPage.jsx';
import SignUpForm from '../components/SignUpForm.jsx';
import Dashboard from '../containers/Dashboard.jsx';
import Testing from './Testing.jsx';


const App = () => (
  <Router>
    <MuiThemeProvider>
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={SignUpPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/dashboard' component={Dashboard} />
      </div>
    </MuiThemeProvider>
  </Router>
)

class Home extends React.Component {
  // call server to check if auth, if so redirect to dashboard
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      signedIn: false,
      cookieChecked: false
    };
  }
  componentDidMount() {
    fetch('/auth/verify', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(res => res.json())
    .then(res => {
      let signedIn = false;
      if (res && res.user_id) {
        signedIn = true;
      }
      let cookieChecked = true;
      this.setState({signedIn, cookieChecked});
    });
  }

  render() {
    return (
      <div>
      {this.state.cookieChecked && this.state.signedIn && <Redirect to='/dashboard'/>}


      {this.state.cookieChecked && !this.state.signedIn && <Redirect to='/login' /> }
      </div>
    )
  }
}


const Simple = () => (
 <Link to="/dashboard">ALINK</Link> 
)

export default App