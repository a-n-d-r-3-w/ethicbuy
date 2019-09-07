const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const csv = fs.readFileSync('bCorporations.csv');
const json = parse(csv);
const companyNamesWithDuplicates = json.map(company => company[0]);
const companyNames = [...new Set(companyNamesWithDuplicates)];

fs.writeFileSync('bCorporations.json', JSON.stringify(companyNames, null, 2));
