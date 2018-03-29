import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Search_Inputs from '../components/Search_Inputs.jsx';
import SearchList from '../components/SearchList.jsx';
import { Link } from 'react-router-dom';

// const connectResults = [ { name: 'David Ayer', movie: 'Bright', department: 'Produced' },
// { name: 'Lindsay Graham',
//   movie: 'Bright',
//   department: 'Casting' },
// { name: 'Walter Mirisch',
//   movie: 'The Magnificent Seven',
//   department: 'Produced' },
// { name: 'Anthony Perkins',
//   movie: 'Friendly Persuasion',
//   department: 'Actor' },
// { name: 'Vera Miles',
//   movie: 'The Searchers',
//   department: 'Actor' },
// { name: 'John Ford',
//   movie: 'The Quiet Man',
//   department: 'Produced' },
// { name: 'Barry Fitzgerald',
//   movie: 'Going My Way',
//   department: 'Actor' },
// { name: 'Bing Crosby',
//   movie: 'High Society',
//   department: 'Actor' } ]

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
        <SearchList item={this.props.connectResults}/>
        <RaisedButton label="Save This Result"
              primary style={style}
              onClick={this.props.saveResult}
            />
      </div>
    )
  }
}

export default Dashboard;
