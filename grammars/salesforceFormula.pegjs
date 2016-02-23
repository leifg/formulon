{
  function optionalList(value) {
    return value !== null ? value[0] : [];
  }
}

start
  = PrimaryExpression

PrimaryExpression
  = ArithmeticExpression
  / UnaryExpression
  / CallExpression
  / Identifier
  / Literal

LeftHandSideExpression
  = CallExpression
  / Identifier
  / Literal
  / "(" __ expression:ArithmeticExpression __ ")" { return expression; }

CallExpression
  = id:FunctionIdentifier args:Arguments {
    return {
      type: "CallExpression",
      id: id,
      arguments: optionalList(args)
    }
  }

ArithmeticExpression
  = AdditiveExpression

AdditiveExpression
  = head:(MultiplicativeExpression) __ op:("+" / "-" ) __ tail:AdditiveExpression
  {
    return {
      type: "CallExpression",
      id: op === "+" ? "add" : "subtract",
      arguments: [head, tail]
    }
  }
  / MultiplicativeExpression

MultiplicativeExpression
  = head:(ExponentiateExpression) __ op:("*" / "/" ) __ tail:MultiplicativeExpression
  {
    return {
      type: "CallExpression",
      id: op === "*" ? "multiply" : "divide",
      arguments: [head, tail]
    }
  }
  / ExponentiateExpression

ExponentiateExpression
  = head:(BinaryExpression) __ "^" __ tail:ExponentiateExpression
  {
    return {
      type: "CallExpression",
      id: "exponentiate",
      arguments: [head, tail]
    }
  }
  / BinaryExpression

BinaryExpression
  = head:(LeftHandSideExpression) __ op:LogicalOperator __ tail:BinaryExpression
  {
    var name;
    switch(op) {
      case "&&":
        name = "and";
        break;
      case "||":
        name = "or"
        break;
      case "==":
      case "=":
        name = "equal"
        break;
      default:
    }

    return {
      type: "CallExpression",
      id: name,
      arguments: [head, tail]
    }
  }
  / LeftHandSideExpression

LogicalOperator
  = "&&"
  / "||"
  / "=="
  / "="

UnaryExpression
  = UnaryOperator __ tail:PrimaryExpression {
    return {
      type: "CallExpression",
      id: "not",
      arguments: [tail]
    }
  }

LogicalExpression
  = UnaryExpression
  / BinaryExpression

UnaryOperator
  = "!"

Arguments
  = "(" __ args:(ArgumentList __)? ")" {
      return args;
    }

ArgumentList
  = args:(
    arg:PrimaryExpression __ ","? __ {
      return arg;
    }
  )+ {
    return args;
  }

FunctionIdentifier
  = id:[A-Z]+ { return id.join("").toLowerCase(); }

Identifier
  = !ReservedKeyword name:IdentifierName { return name; }

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
  / BooleanLiteral

StringLiteral
  = '"' chars:DoubleStringCharacter* '"' {
      return { type: "Literal", value: chars.join("") };
    }

NumericLiteral
  = DecimalLiteral

DecimalLiteral
  = sign:(__ "+" / "-" __)? DecimalIntegerLiteral "." DecimalDigit* {
      return { type: "Literal", value: parseFloat(text()) };
    }
  / sign:(__ "+" / "-" __)? DecimalIntegerLiteral {
      return { type: "Literal", value: parseInt(text()) };
  }

DecimalIntegerLiteral
  = "0"
  / NonZeroDigit DecimalDigit*

DecimalDigit
  = [0-9]

NonZeroDigit
  = [1-9]

BooleanLiteral
  = "TRUE" {
    return { type: "Literal", value: true }
  }
  / "FALSE" {
    return { type: "Literal", value: false }
  }

DoubleStringCharacter
  = !('"' / "\\" / LineTerminator) SourceCharacter { return text(); }

SourceCharacter
  = .

LineTerminator
  = [\n\r\u2028\u2029]

ReservedKeyword
  = BooleanLiteral

__
  = (WhiteSpace)*

WhiteSpace
  = "\t"
  / "\v"
  / "\f"
  / " "
  / "\u00A0"
  / "\uFEFF"
