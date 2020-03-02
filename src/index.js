function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  let arr = expr.split('').filter(item => item != '');
    // проверка на скобки
    let bracketCounter = 0;
    for(let i = 0; i < arr.length; i++) {
      if(arr[i] === '(') {
        bracketCounter++;
      };
      if(arr[i] === ')') {
        bracketCounter--;
      }
    };
    if(bracketCounter !== 0) {
      throw new Error ('ExpressionError: Brackets must be paired');
    }

    // избавился от пробелов
    let rightExpr = expr.replace(/\s/g, ""); 

    //функции вычисления
    function sum(express) {
      let items = express.split('+');
      if(items.length > 1) {
        return +items[0] + +items[1];
      };
    };
    function minus(express) {
      let items = express.split('-');
      if(items.length > 1) {
        return +items[0] - +items[1];
      };
    };
    function mult(express) {
      let items = express.split('*');
      if(items.length > 1) {
        return +items[0] * +items[1];
      };
    };
    function div(express) {
      let items = express.split('/');
      if(items.length > 1) {
        return +items[0] / +items[1];
      };
    };
    function count(arr) {
      arr = arr.replace(/\b\d{0,}\*\b\d{0,}\b/g, mult);
      arr = arr.replace(/\b\d{0,}\/\b\d{0,}\b/g, div);
      arr = arr.replace(/\b\d{0,}\-\b\d{0,}\b/g, minus);
      arr = arr.replace(/\b\d{0,}\+\b\d{0,}\b/g, sum);
      return +arr;
    };

    let bracketResult = rightExpr.replace(/\(.*\)/g, count);
    let result = count(bracketResult);
    // arr.forEach((item, index) => {
    //   if (index == 0) {
    //     result = result + +arr[0];
    //   } else if (item == '+') {
    //     result = result + +arr[index +  1];
    //   } else if (item == '-') {
    //     result = result - +arr[index + 1];
    //   } else if (item == '*') {
    //     result = result * +arr[index + 1];
    //   } else if (item == '/') {
    //     if (arr[index + 1] == 0) {
    //       throw new TypeError ('TypeError: Division by zero.');
    //     } else {
    //       result = result / +arr[index + 1];
    //     };
    //   }
    // });

    return result;
}

module.exports = {
    expressionCalculator
}