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
    // Check history to see if user has requested to view saved connections
    const showHistory = [];
    this.props.history.forEach((path, i) => {
      showHistory.push(<SearchList key={i} item={path} />)
    });

    return (
      <div id="dashboard-container">
        <h5>Hey {this.props.user.firstname}, Who do you want to connect with today?</h5>
        <div id='heading1'>

           <h1 id="brand-heading">LinkedIMDb</h1>

         <div id="nav-buttons">
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
          </div>

        </div>
        <Search_Inputs firstname={this.props.user.firstname} lastname={this.props.user.lastname}/>
        {this.props.connectResults.length > 0 && <SearchList item={this.props.connectResults}/>}
        <RaisedButton label="Save This Result"
              primary style={style}
              onClick={this.props.saveResult}
            />
        {this.props.history.length > 0 && showHistory}
      </div>
    )
  }
}

export default Dashboard;
