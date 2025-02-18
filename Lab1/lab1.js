// Функция, которая возвращает массив только с четными числами
const filterEvenNumbers = (arr) => arr.filter(num => num % 2 === 0);

// Функция, которая возвращает массив квадратов чисел
const squareNumbers = (arr) => arr.map(num => num ** 2);

// Функция, которая фильтрует объекты по наличию определенного свойства
const filterByProperty = (arr, prop) => arr.filter(obj => prop in obj);

// Функция, которая возвращает сумму всех чисел в массиве
const sumNumbers = (arr) => arr.reduce((sum, num) => sum + num, 0);

// Функция высшего порядка для применения функции к каждому элементу массива
const applyFunctionToArray = (fn, arr) => arr.map(fn);

// Использование функций для решения задач:

// 1. Найти сумму квадратов всех четных чисел
const sumOfEvenSquares = (arr) => sumNumbers(squareNumbers(filterEvenNumbers(arr)));

// 2. Найти среднее арифметическое чисел, больших заданного значения в массиве объектов
const averageGreaterThan = (arr, prop, threshold) => {
    const filtered = arr.map(obj => obj[prop]).filter(num => num > threshold);
    return filtered.length ? sumNumbers(filtered) / filtered.length : 0;
};

// Пример использования:
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Сумма квадратов всех четных чисел:", sumOfEvenSquares(numbers));

const objects = [{ value: 10 }, { value: 20 }, { value: 30 }, { value: 5 }];
console.log("Среднее арифметическое чисел, больших 10:", averageGreaterThan(objects, 'value', 10));
