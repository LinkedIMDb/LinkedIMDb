import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Search_Inputs from '../components/Search_Inputs.jsx';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="dashboard-container">
        <h5>Hey {this.props.user.firstname}, Who do you want to connect with today?</h5>
        <h1>Dashboard</h1>
    
        <Search_Inputs firstname={this.props.user.firstname} lastname={this.props.user.lastname}/>
      </div>
    )
  }
}

export default Dashboard;
