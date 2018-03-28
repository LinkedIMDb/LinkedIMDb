import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { browserHistory, Router } from 'react-router';
// import routes from './routes.js';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App.jsx';
import routes from './routes.js';

const title = 'LinkedImdb';

ReactDom.render((
  // <BrowserRouter>
    <App />
  // </BrowserRouter>
), document.getElementById('app'));


// module.hot.accept();
// console.log('My Minimal React Webpack Babel Setup');