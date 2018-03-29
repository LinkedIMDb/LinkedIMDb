import React from 'react'

const arrowStyle = {
  color: "#1E334E",
  fontSize: 80,
}

const SearchList = (props) => {
  const searchItems = props.item.slice(1).map((result, i, arr) => {
    let list = `worked on ${result.movie} with ${result.name} (${result.department})`;
      if (i !== 0) {
        list = 'who ' + list;  
      }
     return <li key={i} className='list-item'>{list}</li>
    
  })

  searchItems.unshift(<li key={-1} className='list-item'>{props.item[0].name}</li>);
  
  return (
    <ul className='search-list'>
      {searchItems}
    </ul>
  )
}


export default SearchList
