start
  = FunctionExpression

FunctionExpression
  = fnName:FunctionIdentifier "(" params:Literal* ")" {
    return {
      type: "FunctionExpression",
      id: fnName,
      params: params
    }
  }

FunctionIdentifier
  = id:[A-Z]+ { return id.join("").toLowerCase(); }

Literal
  = StringLiteral
  / NumericLiteral

StringLiteral "string"
  = '"' chars:DoubleStringCharacter* '"' {
      return { type: "Literal", value: chars.join("") };
    }

NumericLiteral
  = DecimalLiteral

DecimalLiteral
  = DecimalIntegerLiteral "." DecimalDigit* {
      return { type: "Literal", value: parseFloat(text()) };
    }
  / DecimalIntegerLiteral {
      return { type: "Literal", value: parseInt(text()) };
  }

DecimalIntegerLiteral
  = "0"
  / NonZeroDigit DecimalDigit*

DecimalDigit
  = [0-9]

NonZeroDigit
  = [1-9]

DoubleStringCharacter
  = !('"' / "\\" / LineTerminator) SourceCharacter { return text(); }

SourceCharacter
  = .

LineTerminator
  = [\n\r\u2028\u2029]
