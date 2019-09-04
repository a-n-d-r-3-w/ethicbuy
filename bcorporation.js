const cheerio = require('cheerio');
const fetch = require('isomorphic-unfetch');
const fs = require('fs');

const collect = async () => {
  const bcorporations = new Set();

  // Mock data
  bcorporations.add('Destination');
  bcorporations.add('Pulse Brands Limited');
  bcorporations.add('People With Purpose');
  bcorporations.add('Cathexis Consulting Inc');
  bcorporations.add('National Energy Improvement Fund');
  bcorporations.add('Project Gen Z');
  bcorporations.add('Patagonia');
  return bcorporations;

  let pageNum = 0;
  while (pageNum === 0) {
    console.log('pageNum: ', pageNum);
    let url = 'https://bcorporation.net/directory';
    if (pageNum > 0) {
      url += `?page=${pageNum}`;
    }

    const res = await fetch(url);
    console.log('res:');
    console.log('--------')
    console.log(res);
    console.log('--------')
    const html = await res.text();

    const $ = cheerio.load(html);
    const cardImages = $('.card img');
    if (cardImages.length === 0) {
      break;
    }

    cardImages.each(function () {
      const bcorporation = $(this).attr('title');
      console.log(bcorporation);
      bcorporations.add(bcorporation);
    })

    pageNum += 1;
  }

  return bcorporations;
};

collect().then(bcorporations => {
  fs.writeFileSync('bcorporations.json', JSON.stringify(Array.from(bcorporations), null, 2));
});
