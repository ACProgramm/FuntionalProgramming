type Operation = "add" | "subtract" | "multiply" | "divide" | "power";
type CalculatorState = {
    current: string;
    previous: string;
    operation: Operation | null;
};

// Инициализация состояния
let state: CalculatorState = {
    current: "0",
    previous: "",
    operation: null,
};

// Функции для операций
const operations = {
    add: (a: number, b: number) => a + b,
    subtract: (a: number, b: number) => a - b,
    multiply: (a: number, b: number) => a * b,
    divide: (a: number, b: number) => a / b,
    power: (a: number, b: number) => Math.pow(a, b),
};

// Функция для обновления дисплея
const updateDisplay = () => {
    const display = document.getElementById("display");
    if (display) display.textContent = state.current;
};

// Иммутабельное обновление состояния
const updateState = (newState: Partial<CalculatorState>) => {
    state = { ...state, ...newState };
    updateDisplay();
};

// Добавление числа
const appendNumber = (num: string) => {
    if (state.current === "0" || (state.operation && state.previous === state.current)) {
        updateState({ current: num });
    } else {
        updateState({ current: state.current + num });
    }
};

// Добавление десятичной точки
const appendDecimal = () => {
    if (!state.current.includes(".")) {
        updateState({ current: state.current + "." });
    }
};

// Установка операции
const setOperation = (operation: Operation) => {
    if (!state.current) return;
    updateState({ previous: state.current, current: "", operation });
};

// Выполнение вычисления
const calculate = () => {
    if (!state.operation || !state.previous || !state.current) return;

    const a = parseFloat(state.previous);
    const b = parseFloat(state.current);
    const operationFunction = operations[state.operation];

    if (operationFunction) {
        const result = operationFunction(a, b);
        updateState({
            current: Number.isInteger(result) ? result.toString() : result.toFixed(4),
            previous: "",
            operation: null,
        });
    }
};

// Вычисление квадратного корня
const handleSqrt = () => {
    const num = parseFloat(state.current);
    if (num < 0) {
        alert("Ошибка: отрицательное число!");
        return;
    }
    updateState({ current: Math.sqrt(num).toString() });
};

// Очистка дисплея
const clear = () => updateState({ current: "0", previous: "", operation: null });

// Привязка событий к кнопкам
document.querySelectorAll("[data-number]").forEach(button => {
    button.addEventListener("click", () => appendNumber(button.getAttribute("data-number")!));
});

document.querySelector("[data-decimal]")?.addEventListener("click", appendDecimal);

document.querySelectorAll("[data-operation]").forEach(button => {
    const op = button.getAttribute("data-operation")!;
    if (op === "sqrt") {
        button.addEventListener("click", handleSqrt);
    } else {
        button.addEventListener("click", () => setOperation(op as Operation));
    }
});

document.querySelector("[data-equals]")?.addEventListener("click", calculate);
document.querySelector("[data-clear]")?.addEventListener("click", clear);

// Инициализация дисплея
updateDisplay();
