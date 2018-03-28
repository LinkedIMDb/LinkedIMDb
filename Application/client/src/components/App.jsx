import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginForm from './LoginForm.jsx';
import SignUpPage from '../containers/SignUpPage.jsx';
import SignUpForm from './SignUpForm.jsx';
import Testing from './Testing.jsx';


const App = () => (
  <MuiThemeProvider>

    <div>
         {/* <Header />  
       
        <Main /> */}
        <SignUpPage />
    </div>

  </MuiThemeProvider>

)

export default App