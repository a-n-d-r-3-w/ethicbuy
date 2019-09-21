import fs from 'fs';

// Import data instead of using readFile because readFile is not yet supported
// by Next.js API routes: https://github.com/zeit/next.js/issues/8251
import { bCorporations } from './bCorporations';

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
