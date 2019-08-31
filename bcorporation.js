const fetch = require('isomorphic-unfetch');
const cheerio = require('cheerio')

const bcorporations = new Set();

const collect = async () => {
  let pageNum = 0;
  while (true) {
    console.log('pageNum: ', pageNum);
    const res = await fetch(`https://bcorporation.net/directory?page=${pageNum}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const cardTitles = $('.card__title');
    if (cardTitles.length === 0) {
      break;
    }
    cardTitles.each(function (index) {
      const bcorporation = $(this).html();
      console.log(bcorporation);
      bcorporations.add(bcorporation);
    })
    pageNum += 1;
  }
};


collect().then(() => {
  console.log('Number of B corporations: ', bcorporations.size);  
});
