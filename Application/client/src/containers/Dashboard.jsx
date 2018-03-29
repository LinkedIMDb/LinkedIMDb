import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Search_Inputs from '../components/Search_Inputs.jsx';
import SearchList from '../components/SearchList.jsx';
import { Link } from 'react-router-dom';

const style = {
  margin: 12,
  right: 12
};


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="dashboard-container">
        <h5>Hey {this.props.user.firstname}, Who do you want to connect with today?</h5>
        <div id='heading1'>

           <h1 id="brand-heading">LinkedIMDb</h1>

          <h1>Dashboard
            <Link to={'/'}>
              <RaisedButton label="Log Out"
                primary style={style}
                onClick={this.props.logOut}
              />
            </Link>
            <RaisedButton label="Saved"
              primary style={style}
              onClick={this.props.getSaved}
            />
          </h1>

        </div>
        <Search_Inputs firstname={this.props.user.firstname} lastname={this.props.user.lastname}/>
        <SearchList item={this.props.connectResults}/>
      </div>
    )
  }
}

export default Dashboard;
