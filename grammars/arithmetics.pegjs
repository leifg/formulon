/*
 * Arithmetics
 * ==========================
 * Accepts expressions like "2 * (3 + 4)" and computes their value.
 */

expression
  = head:term tail:(_ ("+" / "-") _ term)* {
      var result = head, i;

      for (i = 0; i < tail.length; i++) {
        if (tail[i][1] === "+") { result += tail[i][3]; }
        if (tail[i][1] === "-") { result -= tail[i][3]; }
      }

      return result;
    }

term
  = head:factor tail:(_ ("*" / "/") _ factor)* {
      var result = head, i;

      for (i = 0; i < tail.length; i++) {
        if (tail[i][1] === "*") { result *= tail[i][3]; }
        if (tail[i][1] === "/") { result /= tail[i][3]; }
      }

      return result;
    }

factor
  = "(" _ expr:expression _ ")" { return expr; }
  / integer

integer "integer"
  = [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*


