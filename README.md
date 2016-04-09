# Formulon

**DISCLAIMER:** Under heavy development, far from feature complete. See [Contributing](CONTRIBUTING.md) for details

Formulon is a Parser for [Salesforce Formulas](https://help.salesforce.com/apex/HTViewHelpDoc?id=customize_functions.htm) completely written in ECMA Script 2015.

## Usage

### parse

This method will return a object holding value and its metadata

```javascript
import { parse } from 'formulon'
```

#### Examples

```javascript
parse('IF(TRUE, "True String", "False String")')
// {
//  type: 'literal',
//  value: 'True String',
//  dataType: 'text',
//  options: { length: 11 }
// }
```

`type`: Metadata from the parser (always `literal`)
`value`: The actual value of the result
`dataType`: The type of the return (currently `number`, `text`, or `checkbox`)
`options`: different options per data type

#### Data Types

Currently the following data types are supported (naming is taken from the Salesforce Field Types):

  - Number (Integer or Float depending on the options)
  - Text
  - Checkbox (TRUE or FALSE)

#### Options

Options depend on the data type:

##### Number

  - Length: Number of digits to the left of the decimal point
  - Scale: Number of digits to the right of the decimal point

##### Text

  - Length: Number of characters

##### Checkbox

*no options*
