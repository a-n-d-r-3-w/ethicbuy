const fetch = require('isomorphic-unfetch');

const collect = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  console.log(res);
};

collect();
