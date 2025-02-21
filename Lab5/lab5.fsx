// Функция для сложения двух чисел
let sum a b = a + b
printfn "Сумма %d + %d: %d" 10 5 (sum 10 5)

// Функция для разности двух чисел
let subtract a b = a - b
printfn "Разность %d - %d: %d" 10 5 (subtract 10 5)

// Функция для умножения двух чисел
let multiply a b = a * b
printfn "Произведение %d * %d: %d" 10 5 (multiply 10 5)

// Функция для деления двух чисел
let divide a b =
    if b <> 0 then
        printfn "Деление %d / %d: %d" a b (a / b)
    else
        printfn "Ошибка: Деление на ноль невозможно"

divide 10 2

// Функция для вычисления факториала числа с использованием рекурсии
let rec factorial n =
    if n <= 1 then 1
    else n * factorial (n - 1)

printfn "Факториал числа %d: %d" 5 (factorial 5)

// Функция с каррированием для сложения
let curriedSum a = fun b -> a + b
printfn "Каррированное сложение %d + %d: %d" 5 10 (curriedSum 5 10)

// Функция с каррированием для умножения
let curriedMultiply a = fun b -> a * b
printfn "Каррированное умножение %d * %d: %d" 2 10 (curriedMultiply 2 10)
