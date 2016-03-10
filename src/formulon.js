"use strict"

import ASTBuilder from "./astBuilder"
import ASTWalker from "./astWalker"

const Formulon = {
  parse: function(formula, substitutions) {
    var ast = ASTBuilder.build(formula);
    return ASTWalker.walk(ASTWalker.replace(ast, substitutions));
  }
}

export default Formulon
