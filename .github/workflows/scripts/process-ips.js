const fs = require('fs');
const path = require('path');
const { excludeCidr } = require('cidr-tools');

const textDir = 'roscomvpn-geoip/release/text';
const files = fs.readdirSync(textDir);

let allRanges = [];

files.forEach(file => {
  const filePath = path.join(textDir, file);
  const content = fs.readFileSync(filePath, 'utf8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.includes(':'));
  allRanges = allRanges.concat(content);
});

console.log(`Прочитано ${allRanges.length} IPv4 диапазонов`);

const merged = excludeCidr(allRanges, []);

fs.writeFileSync('AllowedIPs.txt', merged.join(', '), 'utf8');

console.log(`Записано ${merged.length} уникальных IPv4 диапазонов`);
