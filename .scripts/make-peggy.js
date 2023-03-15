const { generate } = require('peggy');
const { globSync } = require('glob');
const { basename } = require('path');
const { readFileSync, writeFileSync } = require('fs');

try {
  
  files = globSync('grammars/**/*.peggy');

  files.forEach(f => {
    const grammar = readFileSync(f, 'utf8');
    const outputName = basename(f, '.peggy');
    writeFileSync(
      `src/${outputName}.grammar.js`,
      `export default ${generate(grammar, Object.assign({ output: 'source' }, {}))};`
    );
  });
} catch(err) {
  console.error(err);
  process.exit(1);
}
