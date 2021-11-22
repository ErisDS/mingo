// Custom Aggregation Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#custom-aggregation-expression-operators

import { computeValue, Options } from "../../../core";
import { AnyVal, Callback, RawArray, RawObject } from "../../../types";

interface FunctionExpr {
  readonly body: Callback<AnyVal>;
  readonly args: RawArray;
  readonly lang: "js";
}

/**
 * Defines a custom function.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The expression for tht operator
 * @param {Options} options Options
 */
export function $function(
  obj: RawObject,
  expr: FunctionExpr,
  options?: Options
): AnyVal {
  const fn = computeValue(obj, expr, null, options) as FunctionExpr;
  return fn.body.apply(null, fn.args) as AnyVal;
}