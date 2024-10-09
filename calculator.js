let display = document.getElementById('display');

function addValue(value) {
  // Handling constants like π and e
  if (value === 'pi') {
    display.value += Math.PI;
  } else if (value === 'e') {
    display.value += Math.E;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = '';
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expression = display.value;

    // Replace trigonometric functions and convert degrees to radians
    expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin($1 * Math.PI / 180)');
    expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos($1 * Math.PI / 180)');
    expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan($1 * Math.PI / 180)');

    // Replace natural logarithm and common logarithm
    expression = expression.replace(/log\(([^)]+)\)/g, 'Math.log10($1)'); // Logarithm base 10
    expression = expression.replace(/ln\(([^)]+)\)/g, 'Math.log($1)');    // Natural logarithm

    // Replace square root
    expression = expression.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');

    // Replace factorial (we need a custom function for this)
    expression = expression.replace(/(\d+)!/g, function(match, number) {
      return factorial(parseInt(number));
    });

    // Evaluate the final expression
    let result = eval(expression);
    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}

// Factorial function
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
