import { runMain } from "module"

function effectiveRate(irpf:number, income:number):number{
      const exponent = Math.pow(10, 2);
      const result = 100 * (irpf / income)
      const decimalResult =  Math.trunc( result * exponent) / exponent
    return decimalResult
}

export {
    effectiveRate
}