/**
 * Projection Operators. https://docs.mongodb.com/manual/reference/operator/projection/
 */

import {
  assert,
  isNumber,
  resolve,
  slice
} from '../util'
import { Query } from '../query'

/**
 * Projects the first element in an array that matches the query condition.
 *
 * @param obj
 * @param field
 * @param expr
 */
export function $(obj: object, expr: any, field: string): any {
  throw new Error ('$ not implemented')
}

/**
 * Projects only the first element from an array that matches the specified $elemMatch condition.
 *
 * @param obj
 * @param field
 * @param expr
 * @returns {*}
 */
export function $elemMatch(obj: object, expr: any, field: string): any {
  let arr = resolve(obj, field)
  let query = new Query(expr)

  assert(Array.isArray(arr), '$elemMatch: invalid argument')

  for (let i = 0; i < arr.length; i++) {
    if (query.test(arr[i])) return [arr[i]]
  }
  return undefined
}

/**
 * Limits the number of elements projected from an array. Supports skip and limit slices.
 *
 * @param obj
 * @param field
 * @param expr
 */
export function $slice(obj: object, expr: any, field: string): any {
  let xs = resolve(obj, field)

  if (!Array.isArray(xs)) return xs

  if (Array.isArray(expr)) {
    return slice(xs, expr[0], expr[1])
  } else {
    assert(isNumber(expr), '$slice: invalid arguments for projection')
    return slice(xs, expr)
  }
}
