
import { netCall } from "./netcall"

export const getAllOrders = async () =>{
    const res = await netCall("orders","get")
    return res
}

export function priceGroup(value) {
    return value?.match(/\d{1,3}(?=(\d{3})*$)/g)?.join(",");
  }

export function toFarsiNumber(n) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    const value =  n
    ?.toString()
    .split('')
    .map(x => farsiDigits[x] || x)
    .join('');

    return value
}