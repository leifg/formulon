const { generate } = require('peggy');
const glob = require('glob');
const { basename } = require('path');
const { readFileSync, writeFileSync } = require('fs');

glob('grammars/**/*.peggy', {},(err, files) => {
  if(err) {
    console.error(err);
    process.exit(1);
  }
  files.forEach(f => {
    const grammar = readFileSync(f, 'utf8');
    const outputName = basename(f, '.peggy');
    writeFileSync(
      `src/${outputName}.grammar.js`,
      `export default ${generate(grammar, Object.assign({ output: 'source' }, {}))};`
    );
  });
});
