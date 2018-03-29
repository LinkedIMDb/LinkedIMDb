import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Search_Inputs from '../components/Search_Inputs.jsx';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // // set the initial component state
    // this.state = {
    //   user_id: '',
    //   firstname : '',
    //   lastname: ''
    // }
  }

  componentDidMount() {
    // fetch('/auth/verify', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   credentials: 'include'
    // }).then(res => res.json())
    // .then(res => {
    //   let signedIn = false;
    //   if (res && res.user_id) {
    //     signedIn = true;
    //   }
    //   let cookieChecked = true;
    //   this.setState({firstname : res.firstname, lastname : res.lastname});
    // });
  }

  render() {
    return (
      <div id="dashboard-container">
        <h5>Hey {this.props.firstname}, Who do you want to connect with today?</h5>
        <h1>Dashboard</h1>
    
        <Search_Inputs/>
      </div>
    )
  }
}

export default Dashboard;
