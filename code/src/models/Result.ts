/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

export type Result<T> = [any?, T?];

export function success<T>(r: T): Result<T> {
  return [null, r];
}

export function failed(err: string): Result<any> {
  return [err, null];
}

export function is_ok(r: Result<any>) {
  return !r[0] && !!r[1];
}

export function has_failed(r: Result<any>) {
  return !is_ok(r);
}

export const not_found_result = failed('not found');

export const get_value = <T>(result: Result<T>) => result[1];
export const get_error = <T>(result: Result<T>) => result[0];
