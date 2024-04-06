import { Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto) {
    const expressionArray = calcBody.expression.match(/\d+|\+|\-|\*|\//g);
    const operate = (num1: number, operator: string, num2: number): number => {
      switch (operator) {
        case '+':
          return num1 + num2;
        case '-':
          return num1 - num2;
        case '*':
          return num1 * num2;
        case '/':
          if (num2 === 0) {
            throw new Error('Division by zero');
          }
          return num1 / num2;
        default:
          throw new Error(`Invalid operator ${operator}`);
      }
    };
    let result = parseFloat(expressionArray[0]);
    for (let i = 1; i < expressionArray.length; i += 2) {
      const operator = expressionArray[i];
      const operand = parseFloat(expressionArray[i + 1]);
      result = operate(result, operator, operand);
    }

    return result;
  }
}
