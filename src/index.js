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

    expr = expr.replace(/-/g, " - "); 
    expr = expr.replace(/\+/g, " + ");
    expr = expr.replace(/\*/g, " * ");
    expr = expr.replace(/\//g, " / ");
    expr = expr.replace(/\(/g, "( ");
    expr = expr.replace(/\)/g, " )");
    expr = expr.replace(/\s\s/g, " ").trim();

    function count(ex) {
      if(ex[0] == '(' && ex[ex.length - 1] == ')') {
        ex = ex.replace(/^\(/g, ' ');
        ex = ex.replace(/\)$/g, ' ').trim().trim();
      }
      ex = ex.replace(/\(.*\)/g, count);
      let arr = ex.split(' ');
      firstArr = [];
      secondArr = [];
      for(let i = 0; i < arr.length; i++) {
        if (arr[i] == '*') {
          let mult = +firstArr.pop() * +arr[i+1];
          i++;
          firstArr.push(mult);
        } else if (arr[i] == '/') {
          if (arr[i+1] == 0) {
            throw new Error ("TypeError: Division by zero.");
          }
          let div = +firstArr.pop() / +arr[i+1];
          i++;
          firstArr.push(div);
        } else {
          firstArr.push(arr[i]);
        }
      }
      for(let j = 0; j < firstArr.length; j++) {
        if (firstArr[j] == '+') {
          let sum = +secondArr.pop() + +firstArr[j+1];
          j++;
          secondArr.push(sum);
        } else if (firstArr[j] == '-') {
          let min = +secondArr.pop() - +firstArr[j+1];
          j++;
          secondArr.push(min);
        } else {
          secondArr.push(firstArr[j]);
        }
      }
      return secondArr.join('');
    };
    let re = /[\(\)]/g;

    if (re.test(expr)) {
      expr = expr.replace(/\([\w\+\/\*\-\s\.]*?\)/g, count);
    }
    if (re.test(expr)) {
      expr = expr.replace(/\([\w\+\/\*\-\s\.]*?\)/g, count);
    }
    if (re.test(expr)) {
      expr = expr.replace(/\([\w\+\/\*\-\s\.]*?\)/g, count);
    }
    if (re.test(expr)) {
      expr = expr.replace(/\([\w\+\/\*\-\s\.]*?\)/g, count);
    }
    
    let result = count(expr);

    return +result;
}

module.exports = {
    expressionCalculator
}