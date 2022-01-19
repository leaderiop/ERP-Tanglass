import * as T2W from 'numbers2words';
import {clone, cloneDeep} from 'lodash';

export type RequireExactlyOne<ObjectType, KeysType extends keyof ObjectType = keyof ObjectType> =
  {[Key in KeysType]: (
    Required<Pick<ObjectType, Key>> &
    Partial<Record<Exclude<KeysType, Key>, never>>
    )}[KeysType] & Omit<ObjectType, KeysType>;


export function arrToFixed(arr: Array<any>, digits: number) {
  arr.forEach((v, index) => {
    if (typeof v === 'number') {
      arr[index] = v.toFixed(digits);
    }
  })
}

const translator = new T2W("FR_FR");


export function numToWords(num: number) {
    let res = translator.toWords(parseInt(num.toString(), 10));
    if (num % 1 !== 0) {
      const fraction = Math.ceil(((num < 1.0) ? num : (num % Math.floor(num))) * 100)
      res += ' virgule ' + translator.toWords(parseInt((fraction%10 === 0 ? fraction/10:fraction).toString(), 10))
    }
    return res;
}

export function arrInnerJoin(arr1: any[], arr2: any[], key1:string, key2: string) {
  arr1 = cloneDeep(arr1);
  arr2 = cloneDeep(arr2);
  return arr1.map(
    e => Object.assign(
      e, arr2.find(k => e[key1] === k[key2]) ?? {id: null}
    )
  ).filter(e => e.id !== null);
}
