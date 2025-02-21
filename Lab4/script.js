var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a, _b, _c;
// Инициализация состояния
var state = {
    current: "0",
    previous: "",
    operation: null,
};
// Функции для операций
var operations = {
    add: function (a, b) { return a + b; },
    subtract: function (a, b) { return a - b; },
    multiply: function (a, b) { return a * b; },
    divide: function (a, b) { return a / b; },
    power: function (a, b) { return Math.pow(a, b); },
};
// Функция для обновления дисплея
var updateDisplay = function () {
    var display = document.getElementById("display");
    if (display)
        display.textContent = state.current;
};
// Иммутабельное обновление состояния
var updateState = function (newState) {
    state = __assign(__assign({}, state), newState);
    updateDisplay();
};
// Добавление числа
var appendNumber = function (num) {
    if (state.current === "0" || (state.operation && state.previous === state.current)) {
        updateState({ current: num });
    }
    else {
        updateState({ current: state.current + num });
    }
};
// Добавление десятичной точки
var appendDecimal = function () {
    if (!state.current.includes(".")) {
        updateState({ current: state.current + "." });
    }
};
// Установка операции
var setOperation = function (operation) {
    if (!state.current)
        return;
    updateState({ previous: state.current, current: "", operation: operation });
};
// Выполнение вычисления
var calculate = function () {
    if (!state.operation || !state.previous || !state.current)
        return;
    var a = parseFloat(state.previous);
    var b = parseFloat(state.current);
    var operationFunction = operations[state.operation];
    if (operationFunction) {
        var result = operationFunction(a, b);
        updateState({
            current: Number.isInteger(result) ? result.toString() : result.toFixed(4),
            previous: "",
            operation: null,
        });
    }
};
// Вычисление квадратного корня
var handleSqrt = function () {
    var num = parseFloat(state.current);
    if (num < 0) {
        alert("Ошибка: отрицательное число!");
        return;
    }
    updateState({ current: Math.sqrt(num).toString() });
};
// Очистка дисплея
var clear = function () { return updateState({ current: "0", previous: "", operation: null }); };
// Привязка событий к кнопкам
document.querySelectorAll("[data-number]").forEach(function (button) {
    button.addEventListener("click", function () { return appendNumber(button.getAttribute("data-number")); });
});
(_a = document.querySelector("[data-decimal]")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", appendDecimal);
document.querySelectorAll("[data-operation]").forEach(function (button) {
    var op = button.getAttribute("data-operation");
    if (op === "sqrt") {
        button.addEventListener("click", handleSqrt);
    }
    else {
        button.addEventListener("click", function () { return setOperation(op); });
    }
});
(_b = document.querySelector("[data-equals]")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", calculate);
(_c = document.querySelector("[data-clear]")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", clear);
// Инициализация дисплея
updateDisplay();
