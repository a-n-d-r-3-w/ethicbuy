import fs from 'fs';

const json = fs.readFileSync('bCorporations.json');
const bCorporations = JSON.parse(json);

export default (req, res) => {
  const brand = req.query.brand;
  const isBCorporation = !!bCorporations.find(bCorporation => {
    const words = bCorporation.split(' ');
    return words.includes(brand);
  });
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ isBCorporation }));
}
