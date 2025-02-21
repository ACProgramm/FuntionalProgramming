open System

// Определение операций калькулятора
type Operation = {
    Name: string
    Parameters: int
    Function: float list -> Result<float, string>
}

// Список доступных операций
let operations = [
    { Name = "+"; Parameters = 2; Function = fun args -> Ok(args.[0] + args.[1]) }
    { Name = "-"; Parameters = 2; Function = fun args -> Ok(args.[0] - args.[1]) }
    { Name = "*"; Parameters = 2; Function = fun args -> Ok(args.[0] * args.[1]) }
    { Name = "/"; Parameters = 2; Function = fun args ->
        if args.[1] = 0.0 then Error "Деление на ноль невозможно" else Ok(args.[0] / args.[1]) }
    { Name = "pow"; Parameters = 2; Function = fun args -> Ok(args.[0] ** args.[1]) }
    { Name = "sqrt"; Parameters = 1; Function = fun args ->
        if args.[0] < 0.0 then Error "Квадратный корень из отрицательного числа невозможен" else Ok(sqrt args.[0]) }
    { Name = "sin"; Parameters = 1; Function = fun args -> Ok(sin (args.[0] * Math.PI / 180.0)) }
    { Name = "cos"; Parameters = 1; Function = fun args -> Ok(cos (args.[0] * Math.PI / 180.0)) }
    { Name = "tan"; Parameters = 1; Function = fun args ->
        let radians = args.[0] * Math.PI / 180.0
        if abs (cos radians) < 1e-10 then Error "Тангенс не определен для 90° + 180°k"
        else Ok(tan radians) }
]

// Функция парсинга ввода пользователя
let parseInput (input: string) =
    let tokens = input.Trim().Split([|' '|], StringSplitOptions.RemoveEmptyEntries) |> Array.toList
    match tokens with
    | [] -> Error "Нет ввода"
    | opName :: args ->
        match List.tryFind (fun op -> op.Name = opName) operations with
        | None -> Error $"Неизвестная операция: {opName}"
        | Some op when args.Length <> op.Parameters -> Error $"{op.Name} требует {op.Parameters} аргумента(ов)"
        | Some op ->
            let parsedArgs = args |> List.map (fun s -> match Double.TryParse s with true, num -> Ok num | _ -> Error s)
            let (valid, numbers, errors) = parsedArgs |> List.fold (fun (ok, nums, errs) res ->
                match res with
                | Ok num -> (ok, num :: nums, errs)
                | Error s -> (false, nums, s :: errs)) (true, [], [])
            if valid then Ok(op, List.rev numbers) else Error (String.concat "; " (List.rev errors))

// Основной цикл программы
let rec mainLoop () =
    printf "\nВведите операцию (или 'exit' для выхода, 'help' для списка команд): "
    match Console.ReadLine().Trim().ToLower() with
    | "exit" -> ()
    | "help" ->
        printfn "\nДоступные операции:"
        operations |> List.iter (fun op -> printfn $"  {op.Name} - {op.Parameters} аргумента(ов)")
        printfn "\nПримеры ввода:"
        printfn "  + 5 3    sin 30    sqrt 25    pow 2 3"
        mainLoop()
    | input ->
        match parseInput input with
        | Ok(op, args) ->
            match op.Function args with
            | Ok res -> printfn $"Результат: {res}"
            | Error msg -> printfn $"Ошибка: {msg}"
        | Error msg -> printfn $"Ошибка: {msg}"
        mainLoop()

// Точка входа
[<EntryPoint>]
let main _ =
    printfn "Консольный калькулятор на F#\n"
    mainLoop()
    0
