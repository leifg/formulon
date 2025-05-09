import terser from '@rollup/plugin-terser';

export default [{
  /* NodeJS - CommonJS format */
  input: 'src/formulon.js',
  output: {
    dir: 'lib',
    format: 'cjs',
    globals: {
      'decimal.js': 'Decimal',
    },
  },
  external: ['decimal.js'],
},
{
  // Browsers - UMD format

  input: 'src/formulon.js',
  output: {
    file: 'lib/formulon.min.js',
    format: 'umd',
    globals: {
      'decimal.js': 'Decimal',
    },
    name: 'formulon',
  },
  external: ['decimal.js'],
  plugins: [
    terser(),
  ],
},
{
  // LWC - requires ES code/exports
  input: 'src/formulon.js',
  output: {
    file: 'lib/formulon.lwc.min.js',
    format: 'esm',
    globals: {
      'decimal.js': 'Decimal',
    },
  },
  external: ['decimal.js'],
  plugins: [
    terser(),
  ],
},
];
