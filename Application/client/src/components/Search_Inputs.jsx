import React, { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class Search_Inputs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};

  }
  // Submit Search
  handleSubmitSearch() {
    console.log('submitted');
  }

  render() {
    return (
      <div>
        <form action='#' onSubmit={this.handleSubmitSearch}>
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
    )
  }

  
}

export default Search_Inputs