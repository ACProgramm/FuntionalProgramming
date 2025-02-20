var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Функция, фильтрующая массив чисел и оставляющая только числа, кратные указанному значению
function filterMultiples(array, divisor) {
    return array.filter(function (num) { return num % divisor === 0; });
}
// Пример использования
console.log(filterMultiples([12, 18, 25, 30, 45], 6)); // [12, 18, 30]
// Функция, объединяющая массив строк в одну строку с заданным разделителем
function joinStrings(strings, separator) {
    return strings.join(separator);
}
// Пример использования
console.log(joinStrings(["Кот", "Собака", "Лев"], ", ")); // "Кот, Собака, Лев"
// Функция, сортирующая массив объектов по указанному свойству
function sortByField(array, field) {
    return __spreadArray([], array, true).sort(function (a, b) { return (a[field] > b[field] ? 1 : -1); });
}
var products = [
    { name: "Молоко", price: 100 },
    { name: "Хлеб", price: 50 },
    { name: "Яблоки", price: 150 },
];
console.log(sortByField(products, "price")); // Отсортирует продукты по цене
// Функция-обертка для логирования вызовов функций
function withLogging(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("\u0412\u044B\u0437\u043E\u0432 \u0444\u0443\u043D\u043A\u0446\u0438\u0438: ".concat(fn.name || "анонимная", " \u0441 \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u0430\u043C\u0438:"), args);
        var result = fn.apply(void 0, args);
        console.log("Результат выполнения:", result);
        return result;
    };
}
// Пример использования
var add = function (a, b) { return a + b; };
var loggedAdd = withLogging(add);
console.log(loggedAdd(5, 10)); // Выведет логи и результат 15
