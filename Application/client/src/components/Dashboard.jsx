import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Search_Inputs from './Search_Inputs.jsx';


const Dashboard = (props) => (
  <div id="dashboard-container">
    <h5>Hey Chris, Who do you want to connect with today?</h5>
    <h1>Dashboard</h1>
 
    <Search_Inputs/>
  </div>

);

export default Dashboard;
