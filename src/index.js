function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  let arr = expr.split('').filter(item => item != '');
    let rightExpr = expr.replace(/\s/g, ""); // избавился от пробелов
    let bracketCounter = 0;
    
    
    // проверка на скобки
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



    let result = 0;
    arr.forEach((item, index) => {
      if (index == 0) {
        result = result + +arr[0];
      } else if (item == '+') {
        result = result + +arr[index +  1];
      } else if (item == '-') {
        result = result - +arr[index + 1];
      } else if (item == '*') {
        result = result * +arr[index + 1];
      } else if (item == '/') {
        if (arr[index + 1] == 0) {
          throw new TypeError ('TypeError: Division by zero.');
        } else {
          result = result / +arr[index + 1];
        };
      }
    });

    return result;
}

module.exports = {
    expressionCalculator
}