// Функция, фильтрующая массив чисел и оставляющая только числа, кратные указанному значению
function filterMultiples(array: number[], divisor: number): number[] {
    return array.filter(num => num % divisor === 0);
}

// Пример использования
console.log(filterMultiples([12, 18, 25, 30, 45], 6)); // [12, 18, 30]

// Функция, объединяющая массив строк в одну строку с заданным разделителем
function joinStrings(strings: string[], separator: string): string {
    return strings.join(separator);
}

// Пример использования
console.log(joinStrings(["Кот", "Собака", "Лев"], ", ")); // "Кот, Собака, Лев"

// Функция, сортирующая массив объектов по указанному свойству
function sortByField<T, K extends keyof T>(array: T[], field: K): T[] {
    return [...array].sort((a, b) => (a[field] > b[field] ? 1 : -1));
}

// Пример использования
type Product = { name: string; price: number };

const products: Product[] = [
    { name: "Молоко", price: 100 },
    { name: "Хлеб", price: 50 },
    { name: "Яблоки", price: 150 },
];

console.log(sortByField(products, "price")); // Отсортирует продукты по цене

// Функция-обертка для логирования вызовов функций
function withLogging<T extends (...args: any[]) => any>(fn: T): T {
    return function (...args: Parameters<T>): ReturnType<T> {
        console.log(`Вызов функции: ${fn.name || "анонимная"} с аргументами:`, args);
        const result = fn(...args);
        console.log("Результат выполнения:", result);
        return result;
    } as T;
}

// Пример использования
const add = (a: number, b: number): number => a + b;
const loggedAdd = withLogging(add);

console.log(loggedAdd(5, 10)); // Выведет логи и результат 15
