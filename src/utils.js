import Decimal from 'decimal.js';
import { timeParser } from './parsers';
import FormulonRuntimeError from './errors/FormulonRuntimeError';

const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

// Salesforce rounding works slightly different than JS rounding
// JS:
// Math.round(-1.5) => -1
// SF:
// ROUND(-1.5) => -2
export const sfRound = (number, numDigits) => {
  if (number.isNegative()) {
    return sfRound(number.times(-1), numDigits).times(-1);
  }
  const multiplier = new Decimal(10).toPower(numDigits);
  return number.times(multiplier).round().dividedBy(multiplier);
};

// private

const calculateDecimalOptions = (decimal) => ({
  length: Math.max(decimal.precision(true) - decimal.decimalPlaces(), 1),
  scale: decimal.decimalPlaces(),
});

const calculateNumberOptions = (number) => {
  const numberString = (number).toString().replace('-', '');
  if (numberString.indexOf('.') !== -1) {
    const splitted = numberString.split('.');
    return {
      length: splitted[0].length,
      scale: splitted[1].length,
    };
  }

  return {
    length: numberString.length,
    scale: 0,
  };
};

const coerceValue = (dataType, value, options) => {
  switch (dataType) {
    case 'number':
      return sfRound(value, options.scale);
    case 'text':
      return value.substring(0, options.length);
    default:
      return value;
  }
};

const geolocationFormat = (latitude, longitude) => {
  if ((!latitude || !longitude) && (latitude !== 0 && longitude !== 0)) return '';

  return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
};

// public

export const buildLiteralFromJs = (input) => {
  const base = { type: 'literal', value: input };

  if (input === null || input === undefined) {
    return Object.assign(
      base,
      { value: null, dataType: 'null', options: {} },
    );
  }

  const type = typeof input;

  if (type === 'object' && input instanceof Decimal) {
    return Object.assign(
      base,
      { value: input, dataType: 'number', options: calculateDecimalOptions(input) },
    );
  }

  switch (type) {
    case 'number':
      return Object.assign(
        base,
        { value: new Decimal(input), dataType: 'number', options: calculateNumberOptions(input) },
      );
    case 'string':
      return Object.assign(
        base,
        { dataType: 'text', options: { length: input.length } },
      );
    case 'boolean':
      return Object.assign(
        base,
        { dataType: 'checkbox', options: {} },
      );
    default:
      throw new TypeError(`Unsupported type '${type}'`);
  }
};

export const parseTime = (input) => {
  try {
    return timeParser.parse(input);
  } catch (err) {
    if (err instanceof timeParser.SyntaxError) {
      return buildLiteralFromJs(null);
    }

    throw err;
  }
};

export const buildErrorLiteral = (errorType, message, options) => ({
  type: 'error',
  errorType,
  message,
  ...options,
});

export const buildDateLiteral = (yearOrDateObj, month, day) => {
  if (yearOrDateObj instanceof Date) {
    return buildDateLiteral(
      yearOrDateObj.getUTCFullYear(),
      yearOrDateObj.getUTCMonth() + 1,
      yearOrDateObj.getUTCDate(),
    );
  }

  return {
    type: 'literal',
    dataType: 'date',
    value: new Date(Date.UTC(yearOrDateObj, month - 1, day)),
    options: {},
  };
};

export const buildDatetimeLiteral = (unixTimestamp) => ({
  type: 'literal',
  dataType: 'datetime',
  value: new Date(unixTimestamp),
  options: {},
});

export const buildGeolocationLiteral = (latitude, longitude) => ({
  type: 'literal',
  dataType: 'geolocation',
  value: [latitude, longitude],
  options: {},
});

export const buildPicklistLiteral = (value, values) => ({
  type: 'literal',
  dataType: 'picklist',
  value,
  options: { values },
});

export const buildMultipicklistLiteral = (value, values) => ({
  type: 'literal',
  dataType: 'multipicklist',
  value,
  options: { values },
});

export const buildTimeLiteral = (msFromMidnight) => {
  const timestamp = msFromMidnight instanceof Decimal ? msFromMidnight.toNumber() : msFromMidnight;

  return {
    type: 'literal',
    dataType: 'time',
    value: new Date(timestamp),
    options: {},
  };
};

export const arrayUnique = (array) => array.reduce((p, c) => {
  if (p.indexOf(c) < 0) p.push(c);
  return p;
}, []);

export const coerceLiteral = (input) => {
  if (input.value === undefined || input.value === null || Number.isNaN(input.value)) {
    return {
      type: 'literal',
      value: null,
      dataType: 'null',
      options: {},
    };
  }

  return {
    ...input,
    value: coerceValue(input.dataType, input.value, input.options),
  };
};

export const handleFormulonError = (fn) => {
  try {
    return fn();
  } catch (err) {
    if (err instanceof FormulonRuntimeError) {
      return buildErrorLiteral(err.errorType, err.message, err.options);
    }

    throw err;
  }
};

// shamelessly stolen from https://stackoverflow.com/a/12793246/1087469
export const addMonths = (date, numOfMonths) => {
  const newMonth = numOfMonths.plus(date.getUTCMonth());
  const newDate = new Date(Date.UTC(date.getUTCFullYear(), newMonth.toNumber(), date.getUTCDate()));

  if (date.getUTCDate() !== newDate.getUTCDate()) {
    newDate.setUTCDate(0);
  }

  return newDate;
};

export const addDays = (date, numOfDays) => (
  new Date(numOfDays.times(MILLISECONDS_IN_DAY).plus(date.getTime()).toNumber())
);

export const daysDifference = (date1, date2) => (
  new Decimal(date1.getTime()).minus(date2.getTime()).dividedBy(MILLISECONDS_IN_DAY)
);

export const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

export const formatLiteral = (literal) => {
  if (!literal.value && literal.dataType !== 'null' && literal.value !== 0 && literal.value !== false && literal.value !== '') return '';

  switch (literal.dataType) {
    case 'null':
      return 'NULL';
    case 'number':
      return literal.value.toString();
    case 'text':
    case 'picklist':
      return `"${literal.value}"`;
    case 'multipicklist':
      return `[${literal.value.map((value) => `"${value}"`).join(', ')}]`;
    case 'checkbox':
      return literal.value.toString().toUpperCase();
    case 'date':
      return `${literal.value.getUTCFullYear()}-${(literal.value.getUTCMonth() + 1).toString().padStart(2, '0')}-${literal.value.getUTCDate().toString().padStart(2, '0')}`;
    case 'datetime':
      return literal.value.toISOString();
    case 'time':
      return literal.value.toISOString().split('T')[1].replace('Z', '');
    case 'geolocation':
      return geolocationFormat(literal.value[0], literal.value[1]);
    default:
      return undefined;
  }
};
