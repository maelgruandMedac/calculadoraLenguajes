let currentInput = "";
let lastAnswer = "";
let resultDisplay = document.getElementById("result");

function appendNumber(num) {
    currentInput += num;
    updateDisplay();
}

function appendOperator(operator) {
    if (currentInput === "" && operator !== ".") return; // Évite les opérateurs en premier
    if (currentInput.slice(-1).match(/[+\-*/.]/)) return; // Évite deux opérateurs consécutifs
    currentInput += operator;
    updateDisplay();
}

function appendParenthesis(paranthesis) {
    // Gère l'ajout de parenthèses
    if (paranthesis === "(") {
        if (currentInput === "" || currentInput.slice(-1).match(/[+\-*/(]/)) {
            currentInput += "(";
        }
    } else if (paranthesis === ")") {
        if (currentInput === "" || currentInput.slice(-1).match(/[+\-*/(]/)){
            return; // Empêche la fermeture de parenthèse si ce n'est pas valide
        }
        currentInput += ")";
    }
    updateDisplay();
}

function clearResult() {
    currentInput = "";
    updateDisplay();
}

function calculate() {
    try {
        // Remplace les fonctions spécifiques par leur équivalent JavaScript
        let expression = currentInput.replace(/√/g, "Math.sqrt").replace(/!/g, "factorial");

        // Sécurise l'exécution de l'expression
        if (isValidExpression(expression)) {
            lastAnswer = eval(expression).toString(); // Utilise `eval` avec précaution
            currentInput = lastAnswer;
        } else {
            currentInput = "Error";
        }
    } catch {
        currentInput = "Error";
    }
    updateDisplay();
}

function updateDisplay() {
    resultDisplay.textContent = currentInput || "0"; // Affiche 0 si vide
}

function useLastAnswer() {
    currentInput += lastAnswer;
    updateDisplay();
}

function isValidExpression(expression) {
    // Vérifie si l'expression est valide (ne contient pas de caractères invalides)
    return /^[\d+\-*/().\s]*$/.test(expression);
}

document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (!isNaN(key)) {
        appendNumber(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === ".") {
        appendOperator(key);
    } else if (key === "(" || key === ")") {
        appendParenthesis(key);
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    } else if (key === "Escape") {
        clearResult();
    }
});
// Ajout de la fonction clearParse
function clearParse() {
    currentInput = currentInput.slice(0, -1); // Supprime le dernier caractère
    updateDisplay(); // Mise à jour de l'affichage
}
