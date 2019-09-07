const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const csv = fs.readFileSync('bcorporations.csv');
const json = parse(csv);
const companyNamesWithDuplicates = json.map(company => company[0]);
const companyNames = [...new Set(companyNamesWithDuplicates)];

fs.writeFileSync('bcorporations.json', JSON.stringify(companyNames, null, 2));
