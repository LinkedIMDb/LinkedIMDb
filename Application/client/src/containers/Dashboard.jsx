import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Search_Inputs from '../components/Search_Inputs.jsx';
import SearchList from '../components/SearchList.jsx';

const style = {
  margin: 12,
  right: 12
};

const connectResults = [ { name: 'David Ayer', movie: 'Bright', department: 'Produced' },
{ name: 'Lindsay Graham',
  movie: 'Bright',
  department: 'Casting' },
{ name: 'Walter Mirisch',
  movie: 'The Magnificent Seven',
  department: 'Produced' },
{ name: 'Anthony Perkins',
  movie: 'Friendly Persuasion',
  department: 'Actor' },
{ name: 'Vera Miles',
  movie: 'The Searchers',
  department: 'Actor' },
{ name: 'John Ford',
  movie: 'The Quiet Man',
  department: 'Produced' },
{ name: 'Barry Fitzgerald',
  movie: 'Going My Way',
  department: 'Actor' },
{ name: 'Bing Crosby',
  movie: 'High Society',
  department: 'Actor' } ]

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="dashboard-container">
        <h5>Hey {this.props.user.firstname}, Who do you want to connect with today?</h5>
        <div id='heading1'>
          <h1>Dashboard
            <RaisedButton label="Log Out"
            primary style={style}
            onClick={this.props.logOut}
            />
          </h1>
        </div>
        <Search_Inputs firstname={this.props.user.firstname} lastname={this.props.user.lastname}/>
        <SearchList item={connectResults}/>
      </div>
    )
  }
}

export default Dashboard;
