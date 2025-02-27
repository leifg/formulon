import {
  build, extract as astExtract, replace, traverse,
} from './ast';
import {
  arrayUnique, buildLiteralFromJs, coerceLiteral, formatLiteral,
  preprocessFormulaString,
} from './utils';

export const parse = (formula, substitutions = {}) => {
  if (formula == null || formula.trim() === '') {
    return buildLiteralFromJs('');
  }

  const ast = build(preprocessFormulaString(formula));

  const coercedSubstitutions = Object.keys(substitutions).reduce((previous, current) => (
    {
      ...previous,
      [current]: coerceLiteral(substitutions[current]),
    }
  ), {});

  return traverse(replace(ast, coercedSubstitutions));
};

export const extract = (formula) => {
  if (formula == null || formula.trim() === '') {
    return [];
  }

  const ast = build(formula);
  return arrayUnique(astExtract(ast));
};

export const ast = (formula) => {
  if (formula == null || formula.trim() === '') {
    return {};
  }

  return build(formula);
};

export const toString = (literal) => formatLiteral(literal);
