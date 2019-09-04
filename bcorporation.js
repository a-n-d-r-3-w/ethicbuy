const fetch = require('isomorphic-unfetch');
const cheerio = require('cheerio')

const collect = async () => {
  const bcorporations = new Set();

  let pageNum = 0;
  while (true) {
    let url = 'https://bcorporation.net/directory';
    if (pageNum > 0) {
      url += `?page=${pageNum}`;
    }

    const res = await fetch(url);
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


// TODO: Update data on a regular basis.
collect().then(bcorporations => {
  // TODO: Store data in a file.
  console.log('Number of B corporations: ', bcorporations.size);
});
