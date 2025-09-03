const display = document.getElementById("display");
const expressionDisplay = document.getElementById("expression-display");
const historyList = document.getElementById("history-list");

let expression = "";
let current = "";
let previous = "";
let operator = "";
let isResultShown = false;
let memory = 0;
let history = [];

function updateDisplay(val) {
  if (val.toString().replace('.', '').length > 8) {
    display.textContent = "ERR";
    current = "";
    return;
  }
  display.textContent = val;
}

function updateExpression() {
  expressionDisplay.textContent = expression || "0";
}

function appendToExpression(value) {
  if (isResultShown) {
    expression = "";
    current = "";
    isResultShown = false;
  }
  if (value === "pi") value = Math.PI.toFixed(3);
  if (value === "e") value = Math.E.toFixed(3);
  expression += value;
  updateExpression();
}

function appendDigit(digit) {
  if (current.replace('.', '').length >= 8) return;
  if (digit === '.' && current.includes('.')) return;

  current += digit;
  appendToExpression(digit);
  updateDisplay(current);
}

function clearLast() {
  if (current) {
    expression = expression.slice(0, -current.length);
    current = "";
    updateExpression();
    updateDisplay("0");
  } else {
    expression = expression.slice(0, -1);
    updateExpression();
    updateDisplay("0");
  }
}

function clearAll() {
  current = "";
  previous = "";
  expression = "";
  updateExpression();
  updateDisplay("0");
}

function toggleSign() {
  if (!current) return;

  current = (-parseFloat(current)).toString();
  updateDisplay(current);

  let lastNumberMatch = expression.match(/-?\d+\.?\d*$/);
  if (lastNumberMatch) {
    expression = expression.slice(0, -lastNumberMatch[0].length) + current;
    updateExpression();
  }
}

function calculateFullExpression() {
  try {
    let safeExpr = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/√/g, 'Math.sqrt')
      .replace(/log/g, 'Math.log10')
      .replace(/ln/g, 'Math.log')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/π/g, Math.PI)
      .replace(/e/g, Math.E)
      .replace(/exp/g, 'Math.exp')
      .replace(/\^/g, '**');

    let result = eval(safeExpr);
    result = +result.toFixed(3);

    if (result.toString().replace('.', '').length > 8) {
      updateDisplay("ERR");
      return;
    }

    history.push(`${expression} = ${result}`);
    updateHistory();
    updateDisplay(result);
    expression = result.toString();
    updateExpression();
    current = expression;
    isResultShown = true;
  } catch (err) {
    updateDisplay("ERR");
  }
}

function updateHistory() {
  historyList.innerHTML = "";
  history.slice(-10).forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

// Button Bindings
document.querySelectorAll(".number").forEach(btn => {
  btn.addEventListener("click", () => {
    appendDigit(btn.textContent);
  });
});

document.querySelector("[data-action='decimal']").addEventListener("click", () => {
  appendDigit(".");
});

document.querySelectorAll(".operator").forEach(btn => {
  btn.addEventListener("click", () => {
    const op = btn.dataset.operator;
    appendToExpression(op);
    current = "";
  });
});

document.querySelectorAll(".sci").forEach(btn => {
  btn.addEventListener("click", () => {
    const op = btn.dataset.operator;

    if (["pi", "e"].includes(op)) {
      appendToExpression(op);
      updateDisplay(op === "pi" ? Math.PI.toFixed(3) : Math.E.toFixed(3));
      current = op === "pi" ? Math.PI.toFixed(3) : Math.E.toFixed(3);
    } else if (["(", ")"].includes(op)) {
      appendToExpression(op);
    } else {
      appendToExpression(op + "(");
    }
  });
});

document.querySelector("[data-action='equals']").addEventListener("click", calculateFullExpression);

document.querySelector("[data-action='ac']").addEventListener("click", clearAll);
document.querySelector("[data-action='c']").addEventListener("click", clearLast);
document.querySelector("[data-action='sign']").addEventListener("click", toggleSign);

// Memory Buttons
document.querySelector("[data-action='mc']").addEventListener("click", () => {
  memory = 0;
});

document.querySelector("[data-action='mr']").addEventListener("click", () => {
  current = memory.toString();
  appendToExpression(current);
  updateDisplay(current);
});

document.querySelector("[data-action='mplus']").addEventListener("click", () => {
  memory += parseFloat(display.textContent) || 0;
});

document.querySelector("[data-action='mminus']").addEventListener("click", () => {
  memory -= parseFloat(display.textContent) || 0;
});

// Toggle panels
document.getElementById("toggle-scientific").addEventListener("click", () => {
  const sciButtons = document.querySelector(".scientific-buttons");
  sciButtons.classList.toggle("hidden");
});

document.getElementById("toggle-history").addEventListener("click", () => {
  const historyPanel = document.querySelector(".history-panel");
  historyPanel.classList.toggle("hidden");
});

// Initial display
updateDisplay("0");
updateExpression();

