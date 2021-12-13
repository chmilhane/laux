import { get } from "underscore";
import * as b from "../builder";

export default class MatchStatement {
  constructor(generator, node) {
    this.generator = generator;
    this.node = node;
  }

  generate() {
    const node = this.node;
    const g = this.generator;

    if (node.inParens) {
      g.token("(");
    }

    g.token("(");
    g.word("function");
    g.token("(");
    g.token(")");

    // temp
    g.space();
    g.token("\n");
    g.token("\t");

    g.word("local");
    g.space();
    g.word("_laux__match_statement_value");
    g.space();
    g.token("=");
    g.space();
    g.print(node.identifier);
    g.token("\n"); // temp

    const body = node.body.filter(v => v != undefined);
    const defaultExpr = body.find(expr => expr.isDefaultExpression);

    if (body.find(expression => expression.type === "MatchConditonalMemberStatement")) {
      g.token("\t");
      g.word("assert");
      g.token("(");
      g.word("type(_laux__match_statement_value)");
      g.space();
      g.token("==");
      g.space();
      g.word("\"table\"")
      g.token(",");
      g.space();
      g.word("\"Conditional members require a table as input value\"");
      g.token(")");
    }

    for (let i = 0; i < body.length; i++) {
      const expr = body[i];
      if (expr === defaultExpr) continue;

      if (expr.type === "MatchConditonalMemberStatement") {
        for (let j = 0; j < expr.parameters.length; j++) {
          g.token("\t");
          g.word("local");
          g.space();
          g.token("_");
          g.token(",");
          g.space();
          // g.word("_laux__match_statement_arg_" + expr.parameters[j].name);
          g.word(expr.parameters[j].name);
          g.space();
          g.token("=");
          g.space();
          g.word(`next(_laux__match_statement_value${j > 0 ? `, ${j}` : ""})`);
          g.token("\n");
        }

        g.token("\t");
        g.word("if");
        g.space();
        g.token("(");
        g.print(expr.expression.left);
        g.token(")");
        g.space();
        g.word("then");
        g.token("\n");
        g.token("\t");
        g.token("\t");
        g.word("return");
        g.space();
        g.print(expr.expression.right);
        g.token("\n");
        g.token("\t");
        g.word("end");
      } else {
        g.token("\t");
        g.word("if");
        g.space();
        g.token("(");
        g.word("_laux__match_statement_value");
        g.space();
        g.token("==");
        g.space();
        g.print(expr.left);
        g.token(")");
        g.space();
        g.word("then");
        g.token("\n");
        g.token("\t");
        g.token("\t");
        g.word("return");
        g.space();
        g.print(expr.right);
        g.token("\n")
        g.token("\t");
        g.word("end");
      }

      if (i < body.length - (defaultExpr && 2 || 1)) g.token("\n");
    }

    // g.word("local");
    // g.space();
    // g.word("_laux__match_statement");
    // g.space();
    // g.token("=");
    // g.space();
    // g.token("{");
    // g.word("\n"); // temp

    // for (const key of Object.keys(node.body)) {
    //   const expression = node.body[key];
    //   if (expression.left.type != "BinaryExpression" && expression.left.operator != "|") continue;
      
    //   node.body.push(...this.parseSeveralValues(expression));

    //   delete node.body[key];
    // }

    // for (const expression of node.body.filter(v => v != undefined)) {
    //   g.word("\t"); // temp

    //   switch (expression.left.type) {
    //     case "TemplateStringLiteral":
    //       g.token("[");
    //       g.word(this.parseTemplateStringLiteral(expression.left.expressions).raw);
    //       g.token("]");
    //       break;

    //     case "NumericLiteral": case "StringLiteral":
    //       g.token("[");
    //       g.word(expression.left.raw);
    //       g.token("]");
    //       break;

    //     case "Identifier":
    //       g.word(expression.left.name);
    //       break;

    //     default:
    //       g.token("[");
    //       g.print(expression.left);
    //       g.token("]");
    //       break;
    //   }

    //   g.space();
    //   g.token("=");
    //   g.space();
    //   g.word("function()");
    //   g.space();
    //   g.word("return");
    //   g.space();

    //   switch (expression.right.type) {
    //     case "TemplateStringLiteral":
    //       g.word(this.parseTemplateStringLiteral(expression.right.expressions).raw);
    //       break;

    //     default:
    //       if (!expression.right.raw || !expression.right.value || !expression.right.name) {
    //         g.print(expression.right);
    //       } else {
    //         g.word(expression.right.raw || expression.right.value || expression.right.name || "");
    //       }
    //       break;
    //   }

    //   g.space();
    //   g.word("end");
    //   g.token(",");
    //   g.word("\n"); // temp
    // }

    // g.word("\n"); // temp
    // g.token("}");
    // g.space();
    // g.word("return");
    // g.space();
    // g.word("_laux__match_statement");
    // g.token("[");
    // g.word(node.identifier.name);
    // g.token("]");
    // g.space();
    // g.word("or");
    // g.space();
    // g.word("_laux__match_statement");
    // g.token(".");
    // g.word("_laux__match_default");

    if (defaultExpr) {
      g.token("\n");
      g.token("\t");
      g.word("return");
      g.space();
      g.print(defaultExpr.right);
    }

    g.token("\n");
    g.word("end");
    g.token(")");
    g.token("(");
    g.token(")");
    // g.token("(");
    // g.token(")");

    if (node.inParens) {
      g.token(")");
    }
  }

  parseSeveralValues(expression) {
    const values = [];

    let expr = expression.left;
    while (expr.left) {
      values.push(b.binaryExpression(
        expression.operator || "=>",
        b[expr.right.type[0].toLowerCase() + expr.right.type.slice(1)](expr.right.value, expr.right.raw),
        expression.right)
      );

      expr = expr.left;
    }

    // expr = expression.left.right;
    // values.push(b.binaryExpression(
    //   expression.operator || "=>",
    //   b[expr.type[0].toLowerCase() + expr.type.slice(1)](expr.value, expr.raw),
    //   expression.right)
    // );

    // let i = 0;
    // const getAllBinaryExpr = (v = []) => {
    //   i++;



    //   return v;
    // }

    // const expressions = getAllBinaryExpr([]);
    // expressions.push(expression.left.right);

    // expressions.forEach(expr => {
      // values.push(b.binaryExpression(
      //   expression.operator || "=>",
      //   b[expr.type[0].toLowerCase() + expr.type.slice(1)](expr.value, expr.raw),
      //   expression.right)
      // );
    // });

    return values;
  }
}