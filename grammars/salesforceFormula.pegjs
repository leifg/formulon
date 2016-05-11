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
      type: "callExpression",
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
      type: "callExpression",
      id: op === "+" ? "add" : "subtract",
      arguments: [head, tail]
    }
  }
  / MultiplicativeExpression

MultiplicativeExpression
  = head:(ExponentiateExpression) __ op:("*" / "/" ) __ tail:MultiplicativeExpression
  {
    return {
      type: "callExpression",
      id: op === "*" ? "multiply" : "divide",
      arguments: [head, tail]
    }
  }
  / ExponentiateExpression

ExponentiateExpression
  = head:(LogicalExpression) __ "^" __ tail:ExponentiateExpression
  {
    return {
      type: "callExpression",
      id: "exponentiate",
      arguments: [head, tail]
    }
  }
  / LogicalExpression

LogicalExpression
  = head:(LeftHandSideExpression) __ op:(LogicalCompareOperator / LogicalConcatinationOperator / ConcatinationOperator) __ tail:LogicalExpression
  {
    var name;
    switch(op) {
      case "&&":
        name = "and";
        break;
      case "||":
        name = "or"
        break;
      case "<":
        name = "lessThan"
        break;
      case "<=":
        name = "lessThanOrEqual"
        break;
      case ">":
        name = "greaterThan"
        break;
      case ">=":
        name = "greaterThanOrEqual"
        break;
      case "==":
      case "=":
        name = "equal"
        break;
      case "!=":
      case "<>":
        name = "unequal"
        break;
      case "&":
        name = "add"
        break;
      default:
    }

    return {
      type: "callExpression",
      id: name,
      arguments: [head, tail]
    }
  }
  / LeftHandSideExpression

LogicalCompareOperator
  = "<="
  / ">="
  / "<>"
  / "<"
  / ">"
  / "=="
  / "="
  / "!="

LogicalConcatinationOperator
  = "&&"
  / "||"

ConcatinationOperator
  = "&"

UnaryExpression
  = UnaryOperator __ tail:PrimaryExpression {
    return {
      type: "callExpression",
      id: "not",
      arguments: [tail]
    }
  }

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
        type: "identifier",
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
      return {
        type: "literal",
        value: chars.join(""),
        dataType: "text",
        options: {
          length: chars.length
        }
      };
    }

NumericLiteral
  = DecimalLiteral

DecimalLiteral
  = sign:(__ "+" / "-" __)? DecimalIntegerLiteral "." DecimalDigit* {
      var splitted = text().replace(/[\+\-]/g, "").split(".")
      return {
        type: "literal",
        value: parseFloat(text()),
        dataType: "number",
        options: {
          length: splitted[0].length,
          scale: splitted[1].length,
        }
      };
    }
  / sign:(__ "+" / "-" __)? DecimalIntegerLiteral {
      return {
        type: "literal",
        value: parseInt(text()),
        dataType: "number",
        options: {
          length: text().replace(/[\+\-]/g, "").length,
          scale: 0,
        }
      };
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
    return {
      type: "literal",
      value: true,
      dataType: "checkbox",
      options: {}
    }
  }
  / "FALSE" {
    return {
      type: "literal",
      value: false,
      dataType: "checkbox",
      options: {}
    }
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
