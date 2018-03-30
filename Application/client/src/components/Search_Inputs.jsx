import React, { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

class Search_Inputs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm1: props.firstname ? props.firstname + ' ' + props.lastname : '',
      searchTerm2: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    console.log(target);

    this.setState( {
     [event.target.name]: event.target.value
    });
  }
  // Submit Search
  handleSubmit(event) {
    event.preventDefault();

    // Send fetch request with our two names
    let startName = this.state.searchTerm1;
    let endName = this.state.searchTerm2;

    window
      .fetch(`http://localhost:8000/connections/${startName}/${endName}`)
        .then(res => res.json())
        .then(path => {
          // Set the connections Results with our response
          console.log(path);
          if (path === 'invalid names') return;
          this.props.getPath(path);
        })
  }

  render() {
    return (
      <div id="search-input-container" >
        <form action='#' onSubmit={this.handleSubmit}>
          <label>
            Connect
              <input
                type="text"
                id="searchTerm1"
                value={this.state.searchTerm1}
                name="searchTerm1"
                onChange={this.handleChange}
              />
          </label>
          <label>
           to
              <input
                type="text"
                id="searchTerm2"
                value={this.state.searchTerm2}
                name="searchTerm2"
                onChange={this.handleChange}
              />
          </label>
          <div className="button-line">
            <RaisedButton type="submit" label="Make Connections" primary style={style}/>
          </div>
        </form>
      </div>
    )
  }
}

export default Search_Inputs
