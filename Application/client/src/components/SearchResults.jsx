import React from 'react'


class SearchResults extends React.Component {
  render() {
    
    const matches = ['Jim', 'Sara', 'Max', 'Annie'];
    const listItems = matches.map((match) => {
      <li>{match}</li>
    });  

    return (
     <div>
        <ul>{listItems}</ul>
      </div>
    );
  }
}


export default SearchResults