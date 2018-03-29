import React from 'react'

// const connectResults = [
//   {
//     name: 'James', 
//     department: 'Casting', 
//     movie: 'Ghostbusters'
//   },
//   { 
//     name: 'Max', 
//     department: 'Actor', 
//     movie: 'Black Panther'
//   },
//   { 
//     name: 'Chris', 
//     department: 'Actor', 
//     movie: 'The Blues'
//   },
//   { 
//     name: 'Annie', 
//     department: 'Actress', 
//     movie: 'The Mathemetician'
//   }

// ]

// // iterate through array of objects
// // list items one by one

// // add div
// // paragrah tag
// // add name
// // span tag
// // add arrow
// // (add movie of second item in list)
// // span arrow


// // const arrowStyle = {
// //   color: "#1E334E",
// //   fontSize: 80,
// // }

// // const listResults = (connectResults) => {
// //   for(let i = 0; i < connectResults.length; i++) {
// //     <div class='search-results'>
// //       <p class='search-user-results'>{users[i].name}</p>
// //       <span style={arrowStyle}>&#8595;</span>
// //       <p class='search-movie-results'>{users[i + 1].movie}</p>
// //       <span style={arrowStyle}>&#8595;</span> 
// //     </div>
// //     console.log(connectResults[i]);
// //   }
// // }

// // function listResults(connectResults) {
// //   const listItems = connectResults.map((user) => {
// //     console.log(list_jsx(user))
// //   })
  
// // }



// // clas list_jsx = (user) => {
// //    <div class='search-results'>
// //       <p class='search-user-results'>{user.name}</p>
// //       <span style={arrowStyle}>&#8595;</span>
// //       <p class='search-movie-results'>{user.movie}</p>
// //       <span style={arrowStyle}>&#8595;</span> 
// //     </div>
// //     // console.log(user);
// // }

// const SearchListItem = (props) => {
//   return (
//     <div className='list-item'>
//       <li>
//         <p>Star worked on Black Panther with Max</p>
//         <p>who worked with Annie on Forest Gump with Chris</p>
//       </li>
//     </div>
//   )
// }
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
     return <li className='list-item'>{list}</li>
    
  })

  searchItems.unshift(<li className='list-item'>{props.item[0].name}</li>);
  
  return (
    <ul className='search-list'>
      {searchItems}
    </ul>
  )
}



export default SearchList

// Database object returned
// [ {name, department, movie }]