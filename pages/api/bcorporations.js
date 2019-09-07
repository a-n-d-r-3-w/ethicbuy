import fs from 'fs';

export default (req, res) => {
  const json = fs.readFileSync('bcorporations.json');
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(json))
}
