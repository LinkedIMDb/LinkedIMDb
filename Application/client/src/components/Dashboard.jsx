import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const Dashboard = (props) => (
  <div id="dashboard-container">
    <h5>Hey Chris, Who do you want to connect with today?</h5>
    <h1>Dashboard</h1>
    <form action='#' onSubmit={props.onSubmit}>
      <label>
        Name 1
          <input type="text" name="search-user1" value='Lauren MackUk'></input>
      </label>
      <label>
        Name 2
          <input type="text" name="search-user2" value='Woody Bird'></input>
      </label>
      <div className="button-line">
        <RaisedButton type="submit" label="Make Connections" primary />
      </div>
    </form>
  </div>

);

export default Dashboard;
