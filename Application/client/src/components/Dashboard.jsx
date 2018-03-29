import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Search_Inputs from './Search_Inputs.jsx';
import SearchList from './SearchList.jsx';

const connectResults = [
  {
    name: 'James', 
    department: 'Casting', 
    movie: 'Ghostbusters'
  },
  { 
    name: 'Max', 
    department: 'Actor', 
    movie: 'Black Panther'
  },
  { 
    name: 'Chris', 
    department: 'Actor', 
    movie: 'The Blues'
  },
  { 
    name: 'Annie', 
    department: 'Actress', 
    movie: 'The Mathemetician'
  }

]

const Dashboard = (props) => (
  <div id="dashboard-container">
    <h5>Hey Chris, Who do you want to connect with today?</h5>
    <h1>Dashboard</h1>
 
    <Search_Inputs/>
    <SearchList item={connectResults} />
  </div>

);

export default Dashboard;
