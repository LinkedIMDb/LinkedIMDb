const cheerio = require('cheerio');
const request = require('request');

let first = 'John';
let last = 'Smith';
let nameId;

request(`http://www.imdb.com/search/name?name=${first}+${last}`, (err, res, html) => {
  if (err) return console.log(err);
  let arr = [];
  let $ = cheerio.load(html);
  // console.log($('.lister-item-image a')[0].attribs.href);
  console.log(typeof $('.lister-item-image a')[0].attribs.href);
  nameId = $('.lister-item-image a')[0].attribs.href.slice(6);
  console.log(nameId);
})

request(`http://www.imdb.com/filmosearch?explore=title_type&role=nm0808774&ref_=filmo_ref_typ&sort=moviemeter,asc&mode=detail&page=1&title_type=movie`, (err, res, html) => {
  if (err) return console.log(err);
  let arr = [];
  let $ = cheerio.load(html);
  $('.lister-item-header a').each((i, elem) => {
    if (i < 10) {
      console.log(elem.attribs.href);
    }
  });
})

// request(`https://www.imdb.com/title/tt0499549/fullcredits`, (err, res, html) => {
//   if (err) return console.log(err);
//   let arr = [];
//   let $ = cheerio.load(html);
//   $('.cast_list .itemprop a').each((i, elem) => {
//     if (i < 10) {
//       // console.log(elem.attribs.href);
//     }
//   });
//   let creditsTables = $('#fullcredits_content .simpleCreditsTable');
//   let offset = 0;
//
//   $('#fullcredits_content .dataHeaderWithBorder').each((i, elem) => {
//     console.log(i);
//     let text = ($(elem).text()).split(' ');
//     if (elem.attribs.id) {
//       console.log('cast');
//       offset ++;
//     }
//
//     // console.log(`_${text}_`);
//     if ((text[0] === 'Directed' || text[0] === 'Produced' || text[0] === 'Casting') && text[1][1] === 'y') {
//       console.log('title', text[0]);
//       $(creditsTables[i - offset]).find('a').each((k, j) => {
//         console.log('k', k);
//         console.log('person id', j.attribs.href);
//       });
//     }
//   });
// })
