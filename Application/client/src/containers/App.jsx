import React from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage.jsx'
import LoginForm from '../components/LoginForm.jsx';
import SignUpPage from './SignUpPage.jsx';
import SignUpForm from '../components/SignUpForm.jsx';
import Dashboard from './Dashboard.jsx';
import Testing from '../components/Testing.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      user: {
        user_id:'',
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
      },
      signedIn: false,
      cookieChecked: false,
      connectResults: [],
      history: [],
      pathSaved: false,
      errors: {},
    }

    this.changeUser = this.changeUser.bind(this);
    this.processSignupForm = this.processSignupForm.bind(this);
    this.processLoginForm = this.processLoginForm.bind(this);
    this.checkHomeRoute = this.checkHomeRoute.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getSaved = this.getSaved.bind(this);
    this.saveResult = this.saveResult.bind(this);
    this.getPath = this.getPath.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
    this.removeItem = this.removeItem.bind(this);
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
   * Process the Signup form.
   *
   * @param {object} event - the JavaScript event object
   */
  processSignupForm(event) {
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
        } else {
          errors.summary = res.message;
          this.setState({ errors });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }


  /**
   * Process the Login form.
   *
   * @param {object} event - the JavaScript event object
   */
  processLoginForm(event) {
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
            errors : {},
            signedIn : true,
            user : {
              firstname : res.firstname,
              lastname: res.lastname
            }
          });
        } else {
          errors.summary = res.message;
          this.setState({ errors });
        }
      });
  }

  checkHomeRoute() {
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
      let user = { firstname: res.firstname, lastname: res.lastname, username: res.username, user_id: res.user_id};
      this.setState({user, signedIn, cookieChecked});
    });
  }

  logOut() {
    this.setState({user:{}, history: [], connectResults: [], cookieChecked: false});
    // Call an endpoint that will remove cookie and redirect user to '/'.
    fetch('/logout', {
      method: 'GET',
      credentials: 'include'
    })
  }

  getPath(path) {
    this.setState({connectResults: path, history: [], pathSaved: false});
  }

  getSaved() {
    fetch('/history/getHistory', {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.json())
    .then(res => {
      this.setState({ connectResults: [], history: res })
    })
  }

  saveResult(newPath) {
    fetch('/history/savePath', {
      method: 'POST',
      body: JSON.stringify(newPath),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    }).then(res => res.json())
    .then(res => {
      if (res && res.path_id !== undefined) {
      } else if (res && res.error !== undefined) {
        console.log(res.error);
      }
      this.setState({
        pathSaved: true,
      });
    });
  }

  resetErrors() {
    this.setState({ errors:{} });
  }

  removeItem(path_id) {
    const fetchBody = { path_id }
    fetch('/history/removeItem', {
      method: 'DELETE',
      body: JSON.stringify(fetchBody),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    }).then(res => res.json())
    .then(res => {
      this.setState({history: res});
    });
  }

  render() {
    const HomeProps = () => {
      return <Home user={this.state.user} signedIn={this.state.signedIn} cookieChecked={this.state.cookieChecked} history={this.state.history} checkHomeRoute={this.checkHomeRoute}/>
    }
    const SignUpProps = () => {
      return <SignUpPage user={this.state.user} signedIn={this.state.signedIn} cookieChecked={this.state.cookieChecked} history={this.state.history} errors={this.state.errors} onSubmit={this.processSignupForm} onChange={this.changeUser} resetErrors={this.resetErrors}/>
    }
    const LoginProps = () => {
      return <LoginPage user={this.state.user} signedIn={this.state.signedIn} cookieChecked={this.state.cookieChecked} errors={this.state.errors} history={this.state.history} onSubmit={this.processLoginForm} onChange={this.changeUser} resetErrors={this.resetErrors}/>
    }
    const DashboardProps = () => {
      return <Dashboard user={this.state.user} signedIn={this.state.signedIn} cookieChecked={this.state.cookieChecked} pathSaved={this.state.pathSaved} history={this.state.history} getPath={this.getPath} connectResults={this.state.connectResults} saveResult={this.saveResult} getSaved={this.getSaved} logOut={this.logOut} removeItem={this.removeItem}/>
    }

    return (
      <Router>
        <MuiThemeProvider>
          <div>
            {/* <Route exact path='/' render={LoginProps} /> */}
            <Route exact path='/' render={HomeProps} />
            <Route path='/signup' render={SignUpProps} />
            <Route path='/login' render={LoginProps} />
            <Route path='/dashboard' render={DashboardProps} />
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}



class Home extends React.Component {
  // call server to check if auth, if so redirect to dashboard
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.checkHomeRoute();
  }

  render() {
    return (
      <div>
        {this.props.cookieChecked && this.props.signedIn && <Redirect to='/dashboard'/>}
        {this.props.cookieChecked && !this.props.signedIn && <Redirect to='/login' /> }
      </div>
    )
  }
}

export default App
