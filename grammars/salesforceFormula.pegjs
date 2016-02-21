{
  function optionalList(value) {
    return value !== null ? value[0] : [];
  }
}

start
  = CallExpression
  / Identifier

CallExpression
  = fnName:FunctionIdentifier args:Arguments {
    return {
      type: "CallExpression",
      id: fnName,
      arguments: optionalList(args)
    }
  }

Arguments
  = "(" __ args:(ArgumentList __)? ")" {
      return args;
    }

ArgumentList
  = literals:(
    lit:Literal __ ","? __ {
      return lit;
    }
  )+ {
    return literals;
  }

FunctionIdentifier
  = id:[A-Z]+ { return id.join("").toLowerCase(); }

Identifier
  = name:IdentifierName { return name; }

IdentifierName
  = head:IdentifierStart tail:IdentifierPart* {
      return {
        type: "Identifier",
        name: head + tail.join("")
      };
    }

IdentifierStart
  = "_"
  / [A-Za-z]

IdentifierPart
  = IdentifierStart
  / DecimalDigit

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

__
  = (WhiteSpace)*

WhiteSpace "whitespace"
  = "\t"
  / "\v"
  / "\f"
  / " "
  / "\u00A0"
  / "\uFEFF"
