import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Testing from './Testing';


const App = () => (
  <MuiThemeProvider>

    <div>

      ehiefheohedoedhoe
         {/* <Header />  
       
        <Main /> */}
        <SignUpForm />
    </div>

  </MuiThemeProvider>

)

export default App