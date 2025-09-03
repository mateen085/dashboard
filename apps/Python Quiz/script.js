const startArea = document.getElementById('start-area');
const startQuizBtn = document.getElementById('start-quiz-btn');
const gameArea = document.getElementById('game-area');
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback');
const nextQuestionBtn = document.getElementById('next-question-btn');
const endTestBtn = document.getElementById('end-test-btn'); // Get the new button
const restartGameBtn = document.getElementById('restart-game-btn');
const playAgainSameListBtn = document.getElementById('play-again-same-list-btn');
const scoreEl = document.getElementById('score');
const questionNumberEl = document.getElementById('question-number');
const totalQuestionsEl = document.getElementById('total-questions');
const highScoreEl = document.getElementById('high-score');
const timerArea = document.getElementById('timer-area');
const timeEl = document.getElementById('time');

const endSummaryEl = document.getElementById('end-summary');
const summaryTotalEl = document.getElementById('summary-total');
const summaryCorrectEl = document.getElementById('summary-correct');
const summaryIncorrectEl = document.getElementById('summary-incorrect');
const summaryTimedOutEl = document.getElementById('summary-timedout');
const summaryMissedQuestionsEl = document.querySelector('#summary-missed-questions ul');

const listManagementArea = document.getElementById('list-management-area');
const questionListSelect = document.getElementById('question-list-select');
const loadListBtn = document.getElementById('load-list-btn');
const deleteListBtn = document.getElementById('delete-list-btn');
const createListArea = document.getElementById('create-list-area');
const newListNameInput = document.getElementById('new-list-name');
// Removed individual question input elements and buttons
// const newQuestionInput = document.getElementById('new-question');
// const newOptionsInput = document.getElementById('new-options');
// const newAnswerIndexInput = document.getElementById('new-answer-index');
// const newExplanationInput = document.getElementById('new-explanation');
// const addQuestionBtn = document.getElementById('add-question-btn');
// const updateQuestionBtn = document.getElementById('update-question-btn');
const previewListNameEl = document.getElementById('preview-list-name');
const previewQuestionsListEl = document.getElementById('preview-questions-list');
const saveNewListBtn = document.getElementById('save-new-list-btn');
const clearNewListBtn = document.getElementById('clear-new-list-btn');

const exportImportArea = document.getElementById('export-import-area');
const exportListBtn = document.getElementById('export-list-btn');
const importExportJsonTextarea = document.getElementById('import-export-json');
const importListBtn = document.getElementById('import-list-btn');
const importFromFileBtn = document.getElementById('import-from-file-btn');
const importFileInput = document.getElementById('import-file-input');


// --- Pre-defined Sample Questions (Can be any topic) ---
// Renamed and made generic
const pythonList1 = [
    {
    "question": "Which of the following is NOT a valid variable name in Python?",
    "options": ["my_variable", "_variable", "1variable", "variable1"],
    "answerIndex": 2,
    "explanation": "Variable names cannot start with a digit."
  },
  {
    "question": "What will be the output of the following code?\n```python\nx = 5\ny = 'Hello'\nprint(x)\n```",
    "options": ["Hello", "5", "x", "Error"],
    "answerIndex": 1,
    "explanation": "The variable 'x' is assigned the integer value 5, which is then printed."
  },
  {
    "question": "In Python, variables are...",
    "options": ["Statically typed", "Dynamically typed", "Loosely typed", "Strongly typed"],
    "answerIndex": 1,
    "explanation": "Python is a dynamically typed language, meaning you don't need to declare the data type of a variable explicitly."
  },
  {
    "question": "What is the purpose of assigning a value to a variable?",
    "options": ["To declare the data type", "To store data for later use", "To define a constant", "To execute a function"],
    "answerIndex": 1,
    "explanation": "Assignment associates a name (the variable) with a value, allowing you to refer to and use that data."
  },
  {
    "question": "Which of the following is a reserved keyword in Python and cannot be used as a variable name?",
    "options": ["myvar", "count", "while", "string"],
    "answerIndex": 2,
    "explanation": "'while' is a keyword used for loop control and cannot be used as an identifier."
  },
  {
    "question": "What will be the value of 'z' after the following code?\n```python\nx = 10\ny = 20\nz = x + y\n```",
    "options": ["10", "20", "30", "Error"],
    "answerIndex": 2,
    "explanation": "The '+' operator performs addition, so 'z' will be assigned the sum of 'x' and 'y', which is 30."
  },
  {
    "question": "What is the convention for naming variables in Python?",
    "options": ["CamelCase", "PascalCase", "snake_case", "UPPERCASE"],
    "answerIndex": 2,
    "explanation": "The recommended convention for variable naming in Python is snake_case (lowercase words separated by underscores)."
  },
  {
    "question": "Can you reassign a variable to a different data type in Python?",
    "options": ["Yes", "No", "Only if explicitly cast", "Only in specific versions of Python"],
    "answerIndex": 0,
    "explanation": "Python's dynamic typing allows you to reassign a variable to a value of a different data type."
  },
  {
    "question": "What will be the output of the following code?\n```python\nmessage = 'Hello'\nmessage = 'World'\nprint(message)\n```",
    "options": ["Hello", "World", "Hello World", "Error"],
    "answerIndex": 1,
    "explanation": "When a variable is reassigned, its previous value is overwritten. Therefore, 'message' will hold 'World'."
  },
  {
    "question": "Which of the following is a valid assignment operation in Python?",
    "options": ["10 = x", "x == 10", "x := 10", "x = 10"],
    "answerIndex": 3,
    "explanation": "The '=' symbol is the assignment operator in Python, assigning the value on the right to the variable on the left."
  },
  {
    "question": "Which of the following data types can store a sequence of characters?",
    "options": ["int", "float", "bool", "str"],
    "answerIndex": 3,
    "explanation": "The 'str' data type is used to represent sequences of characters (strings)."
  },
  {
    "question": "What will be the data type of 'y' after the following code?\n```python\nx = 5\ny = bool(x)\n```",
    "options": ["int", "float", "bool", "str"],
    "answerIndex": 2,
    "explanation": "The `bool()` function converts a value to a boolean. Non-zero numbers are considered `True`."
  },
  {
    "question": "Which of the following is a mutable data type?",
    "options": ["str", "tuple", "int", "list"],
    "answerIndex": 3,
    "explanation": "Lists are mutable, meaning their elements can be changed after the list is created."
  },
  {
    "question": "What is the purpose of the `None` data type in Python?",
    "options": ["To represent the integer 0", "To represent an empty string", "To represent the absence of a value or a null value", "To represent a boolean False"],
    "answerIndex": 2,
    "explanation": "`None` is a special value in Python that represents the absence of a value or a null object."
  },
  {
    "question": "What will be the data type of 'z' after the following code?\n```python\na = '123'\nz = int(a)\n```",
    "options": ["str", "float", "int", "bool"],
    "answerIndex": 2,
    "explanation": "The `int()` function attempts to convert a value to an integer. If the string 'a' contains a valid integer representation, 'z' will be an integer."
  },
  {
    "question": "Which of the following is NOT a built-in data type in Python?",
    "options": ["complex", "array", "bytes", "frozenset"],
    "answerIndex": 1,
    "explanation": "While Python has array-like structures in the `array` module, 'array' is not a fundamental built-in data type in the same way as list, tuple, etc."
  },
  {
    "question": "What is the difference between a list and a tuple?",
    "options": ["Lists are ordered, tuples are unordered", "Lists are immutable, tuples are mutable", "Lists use parentheses, tuples use square brackets", "Lists are mutable, tuples are immutable"],
    "answerIndex": 3,
    "explanation": "The key difference is mutability: lists can be modified after creation, while tuples cannot."
  },
  {
    "question": "What will be the output of `type({1})`?",
    "options": ["<class 'list'>", "<class 'tuple'>", "<class 'set'>", "<class 'dict'>"],
    "answerIndex": 2,
    "explanation": "A single element enclosed in curly braces `{}` is interpreted as a set."
  },
  {
    "question": "How can you convert a string to a floating-point number in Python?",
    "options": ["int()", "str()", "float()", "bool()"],
    "answerIndex": 2,
    "explanation": "The `float()` function is used to convert a string or a number to a floating-point number."
  },
  {
    "question": "What is the data type that represents whole numbers without a decimal point?",
    "options": ["float", "complex", "int", "bool"],
    "answerIndex": 2,
    "explanation": "The 'int' data type is used to represent integer values (whole numbers)."
  },
  {
    "question": "How can you use the modulo operator (%) for string formatting (old style)?",
    "options": ["by using %s for strings, %d for integers, %f for floats", "by using $s for strings, $i for integers, $f for floats", "by using #s for strings, #i for integers, #f for floats", "it's no longer supported"],
    "answerIndex": 0,
    "explanation": "The modulo operator (%) can be used for string formatting with format specifiers like %s for strings, %d for integers, and %f for floats."
  },
  {
    "question": "What will be the output of the following code?\n```python\nname = 'Bob'\nprint('Hello, %s!' % name)\n```",
    "options": ["Hello, %s!", "Hello, name!", "Hello, Bob!", "Error"],
    "answerIndex": 2,
    "explanation": "The `%s` format specifier is replaced by the value of the 'name' variable using the modulo operator."
  },
  {
    "question": "How can you print to a file instead of the console using the `print()` function?",
    "options": ["by redirecting the output in the operating system", "by using the 'file' argument", "by opening a file and then printing", "both b and c"],
    "answerIndex": 3,
    "explanation": "You can either redirect the standard output at the operating system level or use the `file` argument in the `print()` function to specify a file object."
  },
  {
    "question": "What will be the output of the following code if run in a terminal and redirected to a file named 'output.txt'?\n```python\nprint('This will be in the file.')\n```",
    "options": ["It will print to the console as usual.", "A file named 'output.txt' will be created with the content 'This will be in the file.'", "It will raise an error.", "Nothing will happen."],
    "answerIndex": 1,
    "explanation": "Redirecting output in the terminal (e.g., `python your_script.py > output.txt`) will send the `print()` output to the specified file."
  },
  {
    "question": "What is the default value of the `sep` argument in the `print()` function?",
    "options": ["'' (empty string)", "',' (comma)", "'-' (hyphen)", "' ' (space)"],
    "answerIndex": 3,
    "explanation": "If the `sep` argument is not provided, it defaults to a single space."
  },
  {
    "question": "What is the default value of the `end` argument in the `print()` function?",
    "options": ["'\\t' (tab)", "'\\n' (newline)", "'\\r' (carriage return)", "'' (empty string)"],
    "answerIndex": 1,
    "explanation": "By default, the `print()` function appends a newline character (`\\n`) at the end of the output."
  },
  {
    "question": "How can you print multiple lines of text using a single `print()` function call?",
    "options": ["by using multiple `print()` statements on separate lines", "by including newline characters '\\n' within the string", "by using triple-quoted strings", "both b and c"],
    "answerIndex": 3,
    "explanation": "You can embed newline characters within a string or use triple-quoted strings to represent multiline text in a single `print()` statement."
  },
  {
    "question": "What will be the output of the following code?\n```python\nprint('''Hello\nWorld''')\n```",
    "options": ["HelloWorld", "Hello World", "Hello\\nWorld", "Hello\nWorld"],
    "answerIndex": 3,
    "explanation": "Triple-quoted strings can span multiple lines, and the newline characters are preserved in the output."
  },
  {
    "question": "Can you use mathematical expressions directly within the `print()` function?",
    "options": ["No, you need to evaluate them first.", "Yes, they will be evaluated before printing.", "Only if enclosed in parentheses.", "Only with f-strings."],
    "answerIndex": 1,
    "explanation": "The `print()` function will evaluate expressions passed as arguments before displaying their results."
  },
  {
    "question": "What will be the output of the following code?\n```python\nprint(2 + 3 * 4)\n```",
    "options": ["20", "14", "5 * 4", "Error"],
    "answerIndex": 1,
    "explanation": "Python follows the order of operations (PEMDAS/BODMAS), so 3 * 4 is evaluated first (12), then added to 2, resulting in 14."
  },
  {
    "question": "What will be the result of `5 & 3`? (Binary: 0101 & 0011)",
    "options": ["1", "3", "5", "7"],
    "answerIndex": 0,
    "explanation": "Bitwise AND compares each bit. 0101 & 0011 results in 0001, which is 1 in decimal."
  },
  {
    "question": "Which of the following is an identity operator in Python?",
    "options": ["==", "!=", "is", ">="],
    "answerIndex": 2,
    "explanation": "The `is` operator checks if two variables refer to the same object in memory."
  },
  {
    "question": "What will be the result of the following code?\n```python\nx = [1, 2]\ny = x\nprint(x is y)\n```",
    "options": ["True", "False", "Error", "None"],
    "answerIndex": 0,
    "explanation": "Both 'x' and 'y' refer to the same list object, so `x is y` is `True`."
  },
  {
    "question": "Which of the following is a membership operator in Python?",
    "options": ["in", "not", "and", "or"],
    "answerIndex": 0,
    "explanation": "The `in` operator checks if a value exists as a member in a sequence (like a list, string, or tuple)."
  },
  {
    "question": "What will be the result of `'a' in 'apple'`?",
    "options": ["True", "False", "Error", "None"],
    "answerIndex": 0,
    "explanation": "The substring 'a' is present in the string 'apple', so the result is `True`."
  },
  {
    "question": "What is the order of precedence for operators in Python (from highest to lowest for these examples)?",
    "options": ["Arithmetic, Comparison, Logical, Assignment", "Assignment, Logical, Comparison, Arithmetic", "Logical, Arithmetic, Assignment, Comparison", "Arithmetic, Logical, Assignment, Comparison"],
    "answerIndex": 0,
    "explanation": "Generally, arithmetic operators have higher precedence than comparison operators, which have higher precedence than logical operators, and assignment operators have the lowest precedence."
  },
  {
    "question": "What will be the result of `2 + 3 * 4 == 14`?",
    "options": ["True", "False", "Error", "None"],
    "answerIndex": 0,
    "explanation": "Multiplication is performed before addition (3 * 4 = 12, then 2 + 12 = 14). So, 14 == 14 is `True`."
  },
  {
    "question": "Which operator performs left bit shift?",
    "options": [">>", "<<", "&", "|"],
    "answerIndex": 1,
    "explanation": "The `<<` operator shifts the bits of the left operand to the left by the number of positions specified by the right operand."
  },
  {
    "question": "What will be the result of `8 >> 2`? (Binary: 1000 >> 2)",
    "options": ["2", "4", "16", "32"],
    "answerIndex": 0,
    "explanation": "Right bit shift by 2 positions moves each bit two places to the right. 1000 becomes 0010, which is 2 in decimal."
  },
  {
    "question": "Which keyword is used to start an `if` statement in Python?",
    "options": ["if", "elseif", "else if", "when"],
    "answerIndex": 0,
    "explanation": "The `if` keyword is used to begin a conditional statement."
  },
  {
    "question": "What keyword is used to specify a block of code to be executed if the `if` condition is false?",
    "options": ["elseif", "else if", "else", "otherwise"],
    "answerIndex": 2,
    "explanation": "The `else` keyword introduces a block of code that runs when the preceding `if` condition evaluates to `False`."
  },
  {
    "question": "What keyword is used to check multiple conditions sequentially after an initial `if` condition?",
    "options": ["elseif", "else if", "elif", "switch"],
    "answerIndex": 2,
    "explanation": "The `elif` keyword (short for 'else if') allows you to check additional conditions if the previous `if` or `elif` conditions were false."
  },
  {
    "question": "What will be the output of the following code?\n```python\nx = 10\nif x > 5:\n    print('Greater than 5')\n```",
    "options": ["No output", "Less than 5", "Equal to 5", "Greater than 5"],
    "answerIndex": 3,
    "explanation": "Since 'x' is 10, the condition `x > 5` is true, and the `print()` statement inside the `if` block is executed."
  },
  {
    "question": "What will be the output of the following code?\n```python\nx = 3\nif x > 5:\n    print('Greater than 5')\nelse:\n    print('Not greater than 5')\n```",
    "options": ["Greater than 5", "Not greater than 5", "No output", "Error"],
    "answerIndex": 1,
    "explanation": "Since 'x' is 3, the condition `x > 5` is false, so the code block under the `else` statement is executed."
  },
  {
    "question": "What will be the output of the following code?\n```python\nx = 7\nif x < 5:\n    print('Less than 5')\nelif x > 10:\n    print('Greater than 10')\nelse:\n    print('Between 5 and 10')\n```",
    "options": ["Less than 5", "Greater than 10", "Between 5 and 10", "No output"],
    "answerIndex": 2,
    "explanation": "The first condition (`x < 5`) is false. The second condition (`x > 10`) is also false. Therefore, the `else` block is executed."
  },
  {
    "question": "How is a block of code defined within an `if`, `elif`, or `else` statement in Python?",
    "options": ["Using curly braces {}", "Using parentheses ()", "By indentation", "Using the keyword 'begin' and 'end'"],
    "answerIndex": 2,
    "explanation": "Python uses indentation (typically 4 spaces) to define code blocks within control flow statements."
  },
  {
    "question": "What happens if the condition in an `if` statement evaluates to a non-boolean value (e.g., a non-empty string or a non-zero number)?",
    "options": ["It will always be treated as False.", "It will always be treated as True.", "It will raise a TypeError.", "The behavior is undefined."],
    "answerIndex": 1,
    "explanation": "In Python, certain non-boolean values are truthy (considered `True` in a boolean context), such as non-empty strings and non-zero numbers."
  },
  {
    "question": "What is a nested `if` statement?",
    "options": ["An `if` statement that contains only one condition.", "Multiple `if` statements on the same line.", "An `if` statement inside another `if`, `elif`, or `else` block.", "A condition that combines multiple logical operators."],
    "answerIndex": 2,
    "explanation": "A nested `if` statement occurs when an `if` (or `elif` or `else`) statement is placed within the block of another conditional statement."
  },
  {
    "question": "What will be the output of the following code?\n```python\nx = -2\nif x > 0:\n    print('Positive')\nelse:\n    if x < 0:\n        print('Negative')\n    else:\n        print('Zero')\n```",
    "options": ["Positive", "Negative", "Zero", "No output"],
    "answerIndex": 1,
    "explanation": "The outer `if` condition (`x > 0`) is false, so the `else` block is executed. Inside the `else` block, the condition `x < 0` is true, so 'Negative' is printed."
  },
  {
    "question": "What is the purpose of the optional `else` block that can be used with a `for` loop?",
    "options": ["It is executed if the loop completes normally (without a `break`).", "It is executed if the loop is terminated by a `break` statement.", "It is executed before the loop starts.", "It is executed after each iteration of the loop."],
    "answerIndex": 0,
    "explanation": "The `else` block after a `for` loop is executed if the loop finishes all its iterations without encountering a `break` statement."
  },
  {
    "question": "What will be the output of the following code?\n```python\nfor i in range(3):\n    print(i)\nelse:\n    print('Loop finished')\n```",
    "options": ["0\n1\n2", "0\n1\n2\nLoop finished", "Loop finished\n0\n1\n2", "Error"],
    "answerIndex": 1,
    "explanation": "The loop completes all iterations, so the `else` block is executed after the loop."
  },
  {
    "question": "What will be the output of the following code?\n```python\nfor i in range(5):\n    if i == 3:\n        break\nelse:\n    print('Loop finished')\n```",
    "options": ["0\n1\n2\nLoop finished", "0\n1\n2", "Loop finished", "Error"],
    "answerIndex": 1,
    "explanation": "The loop is terminated by the `break` statement when 'i' is 3, so the `else` block is not executed."
  },
  {
    "question": "How can you iterate through both the index and the value of a sequence (like a list) using a `for` loop?",
    "options": ["using a counter variable", "using the `enumerate()` function", "using the `zip()` function", "it's not directly possible"],
    "answerIndex": 1,
    "explanation": "The `enumerate()` function returns an iterator of tuples, where each tuple contains the index and the corresponding value of the sequence."
  },
  {
    "question": "What will be the output of the following code?\n```python\nmy_list = ['a', 'b', 'c']\nfor index, value in enumerate(my_list):\n    print(f'Index: {index}, Value: {value}')\n```",
    "options": ["Index: 0, Value: a\nIndex: 1, Value: b\nIndex: 2, Value: c", "0 a\n1 b\n2 c", "a b c", "Error"],
    "answerIndex": 0,
    "explanation": "`enumerate()` provides both the index and the value during iteration."
  },
  {
    "question": "How can you iterate over multiple sequences simultaneously using a `for` loop?",
    "options": ["using nested `for` loops", "by adding the sequences together", "using the `zip()` function", "it's not directly possible"],
    "answerIndex": 2,
    "explanation": "The `zip()` function takes multiple sequences and returns an iterator of tuples, where each tuple contains the corresponding elements from the input sequences."
  },
  {
    "question": "What will be the output of the following code?\n```python\nlist1 = [1, 2]\nlist2 = ['a', 'b']\nfor x, y in zip(list1, list2):\n    print(x, y)\n```",
    "options": ["1 a\n2 b", "(1, 'a')\n(2, 'b')", "[1, 'a']\n[2, 'b']", "Error"],
    "answerIndex": 0,
    "explanation": "`zip()` pairs the elements from `list1` and `list2` during iteration."
  },
  {
    "question": "Can you modify the sequence you are iterating over within a `for` loop without encountering issues?",
    "options": ["Yes, it is always safe.", "No, it can lead to unexpected behavior.", "Only if you are adding elements.", "Only if you are removing elements from the end."],
    "answerIndex": 1,
    "explanation": "Modifying a sequence while iterating over it can lead to unexpected results, such as skipping elements or processing them multiple times. It's generally recommended to create a new sequence if modifications are needed."
  },
  {
    "question": "What is a common use case for nested `for` loops?",
    "options": ["Iterating over a single list.", "Implementing conditional logic.", "Iterating over a 2D structure (like a list of lists or a matrix).", "Defining functions."],
    "answerIndex": 2,
    "explanation": "Nested `for` loops are often used to process elements in multi-dimensional data structures."
  },
  {
    "question": "What keyword is used to start a `while` loop in Python?",
    "options": ["while", "loop", "for", "repeat"],
    "answerIndex": 0,
    "explanation": "The `while` keyword initiates a `while` loop."
  },
  {
    "question": "What is the fundamental principle of a `while` loop's execution?",
    "options": ["It executes a block of code a fixed number of times.", "It executes a block of code as long as a specified condition is true.", "It iterates over the elements of a sequence.", "It executes a block of code once."],
    "answerIndex": 1,
    "explanation": "A `while` loop continues to execute its block of code as long as the condition in the `while` statement remains true."
  },
  {
    "question": "What is essential to include in the body of most `while` loops to prevent infinite loops?",
    "options": ["Another `while` loop.", "A `for` loop.", "A statement that eventually makes the loop's condition false.", "A `print()` statement."],
    "answerIndex": 3,
    "explanation": "To avoid an infinite loop, the code within the `while` loop should modify the variables involved in the loop's condition so that the condition eventually becomes false."
  },
  {
    "question": "What will be the output of the following code?\n```python\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1\n```",
    "options": ["0 1 2", "1 2 3", "0\n1\n2", "Error"],
    "answerIndex": 2,
    "explanation": "The loop starts with `count = 0`. The condition `count < 3` is true, so 0 is printed, and `count` becomes 1. This repeats until `count` is 3, at which point the condition becomes false, and the loop terminates."
  },
  {
    "question": "What happens if the condition in a `while` loop never becomes false?",
    "options": ["The loop will execute once and then stop.", "It will raise a runtime error.", "The loop will continue to execute indefinitely (an infinite loop).", "The program will crash."],
    "answerIndex": 2,
    "explanation": "If the condition of a `while` loop never evaluates to false, the loop will run forever, creating an infinite loop."
  },
  {
    "question": "What is the purpose of the `break` statement inside a `while` loop?",
    "options": ["To skip the current iteration.", "To exit the loop immediately.", "To go back to the beginning of the loop.", "To execute the `else` block (if present)."],
    "answerIndex": 1,
    "explanation": "The `break` statement terminates the execution of the `while` loop it is in."
  },
  {
    "question": "What will be the output of the following code?\n```python\nnum = 0\nwhile num < 5:\n    if num == 3:\n        break\n    print(num)\n    num += 1\n```",
    "options": ["0\n1\n2\n3\n4", "0\n1\n2", "3", "Error"],
    "answerIndex": 1,
    "explanation": "The loop runs as long as `num` is less than 5. When `num` becomes 3, the `break` statement is executed, and the loop stops."
  },
  {
    "question": "What is the purpose of the `continue` statement inside a `while` loop?",
    "options": ["To exit the loop.", "To restart the loop from the beginning.", "To skip the rest of the code in the current iteration and proceed to the next condition check.", "To execute the `else` block."],
    "answerIndex": 2,
    "explanation": "The `continue` statement skips the remaining code in the current iteration of the `while` loop and goes back to evaluate the loop's condition."
  },
  {
    "question": "What will be the output of the following code?\n```python\ni = 0\nwhile i < 5:\n    i += 1\n    if i == 3:\n        continue\n    print(i)\n```",
    "options": ["1\n2\n3\n4\n5", "1\n2\n4\n5", "3", "Error"],
    "answerIndex": 1,
    "explanation": "The loop increments `i`. When `i` is 3, `continue` is executed, skipping the `print(i)` for that iteration. The loop then continues with `i = 4` and `i = 5`."
  },
  {
    "question": "Similar to `for` loops, `while` loops can also have an optional `else` block. When is this `else` block executed?",
    "options": ["If the loop's condition becomes false.", "If the loop is terminated by a `break` statement.", "Before the loop starts.", "After each iteration of the loop."],
    "answerIndex": 0,
    "explanation": "The `else` block after a `while` loop is executed if the loop finishes because its condition becomes false (i.e., it was not terminated by a `break` statement)."
  },
  {
    "question": "Which built-in method is used to add multiple elements to the end of a list?",
    "options": ["add_multiple()", "append() with a list", "extend()", "insert_multiple()"],
    "answerIndex": 2,
    "explanation": "The `extend()` method adds all the elements from an iterable (like another list) to the end of the current list."
  },
  {
    "question": "Which built-in method is used to insert an element at a specific index in a list?",
    "options": ["add_at()", "insert()", "place()", "append(index, element)"],
    "answerIndex": 1,
    "explanation": "The `insert()` method takes two arguments: the index at which to insert the element and the element itself."
  },
  {
    "question": "Which built-in method is used to remove the first occurrence of a specific value from a list?",
    "options": ["remove()", "delete()", "pop()", "discard()"],
    "answerIndex": 0,
    "explanation": "The `remove()` method searches for the specified value and removes the first instance it finds. If the value is not found, it raises a ValueError."
  },
  {
    "question": "Which built-in method is used to remove the element at a specific index from a list and return it?",
    "options": ["remove(index)", "delete(index)", "pop(index)", "discard(index)"],
    "answerIndex": 2,
    "explanation": "The `pop()` method removes the element at the given index and returns that element. If no index is provided, it removes and returns the last element."
  },
  {
    "question": "Which built-in method is used to find the index of the first occurrence of a specific value in a list?",
    "options": ["find()", "index()", "search()", "get_index()"],
    "answerIndex": 1,
    "explanation": "The `index()` method returns the index of the first occurrence of the specified value. If the value is not found, it raises a ValueError."
  },
  {
    "question": "Which built-in method is used to count the number of times a specific value appears in a list?",
    "options": ["count()", "occurrences()", "frequency()", "number_of()"],
    "answerIndex": 0,
    "explanation": "The `count()` method returns the number of times a specified element appears in the list."
  },
  {
    "question": "Which built-in method is used to sort the elements of a list in place (modifies the original list)?",
    "options": ["sorted()", "order()", "sort()", "arrange()"],
    "answerIndex": 2,
    "explanation": "The `sort()` method sorts the elements of the list directly, changing the order of the original list."
  },
  {
    "question": "How can you create a reversed version of a list without modifying the original list?",
    "options": ["Using the `reverse()` method.", "Using slicing with a step of -1 (`[::-1]`).", "Using the `reversed()` function and converting it to a list.", "Both b and c."],
    "answerIndex": 3,
    "explanation": "Slicing with a step of -1 creates a reversed copy, and the `reversed()` function returns an iterator that can be converted to a list."
  },
  {
    "question": "What will be the output of the following code?\n```python\nmy_list = [3, 1, 4, 1, 5, 9, 2, 6]\nmy_list.sort()\nprint(my_list)\n```",
    "options": ["[3, 1, 4, 1, 5, 9, 2, 6]", "[6, 2, 9, 5, 1, 4, 1, 3]", "[1, 1, 2, 3, 4, 5, 6, 9]", "Error"],
    "answerIndex": 2,
    "explanation": "The `sort()` method sorts the list in ascending order in place."
  },
  {
    "question": "What is list comprehension in Python?",
    "options": ["A way to define functions that operate on lists.", "A concise way to create new lists based on existing iterables.", "A method for sorting lists in reverse order.", "A technique for merging multiple lists."],
    "answerIndex": 1,
    "explanation": "List comprehension provides a compact syntax for creating lists by applying an expression to each item in an iterable (and optionally including a conditional)."
  },
  {
    "question": "How are strings defined in Python?",
    "options": ["Using curly braces {}", "Using parentheses ()", "Using single quotes '', double quotes \"\", or triple quotes ''' or \"\"\"", "Using square brackets []"],
    "answerIndex": 2,
    "explanation": "Strings in Python can be enclosed in single quotes, double quotes, or triple quotes (for multiline strings)."
  },
  {
    "question": "What characteristic defines strings in Python?",
    "options": ["Mutable and ordered", "Immutable and unordered", "Immutable and ordered", "Mutable and unordered"],
    "answerIndex": 2,
    "explanation": "Python strings are immutable (their characters cannot be changed after creation) and ordered (the characters maintain a specific sequence)."
  },
  {
    "question": "How do you access a specific character in a string?",
    "options": ["Using parentheses () after the string name.", "Using curly braces {} after the string name.", "Using square brackets [] after the string name with the index inside.", "Using the `.charAt()` method."],
    "answerIndex": 2,
    "explanation": "Individual characters in a string are accessed using their index within square brackets. Python uses zero-based indexing."
  },
  {
    "question": "What will be the output of the following code?\n```python\nmy_string = 'Python'\nprint(my_string[0])\n```",
    "options": ["P", "y", "t", "Error"],
    "answerIndex": 0,
    "explanation": "The index 0 refers to the first character in the string."
  },
  {
    "question": "How can you get a substring (a slice) of a string?",
    "options": ["Using the `.substring()` method.", "Using a colon `:` within square brackets `[]` to specify the start and end indices.", "Using the `slice()` function.", "It's not possible to get a substring directly."],
    "answerIndex": 1,
    "explanation": "String slicing uses the syntax `[start:end]` to extract a portion of the string. The character at the `end` index is not included."
  },
  {
    "question": "What will be the output of the following code?\n```python\nmy_string = 'Hello World'\nprint(my_string[6:11])\n```",
    "options": ["World", "World ", "orld", "Error"],
    "answerIndex": 0,
    "explanation": "The slice `[6:11]` extracts characters from index 6 up to (but not including) index 11."
  },
  {
    "question": "Which built-in method is used to convert a string to lowercase?",
    "options": ["lower()", "lowercase()", "to_lower()", "casefold()"],
    "answerIndex": 0,
    "explanation": "The `lower()` method returns a new string where all characters are lowercase."
  },
  {
    "question": "Which built-in method is used to convert a string to uppercase?",
    "options": ["upper()", "uppercase()", "to_upper()", "caps()"],
    "answerIndex": 0,
    "explanation": "The `upper()` method returns a new string where all characters are uppercase."
  },
  {
    "question": "Which built-in method is used to remove leading and trailing whitespace from a string?",
    "options": ["trim()", "strip()", "clean()", "remove_whitespace()"],
    "answerIndex": 1,
    "explanation": "The `strip()` method returns a new string with leading and trailing whitespace removed."
  },
  {
    "question": "Which built-in method is used to split a string into a list of substrings based on a specified delimiter?",
    "options": ["divide()", "separate()", "split()", "partition()"],
    "answerIndex": 2,
    "explanation": "The `split()` method breaks a string into a list of substrings. If no delimiter is specified, it defaults to whitespace."
  },
  {
    "question": "Which built-in method can be used to count the number of times a specific value appears in a tuple?",
    "options": ["count()", "occurrences()", "frequency()", "number_of()"],
    "answerIndex": 0,
    "explanation": "The `count()` method returns the number of times a specified element appears in the tuple."
  },
  {
    "question": "Which built-in method can be used to find the index of the first occurrence of a specific value in a tuple?",
    "options": ["find()", "index()", "search()", "get_index()"],
    "answerIndex": 1,
    "explanation": "The `index()` method returns the index of the first occurrence of the specified value. If the value is not found, it raises a ValueError."
  },
  {
    "question": "How can you create a tuple with only one element?",
    "options": ["`(element)`", "`[element]`", "`{element}`", "`tuple(element)`"],
    "answerIndex": 0,
    "explanation": "To create a tuple with a single element, you need to include a trailing comma after the element: `(element,)`."
  },
  {
    "question": "What will be the data type of `x` after the following code?\n```python\nmy_tuple = (1,)\nx = type(my_tuple)\n```",
    "options": ["<class 'list'>", "<class 'set'>", "<class 'tuple'>", "<class 'int'>"],
    "answerIndex": 2,
    "explanation": "The `type()` function returns the data type of an object, which in this case is `<class 'tuple'>`."
  },
  {
    "question": "What is tuple unpacking in Python?",
    "options": ["Converting a tuple to a list.", "Accessing elements of a tuple using a loop.", "Assigning elements of a tuple to individual variables.", "Combining multiple tuples into one."],
    "answerIndex": 2,
    "explanation": "Tuple unpacking allows you to assign the elements of a tuple (or other iterable) to a corresponding number of variables in a single assignment statement."
  },
  {
    "question": "What will be the output of the following code?\n```python\nmy_tuple = (10, 20, 30)\na, b, c = my_tuple\nprint(b)\n```",
    "options": ["10", "20", "30", "Error"],
    "answerIndex": 1,
    "explanation": "The elements of the tuple are unpacked into the variables `a`, `b`, and `c` respectively."
  },
  {
    "question": "What is a common use case for tuples in Python?",
    "options": ["Storing a collection of items that might need to be modified.", "Representing fixed collections of items, like coordinates or database records.", "Creating dynamic data structures.", "Implementing mathematical sets."],
    "answerIndex": 1,
    "explanation": "Tuples are often used for collections of items that should not be changed, providing a form of data integrity."
  },
  {
    "question": "Can tuples be nested (i.e., can a tuple contain other tuples or lists)?",
    "options": ["No, tuples cannot contain other collections.", "Yes, tuples can contain other tuples, lists, and other data types.", "Only tuples can be nested within tuples.", "Only lists can be nested within tuples."],
    "answerIndex": 1,
    "explanation": "Tuples are flexible and can contain any type of Python object, including other tuples and lists."
  },
  {
    "question": "What will be the result of `(1, 2) + (3, 4)`?",
  "options": ["{1, 2, 3, 4}", "(1, 2, 3, 4)", "{1, 2, 3, 4}", "Error"],
    "answerIndex": 1,
    "explanation": "The `+` operator concatenates two tuples, resulting in a new tuple containing all the elements from both."
  },
  {
    "question": "What will be the result of `(5,) * 3`?",
    "options": ["(5, 5, 5)", "[5, 5, 5]", "15", "Error"],
    "answerIndex": 0,
    "explanation": "The `*` operator can be used to replicate a tuple a certain number of times."
  },
  {
    "question": "How are dictionaries defined in Python?",
    "options": ["Using square brackets []", "Using parentheses ()", "Using curly braces {}", "Using the keyword 'dict'"],
    "answerIndex": 2,
    "explanation": "Dictionaries in Python are created by enclosing key-value pairs within curly braces `{}`, where keys and values are separated by a colon `:` and pairs are separated by commas."
  },
  {
    "question": "What is the fundamental structure of a dictionary in Python?",
    "options": ["A sequence of ordered elements", "A collection of unique, unordered elements", "A collection of key-value pairs", "A mutable sequence of elements"],
    "answerIndex": 2,
    "explanation": "Dictionaries store data as key-value pairs, where each key is unique and maps to a corresponding value."
  },
  {
    "question": "What are the key characteristics of dictionary keys in Python?",
    "options": ["They must be mutable.", "They must be unique and immutable.", "They can be of any data type.", "Their order is preserved."],
    "answerIndex": 1,
    "explanation": "Dictionary keys must be unique within the dictionary and must be of an immutable data type (like strings, numbers, or tuples)."
  },
  {
    "question": "How do you access the value associated with a specific key in a dictionary?",
    "options": ["Using the key within parentheses `()` after the dictionary name.", "Using the key within curly braces `{}` after the dictionary name.", "Using the key within square brackets `[]` after the dictionary name.", "Using the `.get()` method with the index of the key."],
    "answerIndex": 2,
    "explanation": "Values in a dictionary are accessed by using their corresponding key within square brackets `[]`."
  },
  {
    "question": "What will be the output of the following code?\n```python\nmy_dict = {'name': 'Alice', 'age': 30}\nprint(my_dict['name'])\n```",
    "options": ["Alice", "name", "{'name': 'Alice'}", "Error"],
    "answerIndex": 0,
    "explanation": "The value associated with the key 'name' is 'Alice'."
  },
  {
    "question": "What happens if you try to access a key that does not exist in a dictionary using square brackets?",
    "options": ["It returns `None`.", "It returns a default value.", "It raises a KeyError.", "It creates a new key with a default value."],
    "answerIndex": 2,
    "explanation": "Attempting to access a non-existent key using square brackets will result in a KeyError."
  },
  {
    "question": "Which built-in method is a safer way to access a value by key, as it returns `None` if the key is not found?",
    "options": ["get()", "access()", "fetch()", "lookup()"],
    "answerIndex": 0,
    "explanation": "The `get()` method allows you to retrieve the value associated with a key. If the key is not found, it returns `None` (or a specified default value)."
  },
  {
    "question": "How can you add a new key-value pair to an existing dictionary?",
    "options": ["Using the `add()` method.", "By directly assigning a value to a new key using square brackets (e.g., `my_dict['new_key'] = 'new_value'`).", "Using the `update()` method with a single key-value pair.", "Both b and c."],
    "answerIndex": 3,
    "explanation": "You can add new key-value pairs by direct assignment or by using the `update()` method."
  },
  {
    "question": "How can you modify the value associated with an existing key in a dictionary?",
    "options": ["Using the `modify()` method.", "By reassigning a new value to the key using square brackets (e.g., `my_dict['existing_key'] = 'new_value'`).", "Using the `change()` method.", "It's not possible to modify dictionary values."],
    "answerIndex": 1,
    "explanation": "You can change the value of an existing key by simply assigning a new value to it using square brackets."
  },
  {
    "question": "Which built-in method is used to remove a specific key-value pair from a dictionary and return the value?",
    "options": ["remove()", "delete()", "pop()", "discard()"],
    "answerIndex": 2,
    "explanation": "The `pop()` method removes the key and returns its associated value. If the key is not found, it raises a KeyError (unless a default value is provided)."
  },
  {
    "question": "Which built-in method is used to remove the last inserted key-value pair from a dictionary (in Python 3.7+)?",
    "options": ["poplast()", "remove_last()", "popitem()", "deleteitem()"],
    "answerIndex": 2,
    "explanation": "The `popitem()` method removes and returns the last inserted (key, value) pair as a tuple. In versions before 3.7, the order was not guaranteed."
  },
  {
    "question": "Which built-in method is used to remove all key-value pairs from a dictionary?",
    "options": ["clear()", "empty()", "reset()", "delete_all()"],
    "answerIndex": 0,
    "explanation": "The `clear()` method removes all items from the dictionary, leaving it empty."
  },
  {
    "question": "Which set operation returns a new set containing elements that are common to both sets?",
    "options": ["union", "intersection", "difference", "symmetric difference"],
    "answerIndex": 1,
    "explanation": "The intersection of two sets contains only the elements that are present in both sets. You can use the `&` operator or the `intersection()` method."
  },
  {
    "question": "Which set operation returns a new set containing all elements from both sets?",
    "options": ["union", "intersection", "difference", "symmetric difference"],
    "answerIndex": 0,
    "explanation": "The union of two sets contains all unique elements from both sets. You can use the `|` operator or the `union()` method."
  },
  {
    "question": "Which set operation returns a new set containing elements that are in the first set but not in the second set?",
    "options": ["union", "intersection", "difference", "symmetric difference"],
    "answerIndex": 2,
    "explanation": "The difference of two sets (set1 - set2) contains elements that are in set1 but not in set2. You can use the `-` operator or the `difference()` method."
  },
  {
    "question": "Which set operation returns a new set containing elements that are in either of the sets but not in their intersection?",
    "options": ["union", "intersection", "difference", "symmetric difference"],
    "answerIndex": 3,
    "explanation": "The symmetric difference of two sets contains elements that are in either set but not in both. You can use the `^` operator or the `symmetric_difference()` method."
  },
  {
    "question": "What will be the output of the following code?\n```python\nset1 = {1, 2, 3}\nset2 = {3, 4, 5}\nprint(set1.intersection(set2))\n```",
    "options": ["{1, 2, 3, 4, 5}", "{3}", "{1, 2}", "{4, 5}"],
    "answerIndex": 1,
    "explanation": "The intersection of `{1, 2, 3}` and `{3, 4, 5}` is the set containing the common element, which is `{3}`."
  },
  {
    "question": "What will be the output of the following code?\n```python\nset1 = {1, 2, 3}\nset2 = {3, 4, 5}\nprint(set1.union(set2))\n```",
    "options": ["{1, 2, 3}", "{3}", "{1, 2, 4, 5}", "{1, 2, 3, 4, 5}"],
    "answerIndex": 3,
    "explanation": "The union of `{1, 2, 3}` and `{3, 4, 5}` is the set containing all unique elements from both, which is `{1, 2, 3, 4, 5}`."
  },
  {
    "question": "What will be the output of the following code?\n```python\nset1 = {1, 2, 3}\nset2 = {3, 4, 5}\nprint(set1.difference(set2))\n```",
    "options": ["{1, 2, 3}", "{3}", "{1, 2}", "{4, 5}"],
    "answerIndex": 2,
    "explanation": "The difference of `{1, 2, 3}` and `{3, 4, 5}` contains elements in the first set but not the second, which is `{1, 2}`."
  },
  {
    "question": "What will be the output of the following code?\n```python\nset1 = {1, 2, 3}\nset2 = {3, 4, 5}\nprint(set1.symmetric_difference(set2))\n```",
    "options": ["{1, 2, 3, 4, 5}", "{3}", "{1, 2}", "{1, 2, 4, 5}"],
    "answerIndex": 3,
    "explanation": "The symmetric difference contains elements that are in either set but not in both, which is `{1, 2, 4, 5}`."
  },
  {
    "question": "What is set comprehension in Python?",
    "options": ["A way to define functions that operate on sets.", "A concise way to create new sets based on existing iterables.", "A method for sorting sets.", "A technique for merging multiple sets while preserving order."],
    "answerIndex": 1,
    "explanation": "Set comprehension provides a compact syntax for creating sets by applying an expression to each item in an iterable (and optionally including a conditional)."
  },
  {
    "question": "What will be the output of the following set comprehension?\n```python\nnumbers = [1, 2, 2, 3, 3, 3]\nsquared_set = {num**2 for num in numbers}\nprint(squared_set)\n```",
    "options": ["{1, 4, 9}", "{1, 4, 4, 9, 9, 9}", "[1, 4, 9]", "(1, 4, 9)"],
    "answerIndex": 0,
    "explanation": "The set comprehension squares each unique number in the `numbers` list, resulting in the set `{1, 4, 9}` (duplicates are automatically removed)."
  },
  {
    "question": "What keyword is used to define a function in Python?",
    "options": ["def", "function", "func", "define"],
    "answerIndex": 0,
    "explanation": "The `def` keyword is used to start the definition of a function."
  },
  {
    "question": "What is the purpose of using functions in programming?",
    "options": ["To make the code run faster.", "To reduce the size of the code.", "To organize code into reusable blocks and improve readability.", "To automatically declare variables."],
    "answerIndex": 2,
    "explanation": "Functions help in modularizing code, making it easier to understand, maintain, and reuse different parts of the program."
  },
  {
    "question": "What is a function signature?",
    "options": ["The body of the function.", "The return value of the function.", "The name of the function along with its parameters.", "The documentation string (docstring) of the function."],
    "answerIndex": 2,
    "explanation": "The function signature includes the function's name and the list of parameters it accepts."
  },
  {
    "question": "How do you call or execute a function in Python?",
    "options": ["By simply writing the function name.", "By using the `call` keyword followed by the function name.", "By writing the function name followed by parentheses `()`.", "By using the `execute` keyword followed by the function name."],
    "answerIndex": 2,
    "explanation": "A function is called (executed) by writing its name followed by parentheses. If the function accepts arguments, they are placed inside the parentheses."
  },
  {
    "question": "What is a parameter in a function definition?",
    "options": ["A value passed to the function when it is called.", "A variable defined inside the function.", "A placeholder for a value that the function expects to receive.", "The return type of the function."],
    "answerIndex": 2,
    "explanation": "Parameters are variables listed inside the parentheses in the function definition. They act as placeholders for the arguments that will be passed when the function is called."
  },
  {
    "question": "What is an argument when referring to functions?",
    "options": ["A variable defined inside the function.", "The name of the function.", "The value that is passed to the function when it is called.", "The data type of the parameters."],
    "answerIndex": 2,
    "explanation": "Arguments are the actual values that are provided when a function is called, and they are assigned to the corresponding parameters in the function definition."
  },
  {
    "question": "What is the purpose of the `return` statement in a function?",
    "options": ["To print output to the console.", "To define a loop within the function.", "To send a value back to the caller of the function.", "To indicate the end of the function definition."],
    "answerIndex": 2,
    "explanation": "The `return` statement is used to exit a function and optionally send a value (the return value) back to the part of the code that called the function."
  },
  {
    "question": "What happens if a function does not have a `return` statement?",
    "options": ["It will raise an error.", "It will implicitly return the value of the last expression.", "It will implicitly return `None`.", "It will return the function's own definition."],
    "answerIndex": 2,
    "explanation": "If a function does not have an explicit `return` statement, or if the `return` statement is used without a value, the function will implicitly return `None`."
  },
  {
    "question": "What are positional arguments in a function call?",
    "options": ["Arguments that are passed based on the names of the parameters.", "Arguments that have default values in the function definition.", "Arguments that are passed in the order they are defined in the function signature.", "A single argument that can accept multiple values."],
    "answerIndex": 2,
    "explanation": "Positional arguments are passed to a function based on their order, and they are matched with the parameters in the function definition according to their position."
  },
  {
    "question": "What are keyword arguments in a function call?",
    "options": ["Arguments that must be passed as strings.", "Arguments that are identified by the parameter name they correspond to.", "Arguments that can only be used with functions defined using the `keyword` keyword.", "Arguments that are optional."],
    "answerIndex": 1,
    "explanation": "Keyword arguments are passed by explicitly specifying the parameter name followed by an equals sign and the value (e.g., `my_function(name='Bob', age=25)`)."
  },
  {
    "question": "What are default parameter values in a function definition?",
    "options": ["Values that are automatically assigned to all parameters.", "Values that are used if no argument is provided for that parameter in the function call.", "Values that cannot be changed.", "Values that determine the data type of the parameter."],
    "answerIndex": 1,
    "explanation": "Default parameter values are specified in the function definition and are used if the caller does not provide a corresponding argument for that parameter."
  },
  {
    "question": "What is the purpose of the `nonlocal` keyword in Python?",
    "options": ["To declare a variable as globally accessible.", "To access a local variable from an outer (enclosing) function's scope.", "To prevent a variable from being modified.", "To define a constant variable."],
    "answerIndex": 1,
    "explanation": "The `nonlocal` keyword is used within a nested function to refer to a variable in the nearest enclosing function's scope that is not global."
  },
  {
    "question": "What will be the output of the following code?\n```python\nglobal_var = 10\n\ndef my_func():\n    local_var = 5\n    print(local_var)\n    print(global_var)\n\nmy_func()\n```",
    "options": ["10\n5", "5\n10", "Error", "No output"],
    "answerIndex": 1,
    "explanation": "The function accesses its local variable `local_var` and the global variable `global_var`."
  },
  {
    "question": "What will be the output of the following code?\n```python\nglobal_var = 10\n\ndef my_func():\n    global global_var\n    global_var = 20\n    print(global_var)\n\nmy_func()\nprint(global_var)\n```",
    "options": ["10\n10", "20\n10", "20\n20", "Error"],
    "answerIndex": 2,
    "explanation": "The `global` keyword inside the function allows modification of the global variable `global_var`."
  },
  {
    "question": "What will be the output of the following code?\n```python\ndef outer_func():\n    outer_var = 5\n    def inner_func():\n        nonlocal outer_var\n        outer_var = 10\n    inner_func()\n    print(outer_var)\n\nouter_func()\n```",
    "options": ["5", "10", "Error", "No output"],
    "answerIndex": 1,
    "explanation": "The `nonlocal` keyword in `inner_func` allows it to modify the `outer_var` in the scope of `outer_func`."
  },
  {
    "question": "Can a function access variables defined in another function that is not enclosing it?",
    "options": ["Yes, if the other function returns the variable.", "Yes, if the variable is declared as global.", "No, a function can only directly access its local scope, enclosing scopes, global scope, and built-in scope.", "Yes, by importing the other function's module."],
    "answerIndex": 2,
    "explanation": "Python's scope rules (LEGB) dictate that a function's direct access to names is limited to its local, enclosing, global, and built-in scopes."
  },
  {
    "question": "What is the lifetime of a local variable in a function?",
    "options": ["It exists for the entire duration of the program.", "It exists only while the function is executing.", "It exists until it is explicitly deleted using the `del` keyword.", "Its lifetime depends on where the function is called."],
    "answerIndex": 1,
    "explanation": "Local variables are created when the function is called and are destroyed when the function finishes executing."
  },
  {
    "question": "What is the purpose of modules in relation to namespaces?",
    "options": ["Modules have their own global namespace, helping to organize code and avoid name collisions.", "Modules restrict the scope of all variables defined within them.", "Modules automatically make all their names globally accessible.", "Modules are primarily used for defining local scopes."],
    "answerIndex": 0,
    "explanation": "Each module in Python has its own global namespace. When you import a module, you typically access its names using the module name as a prefix, which helps prevent naming conflicts between different parts of your program."
  },
  {
    "question": "What happens if you try to assign a value to a global variable inside a function without using the `global` keyword?",
    "options": ["The global variable is updated.", "A new local variable with the same name is created.", "Python raises a SyntaxError.", "The behavior is undefined."],
    "answerIndex": 1,
    "explanation": "If you assign a value to a name inside a function without declaring it as `global`, Python assumes it's a new local variable, even if a global variable with the same name exists."
  },
  {
    "question": "What is the relationship between namespaces and object attributes?",
    "options": ["Object attributes are stored in a separate global namespace.", "Object attributes are part of the object's namespace.", "Namespaces only apply to variables, not object attributes.", "Object attributes are stored in the built-in namespace."],
    "answerIndex": 1,
    "explanation": "Objects in Python have their own namespace that holds their attributes (data and methods). You access these attributes using dot notation (e.g., `object.attribute`)."
  },
  {
    "question": "What is the order of namespace lookup when you refer to a name within a function?",
    "options": ["Built-in, Global, Enclosing, Local", "Global, Built-in, Local, Enclosing", "Local, Enclosing, Global, Built-in", "Enclosing, Local, Global, Built-in"],
    "answerIndex": 2,
    "explanation": "Python follows the LEGB rule: it first looks in the Local namespace, then Enclosing function locals, then the Global namespace, and finally the Built-in namespace."
  },
  {
    "question": "What is the fundamental building block of Object-Oriented Programming (OOP)?",
    "options": ["Functions", "Variables", "Objects", "Modules"],
    "answerIndex": 2,
    "explanation": "Objects are the core components of OOP, representing entities with data (attributes) and behavior (methods)."
  },
  {
    "question": "What is a class in Python?",
    "options": ["An instance of an object.", "A blueprint for creating objects.", "A module containing only functions.", "A way to define global variables."],
    "answerIndex": 1,
    "explanation": "A class is a template or a blueprint that defines the structure and behavior of objects of that class."
  },
  {
    "question": "How do you define a class in Python?",
    "options": ["Using the `def` keyword.", "Using the `class` keyword.", "Using the `object` keyword.", "Using the `struct` keyword."],
    "answerIndex": 1,
    "explanation": "The `class` keyword is used to define a new class in Python, followed by the class name and a colon."
  },
  {
    "question": "What is an object (or instance) in OOP?",
    "options": ["A class itself.", "A blueprint for creating classes.", "A specific realization of a class.", "A function associated with a class."],
    "answerIndex": 2,
    "explanation": "An object is a particular instance of a class, with its own set of data and the ability to perform the actions defined by the class."
  },
  {
    "question": "How do you create an object of a class in Python?",
    "options": ["By simply writing the class name.", "By using the `new` keyword followed by the class name.", "By calling the class name like a function.", "By using the `instantiate` keyword."],
    "answerIndex": 2,
    "explanation": "Objects are created by calling the class name followed by parentheses, similar to calling a function (e.g., `my_object = MyClass()`)."
  },
  {
    "question": "What is a constructor in a Python class?",
    "options": ["A method used to destroy an object.", "A special method that is automatically called when an object is created.", "A method used to access attributes of an object.", "A method that defines the class name."],
    "answerIndex": 1,
    "explanation": "The constructor is a special method, typically named `__init__`, that is automatically executed when an object of the class is instantiated. It's used to initialize the object's attributes."
  },
  {
    "question": "What is the purpose of the `self` parameter in a Python class method?",
    "options": ["It refers to the class itself.", "It is a keyword used to define local variables within the method.", "It refers to the instance of the object that the method is called on.", "It is used to pass arguments to the constructor."],
    "answerIndex": 2,
    "explanation": "The `self` parameter is a convention in Python and refers to the instance of the object. It is the first parameter in instance methods and is used to access the object's attributes and other methods."
  },
  {
    "question": "What are attributes of a class?",
    "options": ["Actions that an object can perform.", "Characteristics or data associated with an object.", "Methods defined within a class.", "The name of the class itself."],
    "answerIndex": 1,
    "explanation": "Attributes are variables that store the data associated with an object. They represent the state of the object."
  },
  {
    "question": "What are methods of a class?",
    "options": ["Variables that store data.", "Blueprints for creating objects.", "Functions defined within a class that operate on the object's attributes.", "The process of creating an object."],
    "answerIndex": 2,
    "explanation": "Methods are functions that are defined within a class and are associated with the objects of that class. They define the behavior of the objects."
  },
  {
    "question": "What is inheritance in OOP?",
    "options": ["The ability of an object to change its class.", "A mechanism by which a class can acquire the properties and behaviors of another class.", "The process of creating multiple objects from the same class.", "The way objects interact with each other."],
    "answerIndex": 1,
    "explanation": "Inheritance allows a new class (subclass or derived class) to inherit attributes and methods from an existing class (superclass or base class), promoting code reuse and establishing an 'is-a' relationship."
  },
  {
    "question": "What is a superclass (or base class) in inheritance?",
    "options": ["The class that inherits from another class.", "The main class in a program.", "The class whose properties and methods are inherited.", "A class that does not have any subclasses."],
    "answerIndex": 2,
    "explanation": "A superclass (or base class or parent class) is the class from which other classes inherit."
  },
  {
    "question": "How can you import specific names from a submodule of a package?",
    "options": ["Using `import package.submodule.specific_name`.", "Using `from package.submodule get specific_name`.", "Using `from package.submodule import specific_name`.", "Using `load specific_name from package.submodule`."],
    "answerIndex": 2,
    "explanation": "Similar to importing from a regular module, you can use the `from ... import ...` syntax to import specific names from a submodule (e.g., `from my_package.my_submodule import my_function`)."
  },
  {
    "question": "What is the Python standard library?",
    "options": ["A collection of third-party packages.", "The core language features of Python.", "A vast collection of modules that provide a wide range of functionalities.", "A set of tools for debugging Python code."],
    "answerIndex": 3,
    "explanation": "The Python standard library is a comprehensive set of modules that are included with every Python installation. It provides modules for tasks such as file I/O, networking, operating system interaction, and more."
  },
  {
    "question": "How can you find the location of a module file on your system?",
    "options": ["Using the `whereis` command in the Python interpreter.", "By printing the `__file__` attribute of the imported module.", "By using the `locate` function from the `os` module.", "It's not possible to find the location."],
    "answerIndex": 1,
    "explanation": "Once a module is imported, its `__file__` attribute usually contains the path to the module file on your system."
  },
  {
    "question": "What is the purpose of the `sys.path` list?",
    "options": ["It lists all the installed Python packages.", "It specifies the order in which Python searches for modules when an `import` statement is encountered.", "It contains the documentation strings of all imported modules.", "It stores the version information of Python and its libraries."],
    "answerIndex": 1,
    "explanation": "`sys.path` is a list of directory names that specifies the search path for modules. When you try to import a module, Python looks for it in the directories listed in `sys.path` in order."
  },
  {
    "question": "How can you add a directory to Python's module search path at runtime?",
    "options": ["By modifying the system's environment variables.", "By appending the directory path to the `sys.path` list.", "By using the `addpath()` function from the `os` module.", "It's not possible to modify the search path at runtime."],
    "answerIndex": 1,
    "explanation": "You can dynamically add directories to the module search path by appending their paths as strings to the `sys.path` list in the `sys` module."
  },
  {
    "question": "What are third-party packages in Python?",
    "options": ["Modules and packages that are part of the Python standard library.", "Modules and packages created by the user for their specific project.", "Modules and packages developed by the Python core team but not included in the standard library.", "Modules and packages developed and maintained by the wider Python community and available through package managers like pip."],
    "answerIndex": 3,
    "explanation": "Third-party packages are external libraries that extend Python's capabilities and are typically installed using tools like pip (the Python Package Installer)."
  },
  {
    "question": "What is pip?",
    "options": ["A built-in Python module for mathematical operations.", "The standard package manager for Python, used to install and manage third-party packages.", "A tool for debugging Python code.", "A language closely related to Python."],
    "answerIndex": 1,
    "explanation": "pip (Pip Installs Packages) is the most commonly used package management system for installing and managing software packages written in Python that are found in the Python Package Index (PyPI)."
  },
  {
    "question": "How do you install a third-party package using pip?",
    "options": ["Using the `install package_name` command in the Python interpreter.", "Using the `pip install package_name` command in the terminal or command prompt.", "Using the `import package_name --install` statement in your Python code.", "By manually downloading and placing the package files in the Python installation directory."],
    "answerIndex": 1,
    "explanation": "To install a package using pip, you open your terminal or command prompt and run the command `pip install package_name` (replace `package_name` with the name of the package you want to install)."
  },
  {
    "question": "What is a virtual environment in Python?",
    "options": ["An isolated Python environment that allows you to install packages for a specific project without affecting other projects or the global Python installation.", "A way to run Python code in a web browser.", "A tool for optimizing the performance of Python programs.", "A feature for creating graphical user interfaces in Python."],
    "answerIndex": 0,
    "explanation": "A virtual environment is a self-contained directory that contains a Python installation for a particular project, along with any project-specific packages. This helps manage dependencies and avoid conflicts between projects."
  },
  {
    "question": "What function is used to open a file in Python?",
    "options": ["open()", "file()", "create_file()", "fopen()"],
    "answerIndex": 0,
    "explanation": "The `open()` function is used to open a file. It takes the file path as the primary argument and an optional mode argument specifying how the file should be opened (read, write, etc.)."
  },
  {
    "question": "What is the default mode when you open a file using the `open()` function without specifying a mode?",
    "options": ["'r' (read mode)", "'w' (write mode)", "'a' (append mode)", "'b' (binary mode)"],
    "answerIndex": 0,
    "explanation": "If no mode is specified, the `open()` function defaults to opening the file in read mode ('r')."
  },
  {
    "question": "What is the purpose of the 'w' mode when opening a file?",
    "options": ["To read data from the file.", "To append new data to the end of the file.", "To write data to the file, overwriting any existing content.", "To open the file for both reading and writing."],
    "answerIndex": 2,
    "explanation": "The 'w' mode opens a file for writing. If the file exists, its content is overwritten. If the file does not exist, a new file is created."
  },
  {
    "question": "What is the purpose of the 'r' mode when opening a file?",
    "options": ["To write data to the file.", "To read data from the file.", "To append new data to the end of the file.", "To create a new file for writing."],
    "answerIndex": 1,
    "explanation": "The 'r' mode opens a file for reading. The file pointer is placed at the beginning of the file. The file must exist."
  },
  {
    "question": "What is the purpose of the 'a' mode when opening a file?",
    "options": ["To read data from the file.", "To write data to the file, overwriting existing content.", "To append new data to the end of the file.", "To open the file for both reading and writing."],
    "answerIndex": 2,
    "explanation": "The 'a' mode opens a file for appending. If the file exists, new data is written at the end. If the file does not exist, a new file is created for writing."
  },
  {
    "question": "What is the purpose of the 'b' mode when opening a file (e.g., 'rb', 'wb')?",
    "options": ["To open the file in text mode.", "To open the file in binary mode for handling non-text files.", "To open the file for buffered I/O.", "To open the file for exclusive creation."],
    "answerIndex": 1,
    "explanation": "The 'b' mode is used to open a file in binary mode, which is necessary for handling non-text files like images, audio, or video."
  },
  {
    "question": "What is the purpose of the '+' mode when opening a file (e.g., 'r+', 'w+')?",
    "options": ["To open the file for exclusive creation.", "To open the file for reading only.", "To open the file for both reading and writing.", "To open the file for appending only."],
    "answerIndex": 2,
    "explanation": "The '+' mode allows you to perform both reading and writing operations on the file."
  },
  {
    "question": "How do you read the entire content of a file into a single string?",
    "options": ["Using the `read_all()` method.", "Using the `read()` method without any arguments.", "Using the `readlines()` method.", "By iterating over the file object."],
    "answerIndex": 1,
    "explanation": "Calling the `read()` method on a file object without any arguments reads the entire content of the file as a single string."
  },
  {
    "question": "How do you read all the lines of a file into a list of strings?",
    "options": ["Using the `read_lines()` method.", "Using the `read()` method with a line separator.", "Using the `readlines()` method.", "By iterating over the file object and manually appending to a list."],
    "answerIndex": 2,
    "explanation": "The `readlines()` method reads all the lines from the file and returns them as a list of strings, where each string represents a line (including the newline character at the end)."
  },
  {
    "question": "How do you read a file line by line?",
    "options": ["Using the `readline()` method repeatedly or by iterating over the file object.", "Using the `read()` method with a line number argument.", "Using the `readlines(1)` method.", "It's not possible to read a file line by line directly."],
    "answerIndex": 0,
    "explanation": "The `readline()` method reads a single line from the file (including the newline character). You can call it repeatedly to read the file line by line. Alternatively, you can directly iterate over the file object, which yields each line in the file."
  },
  {
    "question": "How do you write a string to a file?",
    "options": ["Using the `write()` method.", "Using the `print()` function with a file argument.", "Using the `save()` method.", "Both a and b."],
    "answerIndex": 3,
    "explanation": "You can write a string to a file using the `write()` method of the file object. You can also use the `print()` function and redirect its output to a file using the `file` argument."
  },
  {
    "question": "What is the difference between catching a general `Exception` and catching a more specific exception type (e.g., `ValueError`)?",
    "options": ["Catching `Exception` is more efficient.", "Catching a specific exception allows you to handle different types of errors in different ways.", "Catching `Exception` automatically handles all possible errors, while specific exceptions need to be explicitly raised.", "There is no functional difference."],
    "answerIndex": 1,
    "explanation": "Catching a specific exception type allows you to implement different error handling logic for different kinds of errors. Catching a general `Exception` might hide specific issues and make debugging harder."
  },
  {
    "question": "What is a traceback in Python?",
    "options": ["The original source code of a program.", "A list of all the variables used in a program.", "A report that shows the sequence of function calls that led to an exception, including the file name and line number where the exception occurred.", "A summary of the program's execution time."],
    "answerIndex": 2,
    "explanation": "A traceback is a report that shows the call stack at the point where an exception occurred. It helps in identifying the sequence of function calls that led to the error, making it easier to debug."
  },
  {
    "question": "Can you have nested `try...except` blocks in Python?",
    "options": ["No, nesting `try...except` blocks is not allowed.", "Yes, you can nest `try...except` blocks, allowing for different levels of error handling.", "Only if you are handling different types of exceptions.", "Only within function definitions."],
    "answerIndex": 1,
    "explanation": "Yes, you can nest `try...except` blocks. This allows you to handle exceptions at different levels of code execution. An exception that is not caught in an inner `try` block can be caught by an outer `except` block."
  },
  {
    "question": "What is the purpose of the `assert` statement in Python?",
    "options": ["To define a constant value.", "To check if a condition is true and raise an `AssertionError` if it is false.", "To indicate the end of a function.", "To optimize the performance of loops."],
    "answerIndex": 1,
    "explanation": "The `assert` statement is used to test a condition. If the condition evaluates to `False`, it raises an `AssertionError`, which is typically used during debugging to check for logical errors in the code."
  },
  {
    "question": "When should you use `assert` statements?",
    "options": ["For handling expected runtime errors.", "For validating user input.", "For checking internal program logic and invariants during development.", "For tasks that might take a long time to execute."],
    "answerIndex": 2,
    "explanation": "`assert` statements are primarily used as a debugging aid to check for conditions that should always be true in a correctly functioning program. They are not intended for handling expected runtime errors or validating user input in production code."
  },
  {
    "question": "What is the `warnings` module in Python used for?",
    "options": ["For handling critical runtime errors.", "For issuing warning messages to the user without stopping the program's execution.", "For logging program output to a file.", "For profiling the performance of Python code."],
    "answerIndex": 1,
    "explanation": "The `warnings` module provides a way to issue warning messages to users. These warnings are typically displayed but do not interrupt the normal execution of the program. They are useful for indicating potential issues or deprecations."
  },
  {
    "question": "What is the difference between an exception and a warning in Python?",
    "options": ["Exceptions are for syntax errors, warnings are for runtime errors.", "Exceptions stop the program's execution (if not handled), while warnings do not.", "Warnings are more severe than exceptions.", "There is no significant difference."],
    "answerIndex": 1,
    "explanation": "Exceptions are events that disrupt the normal flow of a program. If not handled, they can lead to program termination. Warnings, on the other hand, are indicators of potential problems but do not typically stop the program from running."
  },
  {
    "question": "What is a common best practice for error handling in Python?",
    "options": ["Catch broad exceptions like `Exception` to handle all errors in one place.", "Avoid using `try...except` blocks as they slow down the program.", "Catch specific exceptions whenever possible to handle different error scenarios appropriately and provide more informative error messages.", "Always suppress exceptions to prevent the program from crashing."],
    "answerIndex": 2,
    "explanation": "It's generally best practice to catch specific exception types that you anticipate might occur in your `try` block. This allows you to handle different error conditions in a targeted way and provide more informative error messages or recovery mechanisms."
  },
  {
    "question": "Which `re` module function returns all non-overlapping matches of a pattern in a string as a list of strings?",
    "options": ["match()", "search()", "findall()", "finditer()"],
    "answerIndex": 2,
    "explanation": "The `re.findall()` function finds all non-overlapping occurrences of the pattern in the string and returns them as a list of strings (or a list of tuples if the pattern has groups)."
  },
  {
    "question": "Which `re` module function returns an iterator yielding match objects for all non-overlapping matches of a pattern in a string?",
    "options": ["match()", "search()", "findall()", "finditer()"],
    "answerIndex": 3,
    "explanation": "The `re.finditer()` function returns an iterator that yields match objects for each non-overlapping match found in the string. This can be more memory-efficient for large strings or many matches."
  },
  {
    "question": "What is a match object in the `re` module?",
    "options": ["A string containing the matched text.", "A boolean value indicating whether a match was found.", "An object containing information about the match, including the matched string, its starting and ending positions, and any captured groups.", "A list of all the matched substrings."],
    "answerIndex": 2,
    "explanation": "A match object is returned by functions like `re.search()` and `re.match()` when a match is found. It provides methods like `group()`, `start()`, `end()`, and `span()` to access details about the match."
  },
  {
    "question": "What does the `group()` method of a match object return?",
    "options": ["The starting index of the match.", "The ending index of the match.", "The substring that was matched by the entire pattern (or a specific captured group).", "A tuple containing the start and end indices of the match."],
    "answerIndex": 2,
    "explanation": "The `group()` method, when called without arguments, returns the entire matched string. If you provide an argument (the group number), it returns the substring matched by that specific captured group."
  },
  {
    "question": "What are special sequences in regular expressions (e.g., `\d`, `\w`, `\s`)?",
    "options": ["Sequences used for comments in regex patterns.", "Shorthand notations for commonly used character sets.", "Quantifiers that specify the number of repetitions.", "Escape sequences for literal characters with special meaning."],
    "answerIndex": 1,
    "explanation": "Special sequences are escape sequences that represent predefined character sets: `\d` for digits, `\w` for word characters (alphanumeric + underscore), `\s` for whitespace characters, etc."
  },
  {
    "question": "What is the purpose of the `re.sub()` function?",
    "options": ["To split a string into a list of substrings based on a pattern.", "To search for all occurrences of a pattern in a string.", "To replace occurrences of a pattern in a string with a replacement string.", "To compile a regular expression pattern."],
    "answerIndex": 2,
    "explanation": "The `re.sub()` function replaces all occurrences of a pattern in a string with a specified replacement string. It can also take a function as the replacement argument for more complex substitutions."
  },
  {
    "question": "What is the purpose of the `re.compile()` function?",
    "options": ["To check if a regular expression pattern is valid.", "To execute a regular expression search on a string.", "To pre-compile a regular expression pattern into a regex object, which can improve performance if the pattern is used multiple times.", "To split a string based on a regular expression pattern."],
    "answerIndex": 2,
    "explanation": "The `re.compile()` function compiles a regular expression pattern string into a regex object. This can be more efficient when the same pattern is used multiple times because the compilation is done only once."
  },
  {
    "question": "What are flags in regular expressions (e.g., `re.IGNORECASE`, `re.MULTILINE`)?",
    "options": ["Variables that store the result of a regex match.", "Keywords used to define groups in a regex pattern.", "Modifiers that change the behavior of the regular expression matching.", "Special sequences that match specific character types."],
    "answerIndex": 2,
    "explanation": "Flags are optional modifiers that you can pass to `re` functions (or when compiling a pattern) to change how the regex engine interprets the pattern (e.g., `re.IGNORECASE` makes the match case-insensitive, `re.MULTILINE` affects how `^` and `$` match)."
  },
  {
    "question": "What does the regex pattern `r'\\bword\\b'` typically match?",
    "options": ["Any substring containing 'word'.", "Only the exact string 'word'.", "The string 'word' only when it is a whole word (not part of another word).", "Any word that starts or ends with 'word'."],
    "answerIndex": 2,
    "explanation": "`\\b` is a word boundary. The pattern `r'\\bword\\b'` matches the whole word 'word', ensuring that it's not part of a larger word (e.g., it would match 'word' in 'This is a word.' but not in 'sword')."
  },
   {
    "question": "Why is testing important in software development?",
    "options": ["To make the code run faster.", "To reduce the size of the codebase.", "To ensure the code works correctly, identify bugs early, and improve code quality and maintainability.", "To make the code more complex and harder to understand."],
    "answerIndex": 2,
    "explanation": "Testing is crucial for verifying the correctness of software, finding and fixing bugs early in the development cycle, improving the overall quality of the code, and making it easier to maintain and evolve."
  },
  {
    "question": "What is a unit test?",
    "options": ["A test that checks the integration between different modules.", "A test that verifies the behavior of a large part of the system.", "A test that focuses on a small, isolated unit of code, such as a function or a method.", "A test performed by end-users to validate the software."],
    "answerIndex": 2,
    "explanation": "A unit test is a test that examines a single, independent component of the software to ensure it functions as expected in isolation."
  },
  {
    "question": "What is an integration test?",
    "options": ["A test that checks the behavior of a single function.", "A test that verifies how different modules or components of the system work together.", "A test performed by developers during coding.", "A test that evaluates the overall performance of the application."],
    "answerIndex": 1,
    "explanation": "An integration test checks the interactions and data flow between different parts of the system to ensure they work correctly when combined."
  },
  {
    "question": "What is a test case?",
    "options": ["A group of related tests.", "A specific set of inputs, execution conditions, and expected results for a particular test objective.", "A tool used to run tests.", "A report summarizing the test results."],
    "answerIndex": 1,
    "explanation": "A test case is a detailed procedure for a specific aspect of the software, including the inputs, preconditions, steps to execute, and the expected output or outcome."
  },
  {
    "question": "Which built-in Python module provides a framework for writing and running unit tests?",
    "options": ["unittest", "pytest", "doctest", "test"],
    "answerIndex": 0,
    "explanation": "The `unittest` module, also known as `PyUnit`, is Python's standard library framework for writing and running unit tests. It follows an xUnit style architecture."
  },
  {
    "question": "How do you define a test case in the `unittest` framework?",
    "options": ["By creating a regular function that starts with the word 'test'.", "By creating a class that inherits from `unittest.TestCase` and defining methods that start with the word 'test'.", "By writing test logic directly in the main part of a script.", "By using a special decorator `@test` before a function definition."],
    "answerIndex": 1,
    "explanation": "In `unittest`, you define test cases by creating classes that inherit from `unittest.TestCase`. Each test within these classes is a method whose name starts with the prefix `test_`."
  },
  {
    "question": "What are assertions in the context of testing?",
    "options": ["Statements that define the expected behavior of the code being tested.", "Functions used to set up the environment for a test.", "Methods used to clean up after a test has run.", "Comments that describe what the test is doing."],
    "answerIndex": 0,
    "explanation": "Assertions are statements used within test methods to check if a certain condition is true. If an assertion fails, it indicates that the code is not behaving as expected."
  },
  {
    "question": "Which `unittest` method is used to check if two values are equal?",
    "options": ["assertEqual()", "assertTrue()", "assertRaises()", "assertIs()"],
    "answerIndex": 0,
    "explanation": "The `assertEqual(a, b)` method in `unittest.TestCase` checks if `a` and `b` are equal. If they are not, the test fails."
  },
  {
    "question": "Which `unittest` method is used to check if a condition is true?",
    "options": ["assertEqual()", "assertTrue()", "assertRaises()", "assertIs()"],
    "answerIndex": 1,
    "explanation": "The `assertTrue(x)` method checks if the boolean value of `x` is true. If it's false, the test fails."
  },
  {
    "question": "Which `unittest` method is used to check if a specific exception is raised by a piece of code?",
    "options": ["assertEqual()", "assertTrue()", "assertRaises()", "assertIsInstance()"],
    "answerIndex": 2,
    "explanation": "The `assertRaises(exc, callable, *args, **kwargs)` context manager (or method) is used to assert that calling `callable` with the specified `args` and `kwargs` raises a particular exception `exc`."
  },
  {
    "question": "What is the `asyncio` module in Python used for?",
    "options": ["Achieving parallelism using multiple processes.", "Achieving concurrency using a single thread with an event loop for non-blocking I/O operations.", "Managing threads for CPU-bound tasks.", "Providing a simpler interface for multiprocessing."],
    "answerIndex": 1,
    "explanation": "The `asyncio` module provides infrastructure for writing concurrent code using a single thread, asynchronous I/O, and a cooperative multitasking approach based on an event loop. It's well-suited for network-bound and high-level concurrent code."
  },
  {
    "question": "What are coroutines in the context of `asyncio`?",
    "options": ["Functions that run in parallel in separate processes.", "Lightweight, concurrent execution units that can pause and resume their execution.", "Special types of threads that bypass the GIL.", "Functions that are automatically executed when an event occurs."],
    "answerIndex": 2,
    "explanation": "Coroutines in `asyncio` are functions that can pause and resume their execution, allowing other coroutines to run in the meantime. They are the building blocks for asynchronous programming in `asyncio`."
  },
  {
    "question": "What is an event loop in `asyncio`?",
    "options": ["A loop that continuously checks for and handles events, scheduling the execution of coroutines.", "A mechanism for sharing data between processes.", "A lock used to synchronize access to shared resources in threads.", "A way to manage the lifecycle of processes."],
    "answerIndex": 0,
    "explanation": "The event loop is the core of `asyncio`. It monitors events (like network I/O completion) and schedules the execution of coroutines that are ready to run, enabling non-blocking and concurrent execution within a single thread."
  },
  {
    "question": "What is the difference between preemptive multitasking (used by threads/processes) and cooperative multitasking (used by `asyncio`)?",
    "options": ["Preemptive multitasking relies on explicit yielding of control, while cooperative multitasking is managed by the OS.", "Preemptive multitasking is managed by the OS, which can interrupt tasks, while cooperative multitasking relies on tasks voluntarily yielding control.", "Preemptive multitasking is only for CPU-bound tasks, while cooperative multitasking is only for I/O-bound tasks.", "There is no significant difference between them."],
    "answerIndex": 1,
    "explanation": "In preemptive multitasking (used by threads and processes), the operating system can interrupt a running task and switch to another. In cooperative multitasking (used by `asyncio`), tasks (coroutines) voluntarily yield control to the event loop when they are waiting for an operation to complete."
  },
  {
    "question": "What are race conditions in concurrent programming?",
    "options": ["A situation where multiple threads or processes try to access and modify shared resources concurrently, and the final outcome depends on the unpredictable order of execution.", "A condition where a process or thread is waiting for a resource that will never become available.", "A type of error that occurs only in parallel programs.", "A technique for optimizing the performance of concurrent programs."],
    "answerIndex": 0,
    "explanation": "A race condition occurs when the outcome of a program depends on the specific sequence or timing of concurrent operations on shared data, leading to unpredictable and potentially incorrect results."
  },
  {
    "question": "What are locks (or mutexes) used for in concurrent programming?",
    "options": ["To allow multiple threads or processes to access shared resources simultaneously.", "To prevent race conditions by ensuring that only one thread or process can access a shared resource at a time.", "To signal between threads or processes that a certain condition has been met.", "To manage the creation and destruction of threads or processes."],
    "answerIndex": 1,
    "explanation": "Locks (or mutexes) are synchronization primitives used to protect shared resources from concurrent access by multiple threads or processes, ensuring that only one can hold the lock and access the resource at a time, thus preventing race conditions."
  },
  {
    "question": "What are semaphores used for in concurrent programming?",
    "options": ["To provide exclusive access to a shared resource.", "To allow a limited number of concurrent accesses to a shared resource.", "To signal the occurrence of an event between threads.", "To manage the priority of threads or processes."],
    "answerIndex": 1,
    "explanation": "Semaphores are synchronization primitives that manage a counter. They can be used to control access to a shared resource by allowing a limited number of concurrent users. Threads or processes need to acquire a permit (decrement the counter) before accessing the resource and release it afterward (increment the counter)."
  },
  {
    "question": "What are event objects used for in the `threading` module?",
    "options": ["To manage the creation and destruction of threads.", "To allow threads to signal each other that a specific event has occurred.", "To protect shared resources from concurrent access.", "To schedule the execution of threads."],
    "answerIndex": 1,
    "explanation": "Event objects in the `threading` module are a simple way for one thread to signal an event to one or more other threads. A thread can wait on an event, and another thread can set the event to wake up all waiting threads."
  },
  {
    "question": "What are queues commonly used for in concurrent programming?",
    "options": ["To manage the priority of tasks.", "To enable safe and ordered communication and data sharing between multiple threads or processes.", "To control access to shared resources.", "To schedule the execution of concurrent tasks."],
    "answerIndex": 1,
    "explanation": "Queues provide a thread-safe and process-safe way to pass data between different parts of a concurrent or parallel program, allowing producers to add items and consumers to retrieve them in an orderly manner without the risk of race conditions."
  },
  {
    "question": "When choosing between `threading`, `multiprocessing`, and `asyncio`, what is a key factor to consider?",
    "options": ["The programming language used.", "The operating system of the target platform.", "Whether the tasks are primarily CPU-bound or I/O-bound, and whether true parallelism is required.", "The size of the input data being processed."],
    "answerIndex": 2,
    "explanation": "The nature of the tasks (CPU-bound vs. I/O-bound) and the need for true parallelism are crucial factors in deciding which concurrency/parallelism approach and module to use in Python. `multiprocessing` for CPU-bound parallelism, `threading` for I/O-bound concurrency (with GIL limitations in mind), and `asyncio` for single-threaded concurrent I/O-bound operations."
  },
  {
    "question": "What is the standard Python Database API Specification (PEP 249)?",
    "options": ["A set of guidelines for database design.", "A specification that defines a common interface for Python database drivers.", "A tool for visualizing database schemas.", "A library for database administration tasks."],
    "answerIndex": 1,
    "explanation": "PEP 249 defines a standard interface for Python database drivers, ensuring consistency in how you connect to and interact with different database systems."
  },
  {
    "question": "What is the first step when working with a database from Python using a specific database connector (driver)?",
    "options": ["Creating a cursor object.", "Establishing a connection to the database.", "Executing SQL queries.", "Fetching data from the database."],
    "answerIndex": 1,
    "explanation": "Before you can interact with a database, you need to establish a connection to it using the appropriate database connector library (e.g., `sqlite3` for SQLite, `psycopg2` for PostgreSQL, `mysql.connector` for MySQL)."
  },
  {
    "question": "Which method of a database connection object is typically used to create a cursor object?",
    "options": ["create_cursor()", "get_cursor()", "cursor()", "open_cursor()"],
    "answerIndex": 2,
    "explanation": "The `cursor()` method of a database connection object is used to create a cursor object, which allows you to execute SQL queries and interact with the database."
  },
  {
    "question": "What is the purpose of a cursor object in Python database interaction?",
    "options": ["To store the database connection parameters.", "To represent a database table in memory.", "To allow you to execute SQL queries and fetch results.", "To manage database transactions."],
    "answerIndex": 2,
    "explanation": "A cursor object acts as a pointer or handle that allows you to execute SQL statements against the database and retrieve the results of those queries."
  },
  {
    "question": "Which method of a cursor object is used to execute SQL queries?",
    "options": ["run()", "query()", "execute()", "sql()"],
    "answerIndex": 2,
    "explanation": "The `execute()` method of a cursor object is used to run SQL queries, such as `SELECT`, `INSERT`, `UPDATE`, and `DELETE` statements."
  },
  {
    "question": "How do you pass parameters into SQL queries executed via a cursor object in Python?",
    "options": ["By directly embedding Python variables into the SQL string.", "By using string formatting (e.g., `%s`, `{}`) within the SQL string.", "By using placeholders (e.g., `?` for SQLite, `%s` for MySQL, `%s` for PostgreSQL) in the SQL string and passing parameters as a separate argument to the `execute()` method.", "Parameters cannot be passed into SQL queries."],
    "answerIndex": 3,
    "explanation": "The recommended and most secure way to pass parameters into SQL queries is by using placeholders in the SQL string and providing the parameter values as a tuple or dictionary as the second argument to the `execute()` method. This helps prevent SQL injection vulnerabilities."
  },
  {
    "question": "Which method of a cursor object is used to retrieve the next row of a query result?",
    "options": ["fetch_one()", "fetch_next()", "get_row()", "next_row()"],
    "answerIndex": 0,
    "explanation": "The `fetchone()` method of a cursor object retrieves the next single row of a query result set. If there are no more rows, it returns `None`."
  },
  {
    "question": "Which method of a cursor object is used to retrieve all the remaining rows of a query result as a list of tuples?",
    "options": ["fetch_all()", "fetch_many()", "get_all()", "all_rows()"],
    "answerIndex": 0,
    "explanation": "The `fetchall()` method retrieves all the remaining rows from the result set of a query and returns them as a list of tuples (or dictionaries if the cursor is configured to return dictionaries)."
  },
  {
    "question": "Which method of a cursor object is used to retrieve a specified number of rows from a query result?",
    "options": ["fetch_some()", "fetch_many()", "get_some()", "many_rows()"],
    "answerIndex": 1,
    "explanation": "The `fetchmany(size)` method retrieves the next set of rows from the query result, where `size` specifies the number of rows to fetch. If fewer than `size` rows are available, it returns them all."
  },
  {
    "question": "What is a transaction in the context of databases?",
    "options": ["A single SQL query.", "A logical unit of work consisting of one or more SQL operations that are treated as a single atomic unit.", "A way to define database tables.", "A mechanism for backing up database data."],
    "answerIndex": 1,
    "explanation": "A transaction is a sequence of database operations that are performed as a single logical unit of work. Transactions ensure data integrity by treating a series of operations as either all succeeding or all failing."
  },
  {
    "question": "What happens to Python tuples when they are encoded to JSON using `json.dumps()`?",
    "options": ["They remain as tuples in the JSON output.", "They are converted to lists in the JSON output.", "They are converted to arrays of arrays.", "An error is raised."],
    "answerIndex": 1,
    "explanation": "JSON does not have a direct equivalent of Python tuples. When a Python tuple is encoded to JSON using `json.dumps()`, it is converted into a JSON array (list)."
  },
  {
    "question": "What happens to Python `True`, `False`, and `None` when they are encoded to JSON?",
    "options": ["They remain the same in the JSON output.", "They are converted to `true`, `false`, and `null` respectively.", "They are converted to 1, 0, and null respectively.", "An error is raised."],
    "answerIndex": 1,
    "explanation": "Python's boolean values `True` and `False` are converted to the JSON boolean literals `true` and `false`, and Python's `None` is converted to the JSON null literal `null`."
  },
  {
    "question": "Can you serialize custom Python objects directly to JSON using `json.dumps()`?",
    "options": ["Yes, it works automatically.", "No, you need to provide a custom serialization function using the `default` parameter.", "Only if the object has a `to_json()` method.", "Only for certain types of custom objects."],
    "answerIndex": 1,
    "explanation": "By default, `json.dumps()` can only serialize built-in Python types that have direct JSON equivalents. To serialize custom objects, you need to provide a function to the `default` parameter that knows how to convert the object into a serializable format (like a dictionary)."
  },
  {
    "question": "How can you handle dates and times when serializing Python objects to JSON?",
    "options": ["They are automatically converted to ISO 8601 format.", "You need to convert them to a string format (e.g., using `strftime()`) within your custom serialization function.", "The `json` module has built-in support for date and time objects.", "JSON cannot represent dates and times directly."],
    "answerIndex": 1,
    "explanation": "JSON does not have a native date/time type. When serializing Python objects containing dates and times, you typically need to convert them to a string format (like ISO 8601) within a custom serialization function passed to the `default` parameter of `json.dumps()`."
  },
  {
    "question": "What is the purpose of the `sort_keys` parameter in `json.dumps()`?",
    "options": ["To sort the values in the JSON output.", "To sort the keys of dictionaries in the JSON output alphabetically.", "To remove duplicate keys before serialization.", "To sort the JSON output by size."],
    "answerIndex": 1,
    "explanation": "The `sort_keys` parameter in `json.dumps()` allows you to specify whether the keys of dictionaries in the output should be sorted alphabetically. Setting it to `True` can be useful for producing consistent JSON output."
  },
  {
    "question": "What happens if you try to decode a JSON string with syntax errors using `json.loads()`?",
    "options": ["It returns `None`.", "It returns an empty dictionary or list.", "It raises a `json.JSONDecodeError`.", "It tries to correct the errors automatically."],
    "answerIndex": 2,
    "explanation": "If the JSON string passed to `json.loads()` has syntax errors (e.g., missing quotes, invalid formatting), it will raise a `json.JSONDecodeError`."
  },
  {
    "question": "Can JSON data contain comments?",
    "options": ["Yes, using `//` for single-line and `/* ... */` for multi-line comments.", "Yes, using `#` for single-line comments.", "No, standard JSON does not support comments.", "Only in certain JSON extensions."],
    "answerIndex": 2,
    "explanation": "Standard JSON syntax does not support comments. If you need to include comments, you might consider using a JSON-like format that allows them or documenting your JSON data separately."
  },
  {
    "question": "Which of the following is a valid JSON document?",
    "options": ["{name: 'John', age: 30}", "[1, 2, 'three',]", "{'key': 'value'}", "(1, 'two')"],
    "answerIndex": 1,
    "explanation": "A valid JSON document can be a JSON object (enclosed in curly braces with double-quoted keys and values) or a JSON array (enclosed in square brackets with comma-separated values). Trailing commas are not allowed. `[1, 2, 'three',]` has a trailing comma, and `{'key': 'value'}` has single-quoted keys. `(1, 'two')` is a Python tuple."
  },
  {
    "question": "What does JSON stand for?",
    "options": ["Java Standard Output Notation", "JavaScript Object Notation", "Joint System Object Network", "Justified Serialized Output"],
    "answerIndex": 1,
    "explanation": "JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate."
  },
  {
    "question": "Which Python module is used for working with JSON data?",
    "options": ["xml", "pickle", "json", "struct"],
    "answerIndex": 2,
    "explanation": "The `json` module in Python's standard library provides functions for working with JSON data, such as encoding Python objects into JSON strings and decoding JSON strings into Python objects."
  },
  {
    "question": "What are the basic data types in JSON?",
    "options": ["integers, floats, strings, booleans, lists, tuples, dictionaries", "numbers, strings, booleans, arrays, objects, null", "numbers, text, true/false, sequences, mappings, none", "int, float, str, bool, list, dict, None"],
    "answerIndex": 1,
    "explanation": "The basic data types in JSON are numbers (integers and floating-point), strings, booleans (true and false), arrays (ordered lists), objects (key-value pairs), and null."
  },
  {
    "question": "How are JSON objects represented in Python?",
    "options": ["tuples", "lists", "dictionaries", "sets"],
    "answerIndex": 2,
    "explanation": "JSON objects (key-value pairs) are typically represented as Python dictionaries, where keys are strings and values correspond to the JSON data types."
  },
  {
    "question": "How are JSON arrays represented in Python?",
    "options": ["tuples", "lists", "dictionaries", "sets"],
    "answerIndex": 1,
    "explanation": "JSON arrays (ordered lists of values) are typically represented as Python lists."
  },
  {
    "question": "Which function in the `json` module is used to convert a Python object into a JSON formatted string?",
    "options": ["encode()", "dumps()", "serialize()", "stringify()"],
    "answerIndex": 1,
    "explanation": "The `json.dumps()` function is used to serialize a Python object into a JSON formatted string."
  },
  {
    "question": "Which function in the `json` module is used to parse a JSON formatted string into a Python object?",
    "options": ["decode()", "loads()", "parse()", "destringify()"],
    "answerIndex": 1,
    "explanation": "The `json.loads()` function is used to deserialize a JSON formatted string into a Python object (usually a dictionary or a list)."
  },
  {
    "question": "What will be the output of `json.dumps({'name': 'Alice', 'age': 30})`?",
    "options": ["{'name': 'Alice', 'age': 30}", '{"name": "Alice", "age": 30}', "{'name': 'Alice', 'age': 30'}", '{"name": \'Alice\', "age": 30}'],
    "answerIndex": 1,
    "explanation": "`json.dumps()` converts the Python dictionary into a JSON string, where string keys and values are enclosed in double quotes."
  },
  {
    "question": "What will be the output of `json.loads('{\"name\": \"Bob\", \"age\": 25}')`?",
    "options": ["('name', 'Bob'), ('age', 25)", "['name', 'Bob', 'age', 25]", "{'name': 'Bob', 'age': 25}", "{name: 'Bob', age: 25}"],
    "answerIndex": 2,
    "explanation": "`json.loads()` parses the JSON string and returns a Python dictionary."
  },
  {
    "question": "How can you write JSON data to a file in Python?",
    "options": ["Using `json.dump()` with a file object opened in write mode.", "Using `file.write(json.dumps(data))`.", "Using `json.encode()` and then writing to the file.", "JSON data cannot be directly written to a file."],
    "answerIndex": 0,
    "explanation": "The `json.dump()` function is used to serialize a Python object as a JSON formatted stream to a file. You need to open the file in write mode (`'w'`)."
  },
  {
    "question": "How can you read JSON data from a file in Python?",
    "options": ["Using `json.load()` with a file object opened in read mode.", "Using `file.read(json.loads())`.", "Using `json.decode()` after reading the file content.", "JSON data cannot be directly read from a file."],
    "answerIndex": 0,
    "explanation": "The `json.load()` function is used to deserialize a JSON formatted stream from a file into a Python object. You need to open the file in read mode (`'r'`)."
  },
  {
    "question": "What is the purpose of the `indent` parameter in `json.dumps()`?",
    "options": ["To specify the character used for indentation (e.g., spaces or tabs).", "To control the level of nesting in the JSON output.", "To make the JSON output more human-readable by adding indentation.", "All of the above."],
    "answerIndex": 2,
    "explanation": "The `indent` parameter in `json.dumps()` allows you to specify a number of spaces for indentation or a string for indentation, making the JSON output more readable with proper formatting."
  },
  {
    "question": "What is the purpose of formatting dates and times as strings?",
    "options": ["To make them easier to store in databases.", "To present them in a human-readable format.", "To perform mathematical operations on them.", "To convert them to a different time zone."],
    "answerIndex": 1,
    "explanation": "Formatting dates and times as strings allows you to represent them in various human-readable formats according to specific patterns."
  },
  {
    "question": "Which method is used to format `date`, `time`, and `datetime` objects into strings based on a format string?",
    "options": ["format()", "strftime()", "toString()", "convert_to_string()"],
    "answerIndex": 1,
    "explanation": "The `strftime()` method is used to format `date`, `time`, and `datetime` objects into strings according to a specified format string (using directives like `%Y`, `%m`, `%d`, `%H`, `%M`, `%S`)."
  },
  {
    "question": "What does the format code `%Y` represent in `strftime()`?",
    "options": ["Year without century as a zero-padded decimal number.", "Year with century as a decimal number.", "Month as a zero-padded decimal number.", "Day of the month as a zero-padded decimal number."],
    "answerIndex": 1,
    "explanation": "`%Y` represents the year with century as a decimal number (e.g., 2023)."
  },
  {
    "question": "What does the format code `%m` represent in `strftime()`?",
    "options": ["Minute as a zero-padded decimal number.", "Month as locale's abbreviated name.", "Month as a zero-padded decimal number.", "Day of the month as a zero-padded decimal number."],
    "answerIndex": 2,
    "explanation": "`%m` represents the month as a zero-padded decimal number (01, 02, ..., 12)."
  },
  {
    "question": "Which method is used to parse a string representing a date and/or time into a `datetime` object?",
    "options": ["parse()", "strptime()", "to_datetime()", "convert_from_string()"],
    "answerIndex": 1,
    "explanation": "The `strptime()` method parses a string representing a date and/or time according to a specified format string and returns a corresponding `datetime` object."
  },
  {
    "question": "What is the difference between `now()` and `utcnow()` methods of the `datetime` class?",
    "options": ["`now()` returns the current UTC time, `utcnow()` returns the local time.", "`now()` returns a `date` object, `utcnow()` returns a `datetime` object.", "`now()` returns the current local date and time, `utcnow()` returns the current UTC (Coordinated Universal Time) date and time.", "There is no difference between them."],
    "answerIndex": 2,
    "explanation": "`datetime.datetime.now()` returns the current local date and time, while `datetime.datetime.utcnow()` returns the current UTC date and time (which is independent of the local time zone)."
  },
  {
    "question": "What is a `timezone` object in the `datetime` module?",
    "options": ["An object representing a duration.", "An object representing a calendar date.", "An object representing a time of day.", "An object representing time zone information and offset rules."],
    "answerIndex": 3,
    "explanation": "A `timezone` object represents time zone information, including the offset from UTC and any rules for daylight saving time."
  },
  {
    "question": "How can you make a `datetime` object timezone-aware?",
    "options": ["By using the `set_timezone()` method.", "By using the `replace()` method with a `tzinfo` argument.", "Timezone awareness is automatic in Python.", "You need to convert it to a string and then back."],
    "answerIndex": 1,
    "explanation": "You can make a `datetime` object timezone-aware by using the `replace(tzinfo=timezone_object)` method to associate it with a specific `timezone` object."
  },
  {
    "question": "Which third-party library is often used for more advanced date and time manipulations and parsing in Python?",
    "options": ["time", "calendar", "datetime", "dateutil"],
    "answerIndex": 3,
    "explanation": "The `dateutil` library provides more powerful and flexible parsing of dates from various string formats, as well as advanced time zone handling and other date/time utilities beyond the standard `datetime` module."
  }
];

const pythonList2 = [
    {
    "question": "What is the scope of a variable defined inside a function?",
    "options": ["Global", "Local to the function", "Accessible everywhere", "Local to the module"],
    "answerIndex": 1,
    "explanation": "Variables defined within a function have local scope, meaning they are only accessible inside that function."
  },
  {
    "question": "What is the purpose of the `global` keyword in Python?",
    "options": ["To define a constant variable", "To access a local variable from outside its scope", "To access a global variable from within a local scope", "To declare a variable as globally accessible"],
    "answerIndex": 2,
    "explanation": "The `global` keyword is used inside a function to indicate that you want to work with a global variable."
  },
  {
    "question": "What will be the output of the following code?\n```python\ncount = 5\ncount = count + 1\nprint(count)\n```",
    "options": ["5", "6", "count + 1", "Error"],
    "answerIndex": 1,
    "explanation": "The code increments the value of the 'count' variable by 1."
  },
  {
    "question": "Which of the following is NOT a recommended practice for variable naming?",
    "options": ["Using descriptive names", "Keeping names short and concise", "Starting with a lowercase letter", "Using single-letter variable names for important variables"],
    "answerIndex": 3,
    "explanation": "Using single-letter variable names can make code harder to understand, especially for complex logic."
  },
  {
    "question": "What happens if you try to use a variable that has not been assigned a value?",
    "options": ["It will be assigned a default value (e.g., None)", "It will raise a NameError", "It will be treated as 0", "It will use the value from a similar variable in the global scope"],
    "answerIndex": 1,
    "explanation": "Using an uninitialized variable results in a NameError because the variable has not been defined in the current scope."
  },
  {
    "question": "What is variable shadowing in Python?",
    "options": ["Assigning the same value to multiple variables", "Deleting a variable from memory", "When a local variable has the same name as a global variable", "Changing the data type of a variable multiple times"],
    "answerIndex": 2,
    "explanation": "Variable shadowing occurs when a variable in a local scope has the same name as a variable in an enclosing (e.g., global) scope, effectively hiding the outer variable within the local scope."
  },
  {
    "question": "What will be the output of the following code?\n```python\nnumber = 10\nprint(Number)\n```",
    "options": ["10", "Error", "None", "0"],
    "answerIndex": 1,
    "explanation": "Python is case-sensitive. 'number' and 'Number' are treated as different variables. 'Number' has not been defined, so a NameError will occur."
  },
  {
    "question": "Which of the following is a valid way to assign multiple variables in a single line?",
    "options": ["x, y, z = 1, 2, 3", "x = 1, y = 2, z = 3", "(x, y, z) = (1, 2, 3)", "All of the above"],
    "answerIndex": 3,
    "explanation": "Python supports multiple assignment in a single line using comma-separated variables and values, and also with tuples."
  },
  {
    "question": "What is the purpose of the `del` keyword in relation to variables?",
    "options": ["To declare a variable", "To delete a file", "To delete a variable, removing its name from the namespace", "To define a function"],
    "answerIndex": 2,
    "explanation": "The `del` keyword is used to remove the binding between a name and an object. After using `del` on a variable, it is no longer defined."
  },
  {
    "question": "What will be the output of the following code?\n```python\na = '3'\nb = 5\nprint(a + b)\n```",
    "options": ["8", "'35'", "Error", "35"],
    "answerIndex": 2,
    "explanation": "You cannot directly add a string and an integer in Python. This will result in a TypeError. To concatenate them, you would need to convert the integer to a string first."
  },
  {
    "question": "Which of the following is an immutable data type in Python?",
    "options": ["list", "dictionary", "tuple", "set"],
    "answerIndex": 2,
    "explanation": "Tuples are immutable sequences, meaning their elements cannot be changed after creation."
  },
  {
    "question": "What data type would the variable 'x' be after the following assignment?\n```python\nx = 3.14\n```",
    "options": ["int", "float", "str", "bool"],
    "answerIndex": 1,
    "explanation": "A number with a decimal point is interpreted as a float (floating-point number)."
  },
  {
    "question": "Which of the following represents a boolean data type in Python?",
    "options": ["'True'", "true", "TRUE", "True"],
    "answerIndex": 3,
    "explanation": "Boolean values in Python are represented by the keywords 'True' and 'False' (with a capital 'T' and 'F')."
  },
  {
    "question": "What will be the data type of the variable 'result' after the following operation?\n```python\na = 10\nb = 2\nresult = a / b\n```",
    "options": ["int", "float", "str", "None"],
    "answerIndex": 1,
    "explanation": "The division operator '/' always returns a float in Python, even if the result is a whole number."
  },
  {
    "question": "Which built-in Python function is used to determine the data type of a variable?",
    "options": ["typeof()", "gettype()", "type()", "datatype()"],
    "answerIndex": 2,
    "explanation": "The `type()` function in Python returns the data type of an object."
  },
  {
    "question": "What is the data type of the following literal: `[1, 2, 'hello']`?",
    "options": ["tuple", "set", "list", "dictionary"],
    "answerIndex": 2,
    "explanation": "Square brackets `[]` are used to define a list, which is an ordered and mutable sequence of items."
  },
  {
    "question": "What is the data type of the following literal: `{'name': 'Alice', 'age': 30}`?",
    "options": ["list", "tuple", "set", "dictionary"],
    "answerIndex": 3,
    "explanation": "Curly braces `{}` containing key-value pairs define a dictionary, where each key is unique."
  },
  {
    "question": "What is the data type of the following literal: `(1, 'two', 3.0)`?",
    "options": ["list", "tuple", "set", "dictionary"],
    "answerIndex": 1,
    "explanation": "Parentheses `()` are used to define a tuple, which is an ordered and immutable sequence of items."
  },
  {
    "question": "What is the data type of the following literal: `{1, 2, 2, 3}`?",
    "options": ["list", "tuple", "set", "dictionary"],
    "answerIndex": 2,
    "explanation": "Curly braces `{}` containing comma-separated values (without key-value pairs) define a set, which is an unordered collection of unique elements."
  },
  {
    "question": "What will be the result of `type('hello') == type('world')`?",
    "options": ["True", "False", "Error", "None"],
    "answerIndex": 0,
    "explanation": "Both 'hello' and 'world' are strings, so their types are equal, resulting in `True`."
  },
  {
    "question": "What is the standard built-in function in Python used to display output to the console?",
    "options": ["display()", "show()", "print()", "output()"],
    "answerIndex": 2,
    "explanation": "The `print()` function is the primary way to display output in Python."
  },
  {
    "question": "What will be the output of the following code?\n```python\nprint('Hello', 'World')\n```",
    "options": ["HelloWorld", "Hello,World", "'Hello' 'World'", "Hello World"],
    "answerIndex": 3,
    "explanation": "By default, the `print()` function separates multiple arguments with a space."
  },
  {
    "question": "How can you specify a different separator between the arguments of the `print()` function?",
    "options": ["using the 'sep' argument", "using the 'separator' argument", "by concatenating strings with '+'", "it's not possible"],
    "answerIndex": 0,
    "explanation": "The `sep` argument in the `print()` function allows you to define the separator between the printed values."
  },
  {
    "question": "What will be the output of the following code?\n```python\nprint('Hello', 'World', sep=',')\n```",
    "options": ["HelloWorld", "Hello World", "Hello,World", "'Hello','World'"],
    "answerIndex": 2,
    "explanation": "The `sep=','` argument tells the `print()` function to use a comma as the separator."
  },
  {
    "question": "How can you prevent the `print()` function from adding a newline character at the end of the output?",
    "options": ["using the 'end' argument", "using the 'newline' argument set to False", "by using a different function", "it's not possible"],
    "answerIndex": 0,
    "explanation": "The `end` argument in the `print()` function specifies what character to print at the end (default is '\\n' for newline)."
  },
  {
    "question": "What will be the output of the following code?\n```python\nprint('Hello', end='!')\nprint('World')\n```",
    "options": ["HelloWorld!", "Hello!World", "Hello\nWorld!", "Hello! \nWorld"],
    "answerIndex": 1,
    "explanation": "The first `print()` statement ends with '!', and the second `print()` starts on the same line."
  },
  {
    "question": "How can you format a string to include variable values in the output using f-strings (formatted string literals)?",
    "options": ["using % operator", "using .format() method", "by directly embedding variables in curly braces preceded by 'f'", "using string concatenation with '+'"],
    "answerIndex": 2,
    "explanation": "F-strings provide a concise way to embed expressions inside string literals by prefixing the string with 'f' and enclosing variables or expressions in curly braces `{}`."
  },
  {
    "question": "What will be the output of the following code?\n```python\nname = 'Alice'\nage = 30\nprint(f'My name is {name} and I am {age} years old.')\n```",
    "options": ["My name is name and I am age years old.", "My name is {name} and I am {age} years old.", "My name is Alice and I am 30 years old.", "Error"],
    "answerIndex": 2,
    "explanation": "F-strings replace the variable names inside the curly braces with their corresponding values."
  },
  {
    "question": "Which method can be used to format a string by substituting values into placeholders denoted by curly braces?",
    "options": ["format()", "replace()", "insert()", "modify()"],
    "answerIndex": 0,
    "explanation": "The `.format()` method of a string object allows you to substitute values into placeholders within the string."
  },
  {
    "question": "What will be the output of the following code?\n```python\nprint('The value is {}'.format(42))\n```",
    "options": ["The value is {}", "The value is 42", "The value is (42)", "Error"],
    "answerIndex": 1,
    "explanation": "The `{}` placeholder in the string is replaced by the argument passed to the `.format()` method."
  },
  {
    "question": "Which of the following is an arithmetic operator in Python?",
    "options": ["=", "==", "+=", " % "],
    "answerIndex": 3,
    "explanation": "The modulo operator (%) is an arithmetic operator that returns the remainder of a division."
  },
  {
    "question": "What will be the result of `10 // 3`?",
    "options": ["3.333...", "3", "1", "Error"],
    "answerIndex": 1,
    "explanation": "The floor division operator `//` performs division and rounds the result down to the nearest whole number."
  },
  {
    "question": "Which operator is used for exponentiation in Python?",
    "options": ["^", "**", "*", "//"],
    "answerIndex": 1,
    "explanation": "The double asterisk `**` is used to raise a number to a power (exponentiation)."
  },
  {
    "question": "What will be the result of `5 ** 2`?",
    "options": ["10", "25", "7", "Error"],
    "answerIndex": 1,
    "explanation": "`5 ** 2` calculates 5 raised to the power of 2, which is 25."
  },
  {
    "question": "Which of the following is a comparison operator in Python?",
    "options": ["=", "+", "*=", "=="],
    "answerIndex": 3,
    "explanation": "The equality operator `==` compares if two operands are equal."
  },
  {
    "question": "What will be the result of `10 > 5`?",
    "options": ["True", "False", "Error", "None"],
    "answerIndex": 0,
    "explanation": "The greater than operator `>` checks if the left operand is greater than the right operand, which is true in this case."
  },
  {
    "question": "Which of the following is a logical operator in Python?",
    "options": ["&", "|", "and", "~"],
    "answerIndex": 2,
    "explanation": "`and` is a logical operator that returns `True` if both operands are true."
  },
  {
    "question": "What will be the result of `True and False`?",
    "options": ["True", "False", "Error", "None"],
    "answerIndex": 1,
    "explanation": "The `and` operator requires both operands to be `True` for the result to be `True`."
  },
  {
    "question": "Which of the following is an assignment operator in Python?",
    "options": ["==", "-", "*", "+="],
    "answerIndex": 3,
    "explanation": "The `+=` operator is a shorthand assignment operator that adds the right operand to the left operand and assigns the result to the left operand."
  },
  {
    "question": "What will be the value of 'x' after the following code?\n```python\nx = 5\nx += 2\n```",
    "options": ["5", "2", "7", "Error"],
    "answerIndex": 2,
    "explanation": "`x += 2` is equivalent to `x = x + 2`, so 'x' becomes 5 + 2 = 7."
  },
  {
    "question": "Which of the following is a bitwise operator in Python?",
    "options": ["%", "**", "//", "&"],
    "answerIndex": 3,
    "explanation": "The ampersand `&` is the bitwise AND operator."
  },
  {
    "question": "Which of the following is NOT a valid control flow statement in Python?",
    "options": ["if", "elif", "else", "switch"],
    "answerIndex": 3,
    "explanation": "Python does not have a `switch` statement like some other programming languages. You typically use `if`, `elif`, and `else` for multi-way branching."
  },
  {
    "question": "What is the purpose of the `pass` statement in Python?",
    "options": ["To indicate the end of a conditional block.", "To skip the current iteration of a loop.", "To define an empty block of code when a statement is syntactically required.", "To exit the program."],
    "answerIndex": 2,
    "explanation": "The `pass` statement is a null operation; nothing happens when it executes. It's often used as a placeholder where code will eventually be written."
  },
  {
    "question": "What will be the output of the following code?\n```python\nx = 0\nif x > 0:\n    print('Positive')\nelif x < 0:\n    print('Negative')\nelse:\n    pass\nprint('End of check')\n```",
    "options": ["Positive\nEnd of check", "Negative\nEnd of check", "End of check", "No output"],
    "answerIndex": 2,
    "explanation": "Since `x` is 0, the `else` block is executed, which contains the `pass` statement (doing nothing). Then, the final `print('End of check')` statement is executed."
  },
  {
    "question": "Can you have an `elif` block without a preceding `if` block?",
    "options": ["Yes", "No", "Only in certain versions of Python", "Only if there is an `else` block"],
    "answerIndex": 1,
    "explanation": "`elif` is always used in conjunction with a preceding `if` (or another `elif`). It's an 'else if' condition."
  },
  {
    "question": "Can you have an `else` block without a preceding `if` block?",
    "options": ["Yes", "No", "Only in certain versions of Python", "Only if there is an `elif` block"],
    "answerIndex": 1,
    "explanation": "An `else` block must always follow an `if` (or a series of `if` and `elif` blocks). It provides a default action when none of the preceding conditions are true."
  },
  {
    "question": "What determines which block of code is executed in an `if-elif-else` structure?",
    "options": ["The block with the most lines of code.", "The first block encountered.", "The block whose condition evaluates to `True` first. If no condition is true, the `else` block (if present) is executed.", "The last block in the structure."],
    "answerIndex": 2,
    "explanation": "The conditions are checked sequentially. The first condition that evaluates to `True` has its corresponding block executed, and then the rest of the structure is skipped. If no condition is true, the `else` block is executed if it exists."
  },
  {
    "question": "What will be the output of the following code?\n```python\nflag = False\nif flag == True:\n    print('Flag is true')\nelse:\n    print('Flag is false')\n```",
    "options": ["Flag is true", "Flag is false", "No output", "Error"],
    "answerIndex": 1,
    "explanation": "The variable `flag` is assigned `False`, so the condition `flag == True` is false, and the `else` block is executed."
  },
  {
    "question": "In Python, what is considered a 'falsy' value in a boolean context within an `if` statement?",
    "options": ["Only the boolean value `False`.", "Only the integer 0.", "Empty sequences (like [], '', ()), the number 0, `None`, and the boolean value `False`.", "Any value that is not explicitly `True`."],
    "answerIndex": 2,
    "explanation": "Python has several 'falsy' values that evaluate to `False` in a boolean context, including empty collections, zero, and `None`."
  },
  {
    "question": "What will be the output of the following code?\n```python\nmy_list = []\nif my_list:\n    print('List is not empty')\nelse:\n    print('List is empty')\n```",
    "options": ["List is not empty", "List is empty", "No output", "Error"],
    "answerIndex": 1,
    "explanation": "An empty list `[]` is considered a falsy value in a boolean context, so the `else` block is executed."
  },
  {
    "question": "How many `else` blocks can you have in a single `if-elif-else` structure?",
    "options": ["Multiple `else` blocks are allowed.", "Exactly two `else` blocks.", "At most one `else` block, and it must be at the end.", "An `else` block is mandatory."],
    "answerIndex": 2,
    "explanation": "An `if-elif-else` structure can have at most one `else` block, and it must be the final block to handle cases where none of the preceding conditions are true."
  },
  {
    "question": "What keyword is used to start a `for` loop in Python?",
    "options": ["for", "loop", "while", "iterate"],
    "answerIndex": 0,
    "explanation": "The `for` keyword is used to begin a `for` loop."
  },
  {
    "question": "What is the primary use case for a `for` loop in Python?",
    "options": ["To repeat a block of code indefinitely.", "To execute a block of code based on a condition.", "To iterate over a sequence (like a list, string, or range).", "To define a function."],
    "answerIndex": 2,
    "explanation": "`for` loops are designed for iterating through the items of a sequence."
  },
  {
    "question": "What will be the output of the following code?\n```python\nfor i in [1, 2, 3]:\n    print(i)\n```",
    "options": ["1 2 3", "[1, 2, 3]", "1\n2\n3", "Error"],
    "answerIndex": 2,
    "explanation": "The loop iterates through the list, and in each iteration, the current element is assigned to 'i' and printed on a new line."
  },
  {
    "question": "What is the purpose of the `range()` function when used in a `for` loop?",
    "options": ["To specify a condition for the loop to continue.", "To generate a sequence of numbers.", "To define the step size of the iteration.", "To create a list of indices."],
    "answerIndex": 1,
    "explanation": "The `range()` function is commonly used with `for` loops to generate a sequence of numbers to iterate over."
  },
  {
    "question": "What will be the output of the following code?\n```python\nfor i in range(3):\n    print(i)\n```",
    "options": ["1\n2\n3", "0\n1\n2", "0 1 2", "Error"],
    "answerIndex": 1,
    "explanation": "`range(3)` generates a sequence of numbers from 0 up to (but not including) 3."
  },
  {
    "question": "How can you iterate through a string character by character using a `for` loop?",
    "options": ["using a counter variable and indexing", "directly iterating over the string", "using the `split()` method", "it's not possible"],
    "answerIndex": 1,
    "explanation": "A string is a sequence, so you can directly iterate over its characters in a `for` loop."
  },
  {
    "question": "What will be the output of the following code?\n```python\nfor char in 'hello':\n    print(char)\n```",
    "options": ["hello", "'h' 'e' 'l' 'l' 'o'", "h\ne\nl\nl\no", "Error"],
    "answerIndex": 2,
    "explanation": "The loop iterates through each character in the string 'hello', printing each character on a new line."
  },
  {
    "question": "What is the purpose of the `break` statement inside a `for` loop?",
    "options": ["To skip the current iteration and move to the next.", "To exit the loop prematurely.", "To continue to the next loop in a nested structure.", "To define the end of the loop."],
    "answerIndex": 1,
    "explanation": "The `break` statement immediately terminates the execution of the loop it is in."
  },
  {
    "question": "What will be the output of the following code?\n```python\nfor i in range(5):\n    if i == 3:\n        break\n    print(i)\n```",
    "options": ["0\n1\n2\n3\n4", "0\n1\n2", "3\n4", "Error"],
    "answerIndex": 1,
    "explanation": "The loop iterates from 0 to 4. When 'i' becomes 3, the `break` statement is executed, and the loop terminates."
  },
  {
    "question": "What is the purpose of the `continue` statement inside a `for` loop?",
    "options": ["To exit the loop.", "To restart the loop from the beginning.", "To skip the rest of the code in the current iteration and move to the next iteration.", "To define a conditional block within the loop."],
    "answerIndex": 2,
    "explanation": "The `continue` statement skips the remaining code within the current iteration of the loop and proceeds to the next iteration."
  },
  {
    "question": "What will be the output of the following code?\n```python\nfor i in range(5):\n    if i == 3:\n        continue\n    print(i)\n```",
    "options": ["0\n1\n2\n3\n4", "0\n1\n2\n4", "3", "Error"],
    "answerIndex": 1,
    "explanation": "When 'i' is 3, the `continue` statement is executed, skipping the `print(i)` for that iteration. The loop then continues with the next value of 'i'."
  },
  {
    "question": "What will be the output of the following code?\n```python\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1\nelse:\n    print('Loop ended')\n```",
    "options": ["0\n1\n2", "0\n1\n2\nLoop ended", "Loop ended\n0\n1\n2", "Error"],
    "answerIndex": 1,
    "explanation": "The loop completes normally (the condition becomes false), so the `else` block is executed."
  },
  {
    "question": "What will be the output of the following code?\n```python\nnum = 0\nwhile num < 5:\n    if num == 3:\n        break\n    print(num)\n    num += 1\nelse:\n    print('Loop ended')\n```",
    "options": ["0\n1\n2\nLoop ended", "0\n1\n2", "Loop ended", "Error"],
    "answerIndex": 1,
    "explanation": "The loop is terminated by the `break` statement when `num` is 3, so the `else` block is not executed."
  },
  {
    "question": "In what scenarios might a `while True` loop be used?",
    "options": ["When you know exactly how many iterations are needed.", "When you want the loop to run a specific number of times.", "When you need a loop that continues until a certain condition is met within the loop's body (often using `break`).", "When iterating over a fixed sequence."],
    "answerIndex": 3,
    "explanation": "`while True` creates an infinite loop that is typically exited using a `break` statement based on some condition checked inside the loop."
  },
  {
    "question": "How can you simulate a `for` loop's behavior of iterating over a sequence using a `while` loop?",
    "options": ["It's not possible.", "By using the `range()` function and an index variable.", "By directly assigning the sequence to the `while` condition.", "By using the `enumerate()` function as the condition."],
    "answerIndex": 1,
    "explanation": "You can use a `while` loop with an index variable that is incremented in each iteration, along with the `range()` function to control the number of iterations based on the sequence's length."
  },
  {
    "question": "What is a common pitfall to avoid when using `while` loops?",
    "options": ["Using too many variables.", "Having a condition that is too complex.", "Creating infinite loops by not updating the variables in the loop's condition.", "Using `break` and `continue` statements."],
    "answerIndex": 2,
    "explanation": "Forgetting to modify the variables that the `while` loop's condition depends on is a common mistake that leads to infinite loops."
  },
  {
    "question": "Can you nest `while` loops inside other `while` loops or `for` loops?",
    "options": ["No, nesting loops is not allowed in Python.", "Yes, you can nest `while` loops within other loops.", "Only `for` loops can be nested.", "Only `while` loops can be nested within `for` loops."],
    "answerIndex": 1,
    "explanation": "Python allows you to nest any type of loop (both `while` and `for`) inside other loops."
  },
  {
    "question": "What will be the output of the following code?\n```python\nouter_count = 0\nwhile outer_count < 2:\n    inner_count = 0\n    while inner_count < 2:\n        print(f'({outer_count}, {inner_count})')\n        inner_count += 1\n    outer_count += 1\n```",
    "options": ["(0, 0)\n(1, 1)", "(0, 0)\n(0, 1)\n(1, 0)\n(1, 1)", "(0, 0) (0, 1) (1, 0) (1, 1)", "Error"],
    "answerIndex": 1,
    "explanation": "The outer loop runs twice. For each iteration of the outer loop, the inner loop runs twice, printing the pairs of `outer_count` and `inner_count`."
  },
  {
    "question": "In a `while` loop, when is the condition checked?",
    "options": ["At the end of each iteration.", "Before the start of each iteration.", "Only at the beginning of the loop.", "After the first iteration."],
    "answerIndex": 1,
    "explanation": "The condition of a `while` loop is evaluated before the start of each iteration. If the condition is true, the loop body is executed; otherwise, the loop terminates."
  },
  {
    "question": "Which type of loop is generally preferred when you know the number of iterations in advance?",
    "options": ["`while` loop", "`while True` loop", "`for` loop", "Both `while` and `for` are equally preferred."],
    "answerIndex": 2,
    "explanation": "`for` loops are typically preferred when you need to iterate a known number of times or over the elements of a sequence."
  },
  {
    "question": "Which type of loop is generally preferred when the number of iterations is unknown and depends on a condition?",
    "options": ["`for` loop", "`for...else` loop", "`while` loop", "Both are equally preferred."],
    "answerIndex": 2,
    "explanation": "`while` loops are more suitable when the number of iterations is not known beforehand and depends on a condition being met."
  },
  {
    "question": "How is a list defined in Python?",
    "options": ["Using curly braces {}", "Using parentheses ()", "Using square brackets []", "Using the keyword 'list'"],
    "answerIndex": 2,
    "explanation": "Lists in Python are created by enclosing a sequence of items within square brackets `[]`, separated by commas."
  },
  {
    "question": "What characteristic defines a list in Python?",
    "options": ["Immutable and ordered", "Mutable and unordered", "Mutable and ordered", "Immutable and unordered"],
    "answerIndex": 2,
    "explanation": "Python lists are mutable (their elements can be changed) and ordered (the order of elements is preserved)."
  },
  {
    "question": "Can a Python list contain elements of different data types?",
    "options": ["No, all elements must be of the same type.", "Yes, a list can contain a mix of different data types.", "Only if explicitly specified.", "Only for certain data types."],
    "answerIndex": 1,
    "explanation": "Python lists are flexible and can hold items of various data types within the same list."
  },
  {
    "question": "How do you access the element at a specific index in a list?",
    "options": ["Using parentheses () after the list name.", "Using curly braces {} after the list name.", "Using square brackets [] after the list name with the index inside.", "Using the `.get()` method."],
    "answerIndex": 2,
    "explanation": "List elements are accessed using their index within square brackets. Python uses zero-based indexing."
  },
  {
    "question": "What will be the output of the following code?\n```python\nmy_list = [10, 20, 30]\nprint(my_list[1])\n```",
    "options": ["10", "20", "30", "Error"],
    "answerIndex": 1,
    "explanation": "The index 1 refers to the second element in the list (remembering zero-based indexing)."
  },
  {
    "question": "How can you access the last element of a list?",
    "options": ["Using the index -1.", "Using the `last()` method.", "Using the index equal to the length of the list.", "It's not directly possible."],
    "answerIndex": 0,
    "explanation": "Negative indexing allows you to access elements from the end of the list. -1 refers to the last element."
  },
  {
    "question": "What will be the output of the following code?\n```python\nmy_list = [1, 2, 3, 4]\nprint(my_list[-2])\n```",
    "options": ["1", "2", "3", "4"],
    "answerIndex": 2,
    "explanation": "The index -2 refers to the second-to-last element in the list."
  },
  {
    "question": "How can you get a slice of a list (a sub-list)?",
    "options": ["Using the `.slice()` method.", "Using a colon `:` within square brackets `[]` to specify the start and end indices.", "Using the `sublist()` function.", "It's not possible to get a sub-list directly."],
    "answerIndex": 1,
    "explanation": "List slicing uses the syntax `[start:end]` to extract a portion of the list. The element at the `end` index is not included."
  },
  {
    "question": "What will be the output of the following code?\n```python\nmy_list = [10, 20, 30, 40, 50]\nprint(my_list[1:4])\n```",
    "options": ["[10, 20, 30]", "[20, 30, 40]", "[20, 30, 40, 50]", "[10, 20, 30, 40]"],
    "answerIndex": 1,
    "explanation": "The slice `[1:4]` extracts elements from index 1 up to (but not including) index 4."
  },
  {
    "question": "Which built-in method is used to add an element to the end of a list?",
    "options": ["add()", "insert()", "append()", "extend()"],
    "answerIndex": 2,
    "explanation": "The `append()` method adds a single element to the very end of a list."
  },
  {
    "question": "Which built-in method is used to join a list of strings into a single string using a specified separator?",
    "options": ["concat()", "merge()", "join()", "combine()"],
    "answerIndex": 2,
    "explanation": "The `join()` method is called on the separator string, and it takes a list (or other iterable) of strings as an argument."
  },
  {
    "question": "Which built-in method is used to check if a string starts with a specific prefix?",
    "options": ["beginswith()", "startswith()", "hasprefix()", "prefix()"],
    "answerIndex": 1,
    "explanation": "The `startswith()` method returns `True` if the string starts with the specified prefix, and `False` otherwise."
  },
  {
    "question": "Which built-in method is used to check if a string ends with a specific suffix?",
    "options": ["endswith()", "finishes_with()", "hassuffix()", "suffix()"],
    "answerIndex": 0,
    "explanation": "The `endswith()` method returns `True` if the string ends with the specified suffix, and `False` otherwise."
  },
  {
    "question": "Which built-in method is used to find the first occurrence of a substring within a string?",
    "options": ["find()", "index()", "search()", "locate()"],
    "answerIndex": 0,
    "explanation": "The `find()` method returns the index of the first occurrence of the substring. If the substring is not found, it returns -1."
  },
  {
    "question": "What is the difference between the `find()` and `index()` methods for strings?",
    "options": ["`find()` returns -1 if not found, `index()` raises a ValueError.", "`index()` returns -1 if not found, `find()` raises a ValueError.", "They do the same thing.", "`find()` can only search from the beginning, `index()` can search from a specific position."],
    "answerIndex": 0,
    "explanation": "The key difference is how they handle the case where the substring is not found. `find()` returns -1, while `index()` raises a ValueError."
  },
  {
    "question": "Which built-in method is used to replace all occurrences of a substring with another substring?",
    "options": ["change()", "substitute()", "replace()", "update()"],
    "answerIndex": 2,
    "explanation": "The `replace()` method returns a new string where all occurrences of a specified substring have been replaced with another substring."
  },
  {
    "question": "How can you check if all characters in a string are alphanumeric?",
    "options": ["isalnum()", "isalphanumeric()", "checkalphanum()", "is_alphanumeric()"],
    "answerIndex": 0,
    "explanation": "The `isalnum()` method returns `True` if all characters in the string are alphanumeric (letters or numbers), and `False` otherwise."
  },
  {
    "question": "What is string formatting in Python?",
    "options": ["Changing the data type of a string.", "Rearranging the characters in a string.", "Inserting values of variables into a string literal.", "Removing whitespace from a string."],
    "answerIndex": 2,
    "explanation": "String formatting allows you to embed expressions inside string literals, producing formatted output."
  },
  {
    "question": "What is an f-string (formatted string literal) in Python?",
    "options": ["A string that is always in uppercase.", "A string used for file operations.", "A string literal that is prefixed with 'f' and allows embedding expressions inside curly braces {}.", "A string that cannot be modified."],
    "answerIndex": 2,
    "explanation": "F-strings provide a concise and readable way to embed expressions directly within string literals for formatting."
  },
  {
    "question": "What will be the output of the following code?\n```python\nname = 'Charlie'\nage = 25\nprint(f'My name is {name} and I am {age} years old.')\n```",
    "options": ["My name is name and I am age years old.", "My name is {name} and I am {age} years old.", "My name is Charlie and I am 25 years old.", "Error"],
    "answerIndex": 2,
    "explanation": "F-strings evaluate the expressions inside the curly braces and insert their values into the string."
  },
  {
    "question": "How are tuples defined in Python?",
    "options": ["Using curly braces {}", "Using square brackets []", "Using parentheses ()", "Using the keyword 'tuple'"],
    "answerIndex": 2,
    "explanation": "Tuples in Python are created by enclosing a sequence of items within parentheses `()`, separated by commas."
  },
  {
    "question": "What is the key characteristic that distinguishes tuples from lists in Python?",
    "options": ["Tuples are ordered, lists are unordered.", "Tuples are mutable, lists are immutable.", "Tuples are immutable, lists are mutable.", "Tuples can only contain one data type."],
    "answerIndex": 2,
    "explanation": "The primary difference is that tuples are immutable, meaning their elements cannot be changed after creation, while lists are mutable."
  },
  {
    "question": "Can a Python tuple contain elements of different data types?",
    "options": ["No, all elements must be of the same type.", "Yes, a tuple can contain a mix of different data types.", "Only if explicitly specified.", "Only for certain data types."],
    "answerIndex": 1,
    "explanation": "Like lists, tuples are flexible and can hold items of various data types within the same tuple."
  },
  {
    "question": "How do you access an element at a specific index in a tuple?",
    "options": ["Using curly braces {} after the tuple name.", "Using square brackets [] after the tuple name with the index inside.", "Using the `.get()` method.", "Using parentheses () after the tuple name."],
    "answerIndex": 1,
    "explanation": "Tuple elements are accessed using their index within square brackets `[]`. Python uses zero-based indexing."
  },
  {
    "question": "What will be the output of the following code?\n```python\nmy_tuple = (10, 20, 30)\nprint(my_tuple[1])\n```",
    "options": ["10", "20", "30", "Error"],
    "answerIndex": 1,
    "explanation": "The index 1 refers to the second element in the tuple (remembering zero-based indexing)."
  },
  {
    "question": "How can you get a slice of a tuple (a sub-tuple)?",
    "options": ["Using the `.slice()` method.", "Using a colon `:` within square brackets `[]` to specify the start and end indices.", "Using the `subtuple()` function.", "It's not possible to get a sub-tuple directly."],
    "answerIndex": 1,
    "explanation": "Tuple slicing uses the syntax `[start:end]` to extract a portion of the tuple. The element at the `end` index is not included. The result is a new tuple."
  },
  {
    "question": "What will be the output of the following code?\n```python\nmy_tuple = (1, 2, 3, 4, 5)\nprint(my_tuple[1:4])\n```",
    "options": ["(1, 2, 3)", "(2, 3, 4)", "(2, 3, 4, 5)", "(1, 2, 3, 4)"],
    "answerIndex": 1,
    "explanation": "The slice `[1:4]` extracts elements from index 1 up to (but not including) index 4, resulting in a new tuple."
  },
  {
    "question": "Which of the following operations is NOT allowed on a tuple?",
    "options": ["Concatenation using `+`", "Accessing elements by index", "Slicing", "Modifying an element at a specific index"],
    "answerIndex": 3,
    "explanation": "Due to their immutability, you cannot directly modify elements within a tuple after it has been created."
  },
  {
    "question": "What will happen if you try to assign a new value to an element of a tuple (e.g., `my_tuple[0] = 5`)?",
    "options": ["The value will be updated successfully.", "A new tuple will be created with the updated value.", "A TypeError will be raised.", "The program will crash."],
    "answerIndex": 2,
    "explanation": "Attempting to modify an element of a tuple violates its immutability and results in a TypeError."
  },
  {
    "question": "Which built-in function can be used to find the number of elements in a tuple?",
    "options": ["size()", "length()", "len()", "count()"],
    "answerIndex": 2,
    "explanation": "The `len()` function returns the number of items in a sequence, including tuples."
  },
  {
    "question": "Which built-in method returns a view object that displays a list of all keys in the dictionary?",
    "options": ["keys()", "values()", "items()", "getkeys()"],
    "answerIndex": 0,
    "explanation": "The `keys()` method returns a view object that provides a dynamic view of the dictionary's keys."
  },
  {
    "question": "Which built-in method returns a view object that displays a list of all values in the dictionary?",
    "options": ["keys()", "values()", "items()", "getvalues()"],
    "answerIndex": 1,
    "explanation": "The `values()` method returns a view object that provides a dynamic view of the dictionary's values."
  },
  {
    "question": "Which built-in method returns a view object that displays a list of all key-value pairs (as tuples) in the dictionary?",
    "options": ["keys()", "values()", "items()", "pairs()"],
    "answerIndex": 2,
    "explanation": "The `items()` method returns a view object that provides a dynamic view of the dictionary's items (key-value pairs as tuples)."
  },
  {
    "question": "How can you iterate over the keys of a dictionary using a `for` loop?",
    "options": ["directly iterating over the dictionary", "using the `.keys()` method", "both a and b", "using the `.values()` method"],
    "answerIndex": 2,
    "explanation": "You can directly iterate over a dictionary, which will iterate over its keys by default. You can also explicitly use the `.keys()` method."
  },
  {
    "question": "How can you iterate over the values of a dictionary using a `for` loop?",
    "options": ["directly iterating over the dictionary", "using the `.keys()` method", "using the `.values()` method", "using the `.items()` method"],
    "answerIndex": 2,
    "explanation": "You can iterate over the values of a dictionary using the `.values()` method, which returns a view object of the values."
  },
  {
    "question": "How can you iterate over both the keys and values of a dictionary using a `for` loop?",
    "options": ["using separate loops for keys and values", "using the `.keys()` and `.values()` methods simultaneously", "using the `.items()` method", "it's not directly possible"],
    "answerIndex": 2,
    "explanation": "The `.items()` method returns a view object of key-value pairs as tuples, which can be unpacked in the `for` loop (e.g., `for key, value in my_dict.items():`)."
  },
  {
    "question": "What is dictionary comprehension in Python?",
    "options": ["A way to define functions that operate on dictionaries.", "A concise way to create new dictionaries based on existing iterables.", "A method for sorting dictionaries by key or value.", "A technique for merging multiple dictionaries."],
    "answerIndex": 1,
    "explanation": "Dictionary comprehension provides a compact syntax for creating dictionaries using expressions for keys and values based on an iterable."
  },
  {
    "question": "What will be the output of the following dictionary comprehension?\n```python\nnumbers = [1, 2, 3, 4]\nsquared_dict = {num: num**2 for num in numbers}\nprint(squared_dict)\n```",
    "options": ["{1: 1, 2: 4, 3: 9, 4: 16}", "[1: 1, 2: 4, 3: 9, 4: 16]", "(1: 1, 2: 4, 3: 9, 4: 16)", "Error"],
    "answerIndex": 0,
    "explanation": "The dictionary comprehension iterates through the `numbers` list and creates a dictionary where each number is the key and its square is the value."
  },
  {
    "question": "How are sets defined in Python?",
    "options": ["Using square brackets []", "Using parentheses ()", "Using curly braces {} (for non-empty sets) or the `set()` constructor", "Using the keyword 'set' followed by elements in parentheses"],
    "answerIndex": 2,
    "explanation": "Sets are defined using curly braces `{}` for non-empty sets, with elements separated by commas, or by using the `set()` constructor."
  },
  {
    "question": "What is the key characteristic of a set in Python?",
    "options": ["Ordered and mutable", "Unordered and mutable with duplicate elements allowed", "Unordered and mutable with only unique elements", "Ordered and immutable"],
    "answerIndex": 2,
    "explanation": "Sets are unordered collections that store only unique elements. They are mutable, meaning you can add or remove elements."
  },
  {
    "question": "How do you create an empty set in Python?",
    "options": ["empty_set = {}", "empty_set = set", "empty_set = set()", "empty_set = []"],
    "answerIndex": 2,
    "explanation": "An empty set is created using the `set()` constructor. Using `{}` creates an empty dictionary."
  },
  {
    "question": "Can a Python set contain elements of different data types?",
    "options": ["No, all elements must be of the same type.", "Yes, a set can contain a mix of different immutable data types.", "Only if explicitly specified.", "Only for certain data types."],
    "answerIndex": 1,
    "explanation": "Sets can contain elements of different immutable data types, such as numbers, strings, and tuples."
  },
  {
    "question": "What happens if you try to add a duplicate element to a set?",
    "options": ["It will raise an error.", "The duplicate element will be added.", "The duplicate element will be ignored.", "The set will be sorted to remove duplicates."],
    "answerIndex": 2,
    "explanation": "Sets only store unique elements, so adding a duplicate has no effect on the set."
  },
  {
    "question": "Which built-in method is used to add a single element to a set?",
    "options": ["add()", "insert()", "append()", "update()"],
    "answerIndex": 0,
    "explanation": "The `add()` method adds a single element to the set. If the element is already present, the set remains unchanged."
  },
  {
    "question": "Which built-in method is used to add multiple elements from an iterable (like a list or another set) to a set?",
    "options": ["add_multiple()", "append() with a list", "update()", "insert_multiple()"],
    "answerIndex": 2,
    "explanation": "The `update()` method adds all elements from the iterable to the set. Duplicate elements are automatically ignored."
  },
  {
    "question": "Which built-in method is used to remove a specific element from a set? It raises a KeyError if the element is not found.",
    "options": ["remove()", "discard()", "pop()", "delete()"],
    "answerIndex": 0,
    "explanation": "The `remove()` method removes the specified element. If the element is not in the set, it raises a KeyError."
  },
  {
    "question": "Which built-in method is also used to remove a specific element from a set, but it does nothing if the element is not found?",
    "options": ["remove()", "discard()", "pop()", "delete()"],
    "answerIndex": 1,
    "explanation": "The `discard()` method removes the element if it is present in the set; otherwise, it does nothing and does not raise an error."
  },
  {
    "question": "Which built-in method is used to remove and return an arbitrary element from a set?",
    "options": ["remove()", "discard()", "pop()", "clear()"],
    "answerIndex": 2,
    "explanation": "The `pop()` method removes and returns an arbitrary element from the set. Since sets are unordered, you cannot predict which element will be removed."
  },
  {
    "question": "What are `*args` used for in a function definition?",
    "options": ["To pass a fixed number of arguments.", "To pass a variable number of keyword arguments.", "To pass a variable number of positional arguments.", "To define the return type of the function."],
    "answerIndex": 2,
    "explanation": "`*args` allows a function to accept an arbitrary number of positional arguments. These arguments are collected into a tuple named `args` within the function."
  },
  {
    "question": "What are `**kwargs` used for in a function definition?",
    "options": ["To pass a variable number of positional arguments.", "To define keyword-only arguments.", "To pass a variable number of keyword arguments.", "To specify default values for all parameters."],
    "answerIndex": 2,
    "explanation": "`**kwargs` allows a function to accept an arbitrary number of keyword arguments. These arguments are collected into a dictionary named `kwargs` within the function."
  },
  {
    "question": "What is a docstring in Python?",
    "options": ["A comment that explains a single line of code.", "A string literal that occurs as the first statement in a module, function, class, or method definition.", "A way to define the data types of function parameters.", "A special syntax for calling external functions."],
    "answerIndex": 1,
    "explanation": "A docstring is a documentation string used to document Python code. It's typically enclosed in triple quotes and provides a description of the object's purpose, parameters, return values, etc."
  },
  {
    "question": "What is the scope of a variable defined inside a function?",
    "options": ["Global scope", "Local scope to the function", "Accessible throughout the entire program", "Scope is determined by where the function is called."],
    "answerIndex": 1,
    "explanation": "Variables defined within a function have local scope, meaning they are only accessible from within that function."
  },
  {
    "question": "What is a lambda function in Python?",
    "options": ["A function defined using the `lambda` keyword that can have multiple lines of code.", "A small anonymous function defined using the `lambda` keyword that can have any number of arguments but only one expression.", "A function that is automatically called when a program starts.", "A function that is used for error handling."],
    "answerIndex": 1,
    "explanation": "Lambda functions are small, anonymous functions defined using the `lambda` keyword. They are typically used for simple operations that can be expressed in a single line."
  },
  {
    "question": "What is recursion in the context of functions?",
    "options": ["A function that calls another function.", "A function that has multiple return statements.", "A function that calls itself.", "A function that takes a variable number of arguments."],
    "answerIndex": 2,
    "explanation": "Recursion occurs when a function calls itself within its own definition. It's a powerful technique for solving problems that can be broken down into smaller, self-similar subproblems."
  },
  {
    "question": "What is a higher-order function in Python?",
    "options": ["A function that always returns multiple values.", "A function that has a very high execution time.", "A function that can take other functions as arguments or return them as results.", "A function defined outside the main program scope."],
    "answerIndex": 2,
    "explanation": "Higher-order functions are a key feature of functional programming in Python. Examples include `map()`, `filter()`, and `sorted()`."
  },
  {
    "question": "What are decorators in Python?",
    "options": ["A way to add comments to functions.", "A design pattern used for creating classes.", "A way to modify or enhance functions or methods in a reusable way.", "A type of variable used to store function names."],
    "answerIndex": 2,
    "explanation": "Decorators provide a syntactic sugar to wrap functions, allowing you to add functionality (like logging, access control, etc.) to functions without modifying their core logic."
  },
  {
    "question": "What will be the output of the following code?\n```python\ndef greet(name='Guest'):\n    print(f'Hello, {name}!')\n\ngreet('Bob')\ngreet()\n```",
    "options": ["Hello, Bob!\nHello, Guest!", "Hello, Bob!\nHello, !", "Hello, Bob!\nHello, None!", "Error"],
    "answerIndex": 0,
    "explanation": "The first call uses the provided argument 'Bob'. The second call uses the default argument 'Guest' since no argument is provided."
  },
  {
    "question": "What is a namespace in Python?",
    "options": ["A region of code where variables are defined.", "A mapping from names to objects.", "A way to organize modules.", "A mechanism for error handling."],
    "answerIndex": 1,
    "explanation": "A namespace is a system to have unique names for everything in Python. It's implemented as a dictionary mapping names (identifiers) to objects."
  },
  {
    "question": "What are the different types of namespaces in Python?",
    "options": ["Global, Local, Built-in", "Function, Class, Module", "Public, Private, Protected", "Static, Dynamic, Automatic"],
    "answerIndex": 0,
    "explanation": "The main namespaces in Python are the global namespace (for the current module), the local namespace (for a function call), and the built-in namespace (containing predefined names)."
  },
  {
    "question": "What is the scope of a name in Python?",
    "options": ["The data type of the object it refers to.", "The lifetime of the object it refers to.", "The region of the code where the name is directly accessible without qualification.", "The memory address of the object it refers to."],
    "answerIndex": 2,
    "explanation": "The scope of a name defines the area of the program where that name can be used without needing to specify its origin (e.g., module name)."
  },
  {
    "question": "What is the LEGB rule in Python?",
    "options": ["Local, Enclosing function locals, Global, Built-in", "List, Enumerate, Get, Boolean", "Loop, Exception, Global, Break", "Lambda, Else, Global, Finally"],
    "answerIndex": 0,
    "explanation": "LEGB is an acronym that defines the order in which Python searches for a name: Local, Enclosing function locals, Global, Built-in."
  },
  {
    "question": "What is the local scope in Python?",
    "options": ["The scope of names defined in the main module.", "The scope of names defined inside a function.", "The scope of built-in names.", "The scope of names defined in imported modules."],
    "answerIndex": 1,
    "explanation": "The local scope refers to the names defined within a function. These names are only accessible from within that function."
  },
  {
    "question": "What is the global scope in Python?",
    "options": ["The scope of names defined inside any function.", "The scope of names defined in the built-in namespace.", "The scope of names defined at the top level of a module.", "The scope of names that are accessible from all modules."],
    "answerIndex": 2,
    "explanation": "The global scope refers to the names defined at the top level of a module file, or those declared using the `global` keyword."
  },
  {
    "question": "What is the built-in scope in Python?",
    "options": ["The scope of names defined in user-defined functions.", "The scope of names that are automatically imported into every module.", "The scope of names defined in external libraries.", "The scope of names that are globally accessible across all programs."],
    "answerIndex": 1,
    "explanation": "The built-in scope contains names that are predefined in Python, such as functions like `print()` and `len()`, and constants like `True` and `False`."
  },
  {
    "question": "What is the enclosing function locals scope?",
    "options": ["The scope of variables in a class that contains a method.", "The scope of variables in a module that contains a function.", "The scope of variables in an outer (enclosing) function when there is a nested function.", "The scope of variables that are shared between modules."],
    "answerIndex": 2,
    "explanation": "When a function is defined inside another function (nested function), the inner function can access the names in the local scope of the outer (enclosing) function."
  },
  {
    "question": "What happens when a variable with the same name exists in both the local and global scope within a function?",
    "options": ["The global variable is used.", "The local variable is used.", "Python raises a NameError.", "The behavior is unpredictable."],
    "answerIndex": 1,
    "explanation": "When a variable name exists in both local and global scopes within a function, the local variable takes precedence within that function."
  },
  {
    "question": "How can you access a global variable from within a function if a local variable with the same name exists?",
    "options": ["By using the `global` keyword before using the variable.", "By using the `nonlocal` keyword.", "By prefixing the variable name with the module name.", "It's not possible."],
    "answerIndex": 0,
    "explanation": "The `global` keyword is used inside a function to indicate that you intend to use the global variable with the specified name."
  },
  {
    "question": "What is a subclass (or derived class) in inheritance?",
    "options": ["The class that is inherited by other classes.", "A class that does not inherit from any other class.", "The class that inherits properties and methods from a superclass.", "The first class defined in a program."],
    "answerIndex": 2,
    "explanation": "A subclass (or derived class or child class) is a class that inherits from one or more superclasses."
  },
  {
    "question": "What is method overriding in inheritance?",
    "options": ["Defining a new method in a subclass with the same name as a method in its superclass.", "Calling a method of the superclass from within a subclass.", "Deleting a method inherited from a superclass.", "Changing the name of an inherited method."],
    "answerIndex": 0,
    "explanation": "Method overriding occurs when a subclass provides a specific implementation for a method that is already defined in its superclass. This allows the subclass to customize the inherited behavior."
  },
  {
    "question": "How can a subclass call a method of its superclass in Python?",
    "options": ["By directly using the superclass name followed by the method name.", "By using the `super()` function.", "By using the `parent()` function.", "It's not possible to directly call a superclass method."],
    "answerIndex": 1,
    "explanation": "The `super()` function is used to call methods of the superclass from within a subclass. It ensures proper handling of the inheritance hierarchy, especially in multiple inheritance scenarios."
  },
  {
    "question": "What is encapsulation in OOP?",
    "options": ["The process of hiding the internal details of an object and exposing only necessary information.", "The ability of objects to take on many forms.", "The mechanism of inheriting properties and behaviors.", "The way objects interact with each other."],
    "answerIndex": 0,
    "explanation": "Encapsulation involves bundling the data (attributes) and the methods that operate on the data within a single unit (a class) and controlling access to the internal details."
  },
  {
    "question": "What is polymorphism in OOP?",
    "options": ["The ability of a class to have multiple subclasses.", "The ability of an object to take on many forms or have behaviors that vary depending on the context.", "The process of combining data and methods into a single unit.", "The way objects are created and destroyed."],
    "answerIndex": 1,
    "explanation": "Polymorphism (meaning 'many forms') allows objects of different classes to respond to the same method call in their own specific ways."
  },
  {
    "question": "What are access modifiers (like public, private, protected) in Python?",
    "options": ["Keywords that define the data type of attributes.", "Symbols used to indicate the scope and accessibility of class members.", "Functions used to modify the attributes of an object.", "Decorators used to enhance class methods."],
    "answerIndex": 1,
    "explanation": "Python has conventions for access modifiers. Names starting with a single underscore `_` are conventionally treated as protected, and names starting with a double underscore `__` are name-mangled to make them harder to access from outside the class (intended as private)."
  },
  {
    "question": "What is a class attribute in Python?",
    "options": ["An attribute that is unique to each instance of the class.", "An attribute that is shared by all instances of the class.", "An attribute defined only within a specific method.", "An attribute that cannot be modified after the object is created."],
    "answerIndex": 1,
    "explanation": "A class attribute is defined within the class but outside any methods. It is shared by all instances (objects) of that class."
  },
  {
    "question": "What is an instance attribute in Python?",
    "options": ["An attribute that is shared by all instances of the class.", "An attribute that is specific to a particular object of the class.", "An attribute defined at the class level.", "An attribute that is read-only."],
    "answerIndex": 1,
    "explanation": "An instance attribute is defined within the methods of a class (usually in the `__init__` method) and is specific to each object created from that class."
  },
  {
    "question": "What is the purpose of the `isinstance()` function in Python?",
    "options": ["To check if a variable is an integer.", "To check if an object is an instance of a particular class or a tuple of classes.", "To check if two objects are the same instance.", "To create a new instance of a class."],
    "answerIndex": 1,
    "explanation": "The `isinstance()` function checks if an object is an instance of a specified class or a subclass thereof, or if it belongs to one of the types in a tuple of types."
  },
  {
    "question": "What is a module in Python?",
    "options": ["A collection of related classes.", "A single file containing Python code.", "A directory containing multiple Python files.", "A built-in function for specific tasks."],
    "answerIndex": 1,
    "explanation": "A module is a single file (or files) containing Python definitions and statements, which can include variables, functions, and classes."
  },
  {
    "question": "What is the primary benefit of using modules in Python?",
    "options": ["To make code run faster.", "To reduce the memory usage of a program.", "To organize code, promote reusability, and avoid naming conflicts.", "To automatically handle errors."],
    "answerIndex": 2,
    "explanation": "Modules help in structuring larger programs, allowing you to reuse code in different parts of your application and preventing name collisions between different code sections."
  },
  {
    "question": "How do you import a module in Python?",
    "options": ["Using the `include` keyword.", "Using the `import` keyword.", "Using the `require` keyword.", "Using the `load` keyword."],
    "answerIndex": 1,
    "explanation": "The `import` keyword is used to bring the code from a module into your current program."
  },
  {
    "question": "What happens when you use the statement `import math`?",
    "options": ["It copies all the code from the `math` module directly into your current file.", "It makes the `math` module's functions and variables available under the namespace `math`.", "It executes the `math` module's code immediately.", "It only imports the most commonly used functions from the `math` module."],
    "answerIndex": 1,
    "explanation": "When you import a module using `import module_name`, you create a namespace for that module, and you access its contents using the module name as a prefix (e.g., `math.sqrt()`)."
  },
  {
    "question": "How can you import specific names from a module directly into your current namespace?",
    "options": ["Using `import specific_name from module_name`.", "Using `from module_name get specific_name`.", "Using `from module_name import specific_name`.", "Using `load specific_name from module_name`."],
    "answerIndex": 2,
    "explanation": "The `from ... import ...` statement allows you to import specific names (functions, classes, variables) directly into your current namespace, so you can use them without the module prefix."
  },
  {
    "question": "What is the difference between `import math` and `from math import sqrt`?",
    "options": ["`import math` imports only functions, while `from math import sqrt` imports all names.", "`import math` creates a namespace `math`, while `from math import sqrt` makes `sqrt` directly available.", "They are functionally the same.", "`from math import sqrt` is used for built-in modules, while `import math` is for user-defined modules."],
    "answerIndex": 1,
    "explanation": "`import math` requires you to use `math.sqrt()` to call the square root function, while `from math import sqrt` allows you to use `sqrt()` directly."
  },
  {
    "question": "How can you import all names from a module into your current namespace?",
    "options": ["Using `import * from module_name`.", "Using `from module_name import all`.", "Using `from module_name import *`.", "Using `import module_name as *`."],
    "answerIndex": 2,
    "explanation": "The statement `from module_name import *` imports all public names defined in the module directly into your current namespace. However, this is generally discouraged as it can lead to naming conflicts and make it harder to determine where names originate."
  },
  {
    "question": "How can you give a module a different name when importing it?",
    "options": ["Using `import module_name rename new_name`.", "Using `import module_name as new_name`.", "Using `import new_name = module_name`.", "Using `alias module_name to new_name`."],
    "answerIndex": 1,
    "explanation": "The `import module_name as new_name` statement allows you to import a module and refer to it using a different alias in your code (e.g., `import pandas as pd`)."
  },
  {
    "question": "What is a package in Python?",
    "options": ["A single module containing multiple functions.", "A directory containing a collection of modules (and possibly sub-packages) and an `__init__.py` file.", "A compressed file containing Python code.", "A way to install external libraries."],
    "answerIndex": 1,
    "explanation": "A package is a way to structure Python's module namespace by using 'dotted module names'. It's essentially a directory containing Python modules and a special `__init__.py` file (which can be empty but must be present to mark the directory as a package)."
  },
  {
    "question": "What is the purpose of the `__init__.py` file in a Python package?",
    "options": ["To define the main function of the package.", "To specify which modules within the package should be imported when the package itself is imported.", "To mark a directory as a Python package.", "Both b and c."],
    "answerIndex": 3,
    "explanation": "The `__init__.py` file is required to make Python treat directories containing files as packages. It can be empty or can contain initialization code for the package or define which submodules are exported when the package is imported."
  },
  {
    "question": "How do you import a submodule from a package?",
    "options": ["Using `import package.submodule`.", "Using `from package get submodule`.", "Using `include package/submodule`.", "Using `load package.submodule`."],
    "answerIndex": 0,
    "explanation": "You can import a submodule using the dot notation, specifying the package name followed by the submodule name (e.g., `import my_package.my_submodule`)."
  },
  {
    "question": "How do you write a list of strings to a file, with each string on a new line?",
    "options": ["Using the `writelines()` method.", "Using a loop to write each string followed by a newline character.", "Using the `print()` function with a loop and the `file` argument.", "All of the above."],
    "answerIndex": 3,
    "explanation": "You can use `writelines()` to write a list of strings. Note that it does not automatically add newline characters, so you might need to add them manually. A loop with `write()` or `print()` can also achieve this."
  },
  {
    "question": "Why is it important to close a file after you are done with it?",
    "options": ["To prevent data loss, ensure that all buffers are flushed, and release system resources.", "To make the file read-only.", "To compress the file and save disk space.", "It's not always necessary; Python automatically closes files."],
    "answerIndex": 0,
    "explanation": "Closing a file using the `close()` method is crucial to ensure that any buffered data is written to disk and that the system resources associated with the file are released. While Python has garbage collection, relying on it for file closing is not recommended."
  },
  {
    "question": "What is the `with` statement used for when working with files?",
    "options": ["To open multiple files at once.", "To automatically close the file after the block of code is executed.", "To handle file-related exceptions.", "To change the permissions of a file."],
    "answerIndex": 1,
    "explanation": "The `with` statement provides a convenient way to work with files (and other context managers) by automatically handling the opening and closing of the file, even if errors occur within the block."
  },
  {
    "question": "What will be the content of 'output.txt' after the following code?\n```python\nwith open('output.txt', 'w') as f:\n    f.write('Hello, world!')\n```\n(Assuming 'output.txt' did not exist before)",
    "options": ["An empty file.", "The string 'Hello, world!'", "The string 'Hello, world!\n'", "An error will occur."],
    "answerIndex": 1,
    "explanation": "The 'w' mode creates the file if it doesn't exist and writes the specified string into it."
  },
  {
    "question": "What will be the content of 'output.txt' after the following code?\n```python\nwith open('output.txt', 'w') as f:\n    f.write('First line\\n')\nwith open('output.txt', 'a') as f:\n    f.write('Second line')\n```\n(Assuming 'output.txt' did not exist initially)",
    "options": ["An empty file.", "'First line\\nSecond line'", "'First line\\nSecond line\\n'", "'Second line'"],
    "answerIndex": 1,
    "explanation": "The first `with open('output.txt', 'w')` creates and writes 'First line\\n'. The second `with open('output.txt', 'a')` appends 'Second line' to the end."
  },
  {
    "question": "How can you check if a file exists before trying to open it?",
    "options": ["Using the `file_exists()` function.", "Using the `os.path.exists()` function.", "By trying to open the file in 'r' mode and catching a potential error.", "Both b and c."],
    "answerIndex": 1,
    "explanation": "The `os.path.exists()` function from the `os` module is a standard way to check if a file or directory exists at a given path."
  },
  {
    "question": "What is the difference between text mode and binary mode when working with files?",
    "options": ["Text mode is for reading, binary mode is for writing.", "Text mode handles files as sequences of characters with encoding, while binary mode handles raw bytes.", "Binary mode is faster than text mode.", "Text mode can handle any type of file, while binary mode is limited to text files."],
    "answerIndex": 1,
    "explanation": "In text mode, Python handles encoding and decoding of text based on the system's default or a specified encoding. In binary mode, files are treated as sequences of raw bytes without any encoding interpretation."
  },
  {
    "question": "What is a file pointer (or cursor)?",
    "options": ["A variable that stores the content of the file.", "An indicator of the current position within the file for reading or writing.", "The name of the file object.", "The last line of the file that was accessed."],
    "answerIndex": 1,
    "explanation": "The file pointer (or cursor) keeps track of the current location within the opened file where the next read or write operation will occur."
  },
  {
    "question": "How can you move the file pointer to a specific position in a file?",
    "options": ["Using the `move()` method.", "Using the `seek()` method.", "By closing and reopening the file at the desired position.", "It's not possible to change the file pointer's position."],
    "answerIndex": 1,
    "explanation": "The `seek()` method allows you to change the position of the file pointer to a specific offset within the file. The offset is usually relative to the beginning of the file."
  },
  {
    "question": "What is an exception in Python?",
    "options": ["A syntax error that prevents the program from running.", "An event that occurs during the execution of a program that disrupts the normal flow of instructions.", "A logical error in the code that produces incorrect output.", "A warning message that doesn't stop the program."],
    "answerIndex": 1,
    "explanation": "An exception is an error that occurs during the runtime of a program. When an exception occurs, the normal flow of the program is interrupted."
  },
  {
    "question": "What is the purpose of error handling in Python?",
    "options": ["To prevent syntax errors.", "To make the program run faster.", "To gracefully manage runtime errors and prevent the program from crashing.", "To hide errors from the user."],
    "answerIndex": 2,
    "explanation": "Error handling allows you to anticipate and manage potential runtime errors, providing a way to recover or terminate the program gracefully instead of abruptly crashing."
  },
  {
    "question": "What are the `try` and `except` blocks used for in Python?",
    "options": ["`try` is for defining functions, `except` is for calling them.", "`try` is for code that might raise an exception, `except` is for handling specific exceptions.", "`try` is for defining loops, `except` is for breaking out of them.", "`try` is for importing modules, `except` is for handling import errors."],
    "answerIndex": 1,
    "explanation": "The `try` block contains the code that might raise an exception. If an exception occurs within the `try` block, the program flow is immediately transferred to the corresponding `except` block, which contains the code to handle that specific exception."
  },
  {
    "question": "How do you specify the type of exception you want to handle in an `except` block?",
    "options": ["By using the `catch` keyword followed by the exception type.", "By writing the exception type after the `except` keyword (e.g., `except ValueError:`).", "By using a special function called `handle_exception()`.", "You cannot specify the type of exception to handle."],
    "answerIndex": 1,
    "explanation": "You specify the type of exception you want to handle by writing the name of the exception class after the `except` keyword. Only exceptions of that type (or its subclasses) will be caught by that `except` block."
  },
  {
    "question": "What happens if an exception occurs in the `try` block and there is no matching `except` block to handle it?",
    "options": ["The program continues to run normally.", "The program terminates, and an error message (traceback) is displayed.", "The exception is automatically logged to a file.", "Python tries to handle it with a default exception handler."],
    "answerIndex": 1,
    "explanation": "If an exception occurs in a `try` block and there is no matching `except` block to handle that specific type of exception, the program will terminate, and a traceback will be printed to the console, indicating where the error occurred."
  },
  {
    "question": "Can you have multiple `except` blocks after a single `try` block?",
    "options": ["No, only one `except` block is allowed.", "Yes, you can have multiple `except` blocks to handle different types of exceptions.", "Only if the `try` block contains nested `try` blocks.", "Only for specific built-in exception types."],
    "answerIndex": 1,
    "explanation": "Yes, you can have multiple `except` blocks following a single `try` block. Each `except` block can be designed to handle a specific type of exception."
  },
  {
    "question": "What is the purpose of the `else` block after a `try...except` block?",
    "options": ["It is executed if an exception occurs in the `try` block.", "It is always executed after the `try` and `except` blocks.", "It is executed if the `try` block completes without raising any exceptions.", "It is used to define a default exception handler."],
    "answerIndex": 2,
    "explanation": "The optional `else` block is executed if and only if the `try` block completes successfully without raising any exceptions. It's a good place for code that depends on the successful execution of the `try` block."
  },
  {
    "question": "What is the purpose of the `finally` block after a `try...except` block?",
    "options": ["It is executed only if an exception is raised and handled.", "It is executed only if the `try` block completes without errors.", "It is always executed, regardless of whether an exception was raised or handled.", "It is used to define the end of the error handling block."],
    "answerIndex": 2,
    "explanation": "The optional `finally` block is always executed after the `try` and `except` (and `else`, if present) blocks, even if an exception occurred and was not handled, or if the `try` block was exited via a `return`, `break`, or `continue` statement."
  },
  {
    "question": "How can you access the exception object that was raised in an `except` block?",
    "options": ["By using the keyword `exception`.", "By assigning the exception to a variable using the `as` keyword after the exception type (e.g., `except ValueError as e:`).", "The exception object is automatically available in the `except` block.", "You cannot directly access the exception object."],
    "answerIndex": 1,
    "explanation": "You can access the exception object by using the `as` keyword after the exception type in the `except` clause, followed by a variable name that will refer to the exception instance."
  },
  {
    "question": "What is the `raise` statement used for in Python?",
    "options": ["To indicate that an exception has been handled.", "To explicitly trigger a specific exception.", "To suppress an exception.", "To define a new exception type."],
    "answerIndex": 2,
    "explanation": "The `raise` statement is used to explicitly raise a specific exception. You can raise built-in exceptions or custom exceptions that you have defined."
  },
  {
    "question": "How can you define your own custom exception classes in Python?",
    "options": ["By using the `exception` keyword followed by the class name.", "By creating a new class that inherits from the base `Exception` class (or one of its subclasses).", "By using a special function called `define_exception()`.", "Custom exceptions cannot be defined in Python."],
    "answerIndex": 1,
    "explanation": "You can define custom exception classes by creating a new class that inherits from the built-in `Exception` class or one of its more specific subclasses (like `ValueError` or `TypeError`). This allows you to create exceptions that are specific to your application's needs."
  },
  {
    "question": "What is a common use case for raising your own exceptions?",
    "options": ["To signal normal program termination.", "To indicate that a function has returned a specific value.", "To signal that an unexpected or error condition has occurred that the current part of the code cannot handle.", "To improve the performance of the code."],
    "answerIndex": 2,
    "explanation": "Raising custom exceptions is useful for signaling specific error conditions in your program that might need to be handled differently at a higher level or to provide more context about the error."
  },
  {
    "question": "What is the primary purpose of regular expressions?",
    "options": ["To perform mathematical calculations on strings.", "To define the structure of Python code.", "To search for, match, and manipulate text based on patterns.", "To handle file input and output."],
    "answerIndex": 2,
    "explanation": "Regular expressions are a powerful tool for defining search patterns in text and performing operations like finding, replacing, or extracting substrings that match those patterns."
  },
  {
    "question": "Which Python module is used for working with regular expressions?",
    "options": ["string", "regex", "re", "pattern"],
    "answerIndex": 2,
    "explanation": "The `re` module in Python's standard library provides support for regular expression operations."
  },
  {
    "question": "What is a raw string in Python, and why is it often used with regular expressions?",
    "options": ["A string that cannot be modified.", "A string that is automatically converted to uppercase.", "A string literal prefixed with 'r' that treats backslashes as literal characters, which is useful for avoiding escaping issues in regex patterns.", "A string used for file paths."],
    "answerIndex": 2,
    "explanation": "Raw strings (prefixed with 'r') treat backslashes `\` as literal characters. This is important in regex because backslashes are often used for special sequences, and using raw strings prevents the need for double escaping."
  },
  {
    "question": "What does the special character `.` (dot) match in a regular expression?",
    "options": ["Only a literal dot character.", "Any single character except a newline.", "Any whitespace character.", "The beginning or end of a string."],
    "answerIndex": 1,
    "explanation": "In most regex engines, the dot `.` matches any single character except for a newline character (`\n`)."
  },
  {
    "question": "What do the special characters `^` and `$` match in a regular expression?",
    "options": ["`^` matches the start of a line, `$` matches the end of a line.", "`^` matches any character, `$` matches a whitespace character.", "`^` matches a literal caret, `$` matches a literal dollar sign.", "`^` matches the end of a string, `$` matches the start of a string."],
    "answerIndex": 0,
    "explanation": "`^` matches the beginning of the string (or the beginning of a line in multiline mode), and `$` matches the end of the string (or the end of a line in multiline mode)."
  },
  {
    "question": "What are character sets (or character classes) in regular expressions, and how are they defined?",
    "options": ["Predefined sets of characters like digits or whitespace, defined with special escape sequences.", "A set of characters enclosed in curly braces `{}` that specify the number of occurrences.", "A set of characters enclosed in square brackets `[]` that match any single character within the set.", "A way to group parts of a regular expression using parentheses `()`."],
    "answerIndex": 2,
    "explanation": "Character sets (or classes) are defined using square brackets `[]`. They match any single character that is present within the brackets (e.g., `[aeiou]` matches any lowercase vowel)."
  },
  {
    "question": "What is the purpose of quantifiers in regular expressions (e.g., `*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`)?",
    "options": ["To match specific character types.", "To specify how many times a preceding element must occur.", "To define groups within the regex pattern.", "To match the beginning or end of a string."],
    "answerIndex": 1,
    "explanation": "Quantifiers specify how many times the preceding character, group, or character set must occur to constitute a match (e.g., `a*` matches zero or more 'a's)."
  },
  {
    "question": "What is the difference between `*`, `+`, and `?` quantifiers?",
    "options": ["`*` matches zero or one occurrence, `+` matches one or more, `?` matches zero or more.", "`*` matches one or more occurrences, `+` matches zero or one, `?` matches zero or more.", "`*` matches zero or more occurrences, `+` matches one or more, `?` matches zero or one.", "`*` matches exactly one occurrence, `+` matches zero or more, `?` matches one or more."],
    "answerIndex": 2,
    "explanation": "`*` matches the preceding element zero or more times, `+` matches one or more times, and `?` matches zero or one time."
  },
  {
    "question": "What are groups in regular expressions, and how are they created?",
    "options": ["A set of characters defined within square brackets `[]`.", "A way to match whitespace characters.", "A part of a regular expression enclosed in parentheses `()` that can be treated as a single unit.", "Special sequences that match specific character types (like digits or words)."],
    "answerIndex": 2,
    "explanation": "Groups are created by enclosing parts of a regular expression in parentheses `()`. They allow you to apply quantifiers to the entire group, or to capture the matched text within the group."
  },
  {
    "question": "Which `re` module function is used to search for a pattern anywhere in the string and return the first match object?",
    "options": ["match()", "search()", "findall()", "fullmatch()"],
    "answerIndex": 1,
    "explanation": "The `re.search()` function scans through the entire string looking for the first location where the regex pattern produces a match. It returns a match object if a match is found, and `None` otherwise."
  },
  {
    "question": "Which `re` module function is used to try to apply the pattern at the start of the string?",
    "options": ["match()", "search()", "findall()", "fullmatch()"],
    "answerIndex": 0,
    "explanation": "The `re.match()` function checks for a match only at the beginning of the string. If the pattern matches at the start, it returns a match object; otherwise, it returns `None`."
  },
  {
    "question": "What is the purpose of the `setUp()` method in a `unittest.TestCase` class?",
    "options": ["To define the expected outcome of a test.", "To perform cleanup after each test method has run.", "To set up the necessary preconditions and environment before each test method is executed.", "To run all the tests in the class."],
    "answerIndex": 2,
    "explanation": "The `setUp()` method is called before each individual test method in the `TestCase` class is executed. It's used to set up any necessary resources or preconditions for the tests."
  },
  {
    "question": "What is the purpose of the `tearDown()` method in a `unittest.TestCase` class?",
    "options": ["To set up the environment before each test.", "To assert the results of a test.", "To perform cleanup after each test method has run, regardless of whether the test passed or failed.", "To define the test methods themselves."],
    "answerIndex": 2,
    "explanation": "The `tearDown()` method is called after each individual test method in the `TestCase` class has run. It's used to clean up any resources that were set up in the `setUp()` method, ensuring a clean state for subsequent tests."
  },
  {
    "question": "What is test discovery in the context of `unittest`?",
    "options": ["The process of manually writing test cases.", "The automatic finding and loading of test files and test cases by the `unittest` runner.", "A feature that analyzes code to automatically generate tests.", "A way to visualize test coverage."],
    "answerIndex": 1,
    "explanation": "Test discovery is the mechanism by which the `unittest` test runner automatically finds test files (typically matching a pattern like `test*.py`) and the test cases within them (classes inheriting from `unittest.TestCase`)."
  },
  {
    "question": "What is `pytest`?",
    "options": ["Another built-in Python testing framework.", "A popular third-party testing framework that aims to be more concise and powerful than `unittest`.", "A tool for measuring code coverage.", "A library for generating test data."],
    "answerIndex": 1,
    "explanation": "`pytest` is a widely used third-party testing framework for Python. It offers a more streamlined and expressive way to write tests compared to the standard `unittest` module, with features like automatic test discovery, simpler assertions, and powerful fixtures."
  },
  {
    "question": "How do you typically define a test function in `pytest`?",
    "options": ["By creating a class that inherits from `pytest.TestCase`.", "By creating a regular function whose name starts with `test_`.", "By using a special decorator `@pytest.test` before a function.", "By defining methods within a class that starts with `Test` (no inheritance required)."],
    "answerIndex": 1,
    "explanation": "In `pytest`, test functions are typically defined as regular Python functions whose names start with the prefix `test_`. `pytest` automatically discovers and runs these functions."
  },
  {
    "question": "What are fixtures in `pytest`?",
    "options": ["Assertions used to check test results.", "Functions that provide a fixed baseline for tests, such as setting up data or dependencies.", "Decorators used to mark test functions.", "Reports that summarize test execution."],
    "answerIndex": 1,
    "explanation": "Fixtures in `pytest` are functions that provide resources or setup that test functions depend on. They are a powerful way to manage test dependencies and setup/teardown in a reusable and modular manner."
  },
  {
    "question": "What is test coverage?",
    "options": ["The amount of code that is executed when running tests.", "The number of tests written for a project.", "The percentage of bugs found by the tests.", "A measure of how well the tests meet the requirements."],
    "answerIndex": 0,
    "explanation": "Test coverage is a metric that indicates the extent to which the source code of a program has been tested. It's often expressed as a percentage of lines, branches, or paths of code that were executed by the test suite."
  },
  {
    "question": "Which tool is commonly used in Python to measure test coverage?",
    "options": ["unittest", "pytest", "coverage.py", "flake8"],
    "answerIndex": 2,
    "explanation": "`coverage.py` is a popular tool for measuring code coverage in Python. It can report on lines executed, branches taken, and more."
  },
  {
    "question": "What is mocking in testing?",
    "options": ["Creating simplified replacements for dependencies (like external services or database connections) to isolate the code being tested.", "Generating random test data.", "Running tests in parallel to speed up execution.", "Visually representing test results."],
    "answerIndex": 0,
    "explanation": "Mocking involves replacing real dependencies with controlled substitute objects (mocks or stubs) during testing. This allows you to isolate the unit under test and control the behavior of its dependencies, making tests more predictable and focused."
  },
  {
    "question": "Which Python module provides support for creating mock objects?",
    "options": ["unittest.mock", "mocking", "test.mock", "unittest.dummy"],
    "answerIndex": 0,
    "explanation": "The `unittest.mock` module (or just `mock` in older Python versions) provides classes for creating mock objects and making assertions about how they are used during tests."
  },
  {
    "question": "What is concurrency in programming?",
    "options": ["Executing multiple tasks simultaneously on multiple processors.", "Executing multiple tasks in an interleaved manner, giving the illusion of parallelism.", "Executing tasks one after the other in a sequential order.", "Distributing tasks across multiple machines in a network."],
    "answerIndex": 1,
    "explanation": "Concurrency is about managing multiple tasks by switching between them, allowing them to make progress without necessarily executing at the exact same time. It often involves time-slicing on a single processor."
  },
  {
    "question": "What is parallelism in programming?",
    "options": ["Executing multiple tasks in an interleaved manner.", "Managing multiple tasks by switching between them.", "Executing multiple tasks truly simultaneously, typically by utilizing multiple processors or cores.", "Distributing tasks across different threads within the same process."],
    "answerIndex": 2,
    "explanation": "Parallelism involves the actual simultaneous execution of multiple tasks, usually by leveraging multiple CPU cores or processors to achieve faster computation."
  },
  {
    "question": "What is a process in the context of operating systems?",
    "options": ["A lightweight unit of execution within a program.", "A running instance of a program, with its own memory space and resources.", "A collection of threads.", "A way to manage input and output operations."],
    "answerIndex": 1,
    "explanation": "A process is an independent execution environment with its own memory space, resources (like file handles), and process ID."
  },
  {
    "question": "What is a thread in the context of operating systems?",
    "options": ["An independent program running in the background.", "A lightweight unit of execution within a process that shares the process's memory space.", "A way to communicate between different processes.", "A mechanism for handling network requests."],
    "answerIndex": 1,
    "explanation": "A thread is a unit of execution within a process. Multiple threads can run concurrently within the same process and share the process's memory and resources."
  },
  {
    "question": "Which Python module is commonly used for achieving process-based parallelism?",
    "options": ["threading", "asyncio", "concurrent.futures.ThreadPoolExecutor", "multiprocessing"],
    "answerIndex": 3,
    "explanation": "The `multiprocessing` module in Python allows you to create and manage processes, enabling true parallelism by utilizing multiple CPU cores and bypassing the Global Interpreter Lock (GIL) limitations for CPU-bound tasks."
  },
  {
    "question": "Which Python module is commonly used for achieving thread-based concurrency?",
    "options": ["multiprocessing", "asyncio", "concurrent.futures.ProcessPoolExecutor", "threading"],
    "answerIndex": 3,
    "explanation": "The `threading` module in Python allows you to create and manage threads within a single process, enabling concurrency. However, due to the Global Interpreter Lock (GIL), true parallelism for CPU-bound tasks might be limited in CPython."
  },
  {
    "question": "What is the Global Interpreter Lock (GIL) in CPython?",
    "options": ["A mechanism that allows multiple Python interpreters to run in parallel.", "A lock that prevents multiple native threads from executing Python bytecode at the same time within a single process.", "A feature that automatically manages memory in Python.", "A tool for debugging multithreaded Python programs."],
    "answerIndex": 1,
    "explanation": "The GIL is a mutex (lock) in CPython that only allows one thread to hold control of the Python interpreter at any given time. This limits the ability of threads to achieve true parallelism for CPU-bound tasks in a single process."
  },
  {
    "question": "For what type of tasks is the `threading` module typically more suitable in CPython?",
    "options": ["CPU-bound tasks that require heavy computation.", "Tasks that involve waiting for external resources, such as network I/O or file I/O.", "Tasks that need to bypass the GIL for true parallelism.", "Tasks that require creating separate memory spaces."],
    "answerIndex": 1,
    "explanation": "The `threading` module is often more suitable for I/O-bound tasks, where threads spend much of their time waiting for external operations to complete. During this waiting time, the GIL can be released, allowing other threads to make progress."
  },
  {
    "question": "For what type of tasks is the `multiprocessing` module typically more suitable?",
    "options": ["I/O-bound tasks with significant waiting times.", "Tasks that need to share memory directly between concurrent units.", "CPU-bound tasks that can benefit from true parallelism by utilizing multiple cores.", "Tasks that require lightweight concurrency within a single process."],
    "answerIndex": 2,
    "explanation": "The `multiprocessing` module is better suited for CPU-bound tasks because it creates separate processes with their own Python interpreters and memory spaces, thus bypassing the limitations of the GIL and allowing for true parallelism on multi-core systems."
  },
  {
    "question": "What is the `concurrent.futures` module in Python?",
    "options": ["A low-level interface for managing threads and processes.", "A high-level interface for asynchronously executing callables using thread pools or process pools.", "A module for managing asynchronous I/O operations.", "A tool for profiling the performance of concurrent programs."],
    "answerIndex": 1,
    "explanation": "The `concurrent.futures` module provides a high-level interface for asynchronously executing callables using either a thread pool (`ThreadPoolExecutor`) for concurrent I/O-bound tasks or a process pool (`ProcessPoolExecutor`) for parallel CPU-bound tasks."
  },
  {
    "question": "Which method of a database connection object is used to save the changes made within a transaction?",
    "options": ["save()", "apply()", "commit()", "persist()"],
    "answerIndex": 2,
    "explanation": "The `commit()` method of a database connection object is used to permanently save all the changes made within the current transaction to the database."
  },
  {
    "question": "Which method of a database connection object is used to undo the changes made within the current transaction?",
    "options": ["undo()", "revert()", "rollback()", "cancel()"],
    "answerIndex": 2,
    "explanation": "The `rollback()` method of a database connection object is used to undo any changes that have been made within the current transaction since the last `commit()` or the beginning of the transaction."
  },
  {
    "question": "What is SQL injection?",
    "options": ["A type of database performance optimization.", "A technique for encrypting database passwords.", "A security vulnerability where malicious SQL code is inserted into an application's database queries.", "A method for backing up and restoring databases."],
    "answerIndex": 2,
    "explanation": "SQL injection is a serious security vulnerability that occurs when an attacker can insert malicious SQL code into an application's database queries, potentially allowing them to access, modify, or delete data."
  },
  {
    "question": "How does using parameterized queries (with placeholders) help prevent SQL injection?",
    "options": ["It automatically encrypts the SQL query.", "It validates the data types of the parameters.", "It treats the parameter values as data rather than executable SQL code.", "It hides the SQL query from the user."],
    "answerIndex": 2,
    "explanation": "Parameterized queries separate the SQL structure from the data values. The database driver handles the proper escaping and quoting of the parameters, ensuring they are treated as data and not as part of the SQL command."
  },
  {
    "question": "What is the purpose of the `finally` block when working with database connections and cursors?",
    "options": ["To handle database-specific exceptions.", "To execute code only if the database operations are successful.", "To ensure that the connection and cursor are properly closed, even if errors occur.", "To commit the transaction automatically."],
    "answerIndex": 2,
    "explanation": "The `finally` block is often used to ensure that resources like database connections and cursors are properly closed, regardless of whether an exception occurred in the `try` block. This helps prevent resource leaks."
  },
  {
    "question": "What is an ORM (Object-Relational Mapper)?",
    "options": ["A database management system.", "A tool for writing SQL queries in a more Pythonic way by mapping database tables to Python objects.", "A library for visualizing database relationships.", "A standard for database security."],
    "answerIndex": 1,
    "explanation": "An ORM is a library that maps database tables to Python classes and rows to Python objects, allowing you to interact with the database using object-oriented paradigms instead of writing raw SQL."
  },
  {
    "question": "Which of the following is a popular ORM for Python?",
    "options": ["sqlite3", "psycopg2", "SQLAlchemy", "mysql.connector"],
    "answerIndex": 2,
    "explanation": "SQLAlchemy is a widely used and powerful ORM for Python that supports various database systems."
  },
  {
    "question": "What are some benefits of using an ORM?",
    "options": ["Increased performance due to optimized SQL queries.", "Simplified database interaction using Python objects.", "Automatic handling of database migrations.", "All of the above."],
    "answerIndex": 1,
    "explanation": "ORMs typically simplify database interaction by allowing developers to work with Python objects, reducing the amount of raw SQL they need to write. While ORMs can offer some convenience related to migrations, performance might sometimes be a trade-off, and they don't automatically handle all migrations."
  },
  {
    "question": "What is a database connection pool?",
    "options": ["A way to store multiple database credentials.", "A cache of active database connections that can be reused, reducing the overhead of establishing new connections for each operation.", "A tool for monitoring database performance.", "A backup of recent database transactions."],
    "answerIndex": 1,
    "explanation": "A database connection pool is a mechanism to manage and reuse database connections. Instead of creating a new connection for each database operation, the application can obtain a connection from the pool and return it when done, improving performance and resource utilization."
  },
  {
    "question": "What is a common practice to ensure that a database connection is properly closed?",
    "options": ["Relying on Python's garbage collection.", "Closing the connection explicitly using the `close()` method in a `finally` block or using a context manager.", "Waiting for the program to exit.", "Connections are automatically closed after a certain period of inactivity."],
    "answerIndex": 1,
    "explanation": "The best practice is to explicitly close the database connection using the `close()` method, typically within a `finally` block to ensure it happens even if errors occur, or by using a `with` statement as a context manager, which automatically handles closing the connection."
  },
  {
    "question": "Which Python module provides classes for working with dates and times?",
    "options": ["time", "calendar", "datetime", "dateutil"],
    "answerIndex": 2,
    "explanation": "The `datetime` module is the primary module in Python for working with dates and times. It provides classes like `date`, `time`, `datetime`, `timedelta`, and `timezone`."
  },
  {
    "question": "How do you get the current date and time in Python?",
    "options": ["datetime.now()", "datetime.today()", "datetime.current()", "datetime.get()"],
    "answerIndex": 0,
    "explanation": "The `datetime.datetime.now()` method returns a `datetime` object representing the current local date and time."
  },
  {
    "question": "How do you get the current date only in Python?",
    "options": ["datetime.now().date()", "datetime.today()", "datetime.date.today()", "datetime.get_date()"],
    "answerIndex": 2,
    "explanation": "The `datetime.date.today()` method returns a `date` object representing the current local date."
  },
  {
    "question": "What is a `date` object in the `datetime` module?",
    "options": ["An object representing a specific time of day.", "An object representing a duration or difference between two dates or times.", "An object representing a calendar date (year, month, day).", "An object representing time zone information."],
    "answerIndex": 2,
    "explanation": "A `date` object represents a calendar date, consisting of a year, month, and day."
  },
  {
    "question": "What is a `time` object in the `datetime` module?",
    "options": ["An object representing a calendar date.", "An object representing a duration.", "An object representing a time of day (hour, minute, second, microsecond).", "An object containing both date and time information."],
    "answerIndex": 2,
    "explanation": "A `time` object represents a time of day, consisting of hour, minute, second, and microsecond (optional)."
  },
  {
    "question": "What is a `datetime` object in the `datetime` module?",
    "options": ["An object representing only the date.", "An object representing only the time.", "An object containing both date and time information.", "An object representing a time zone."],
    "answerIndex": 2,
    "explanation": "A `datetime` object is a single object containing both date and time information."
  },
  {
    "question": "How do you create a `date` object for a specific date (e.g., January 1, 2023)?",
    "options": ["date(2023, 1, 1)", "datetime.date(2023, 1, 1)", "create_date(2023, 1, 1)", "datetime.create_date(2023, 1, 1)"],
    "answerIndex": 1,
    "explanation": "You create a `date` object using the `datetime.date(year, month, day)` constructor."
  },
  {
    "question": "How do you create a `time` object for a specific time (e.g., 10:30 AM)?",
    "options": ["time(10, 30)", "datetime.time(10, 30)", "create_time(10, 30)", "datetime.create_time(10, 30)"],
    "answerIndex": 1,
    "explanation": "You create a `time` object using the `datetime.time(hour, minute, second=0, microsecond=0)` constructor."
  },
  {
    "question": "What is a `timedelta` object in the `datetime` module?",
    "options": ["An object representing a specific point in time.", "An object representing time zone information.", "An object representing a duration or difference between two dates or times.", "An object containing both date and time."],
    "answerIndex": 2,
    "explanation": "A `timedelta` object represents a duration, the difference between two dates or times, expressed in days, seconds, and microseconds."
  },
  {
    "question": "How do you calculate the difference between two `date` or `datetime` objects?",
    "options": ["Using the `-` operator, which returns a `timedelta` object.", "Using the `diff()` method.", "Using the `subtract()` method.", "It's not directly possible."],
    "answerIndex": 0,
    "explanation": "You can subtract one `date` or `datetime` object from another using the `-` operator, which results in a `timedelta` object representing the difference."
  },
  {
    "question": "How can you add or subtract a `timedelta` from a `date` or `datetime` object?",
    "options": ["Using the `add()` and `subtract()` methods.", "Using the `+` and `-` operators.", "Using the `timedelta.add()` and `timedelta.subtract()` methods.", "It's not directly possible."],
    "answerIndex": 1,
    "explanation": "You can perform addition and subtraction between `date`/`datetime` objects and `timedelta` objects using the `+` and `-` operators respectively."
  }
];

        // --- End of Pre-defined Questions ---

        let availableQuestionLists = {
            'Quiz 1': pythonList1,
            'Quiz 2': pythonList2
        };

        let currentQuestions = [];
        let currentQuestionIndex = 0;
        let score = 0;
        let correctCount = 0;
        let incorrectCount = 0;
        let timedOutCount = 0;
        let missedQuestions = [];

        let timer;
        const TIME_PER_QUESTION = 15; // Time limit in seconds
        let timeLeft = TIME_PER_QUESTION;
        let highScores = loadHighScores(); // Load high scores from local storage
        let currentQuizListName = 'Quiz 1'; // Default to the first sample list

        // --- Variables for List Creation/Editing (Simplified for Import Only) ---
        let newQuestionList = [];
        // editingQuestionIndex is no longer needed for individual question editing
        // let editingQuestionIndex = -1; // -1 means not editing

        // --- Initialize ---
        updateHighScoreDisplay();
        loadQuestionLists(); // Load user lists on page load
        populateQuestionListSelect();
        loadAndDisplayNewListPreview(); // Load any unsaved list in preview on start

        // --- Event Listeners ---
        startQuizBtn.addEventListener('click', () => {
            startArea.classList.add('hidden');
            listManagementArea.classList.add('hidden'); // Hide list management during game
            endSummaryEl.classList.add('hidden'); // Hide summary if visible from a previous game
            gameArea.classList.remove('hidden');
            startNewQuiz();
        });

        nextQuestionBtn.addEventListener('click', () => {
             if (!nextQuestionBtn.classList.contains('hidden')) { // Prevent double clicking
                currentQuestionIndex++;
                if (currentQuestionIndex < currentQuestions.length) {
                    displayNextQuestion();
                } else {
                    endQuiz();
                }
            }
        });

        // Listener for the new End Test button
        endTestBtn.addEventListener('click', () => {
            // Confirm with the user before ending the test early
            if (confirm("Are you sure you want to end the test early? Your current progress will be summarized.")) {
                endQuiz(); // Immediately end the quiz
            }
        });


         // Listen for Enter key press for next question
         document.addEventListener('keypress', (event) => {
             // Only trigger if game area is visible and next button is not hidden
             if (!gameArea.classList.contains('hidden') && !nextQuestionBtn.classList.contains('hidden')) {
                if (event.key === 'Enter') {
                     nextQuestionBtn.click(); // Trigger click on the next button
                     event.preventDefault(); // Prevent default Enter key behavior (like form submission)
                }
            }
         });


        restartGameBtn.addEventListener('click', () => {
            gameArea.classList.add('hidden');
            startArea.classList.remove('hidden');
            listManagementArea.classList.remove('hidden'); // Show list management again
            resetQuiz(); // Reset score and index but don't start a new quiz immediately
        });

         // New listener for Play Again (Same List) button
         playAgainSameListBtn.addEventListener('click', () => {
            endSummaryEl.classList.add('hidden'); // Hide summary
             restartQuizSameList(); // Restart quiz with the same list
         });


        loadListBtn.addEventListener('click', () => {
            currentQuizListName = questionListSelect.value;
            updateHighScoreDisplay(); // Update high score for the newly selected list
            alert(`"${currentQuizListName}" list loaded for the next quiz.`);
        });

         deleteListBtn.addEventListener('click', () => {
            const listToDelete = questionListSelect.value;
            // Check against the new sample list names
            if (listToDelete === 'Quiz 1' || listToDelete === 'Quiz 2') {
                alert("You cannot delete the default sample lists.");
                return;
            }
             if (confirm(`Are you sure you want to delete the list "${listToDelete}"? This cannot be undone.`)) {
                delete availableQuestionLists[listToDelete];
                saveQuestionLists();
                populateQuestionListSelect();
                 if (currentQuizListName === listToDelete) {
                     currentQuizListName = 'Quiz 1'; // Reset current selection if deleted
                     questionListSelect.value = 'Quiz 1'; // Default to first sample
                     updateHighScoreDisplay(); // Update high score
                 }
                // Also remove high score for this list
                if (highScores[listToDelete]) {
                    delete highScores[listToDelete];
                    saveHighScores();
                    updateHighScoreDisplay(); // Update display based on new current list
                }
                alert(`List "${listToDelete}" deleted.`);
             }
         });

        // Removed event listeners for individual question creation buttons
        // addQuestionBtn.addEventListener('click', addQuestionToNewList);
        // updateQuestionBtn.addEventListener('click', updateQuestionInNewList);

        saveNewListBtn.addEventListener('click', saveNewQuestionList);
        clearNewListBtn.addEventListener('click', clearNewListPreview);
        newListNameInput.addEventListener('input', updatePreviewListName); // Keep this for imported list name

         // Export/Import Listeners
         exportListBtn.addEventListener('click', exportSelectedList);
         importListBtn.addEventListener('click', importListFromJson);
         importFromFileBtn.addEventListener('click', () => importFileInput.click()); // Trigger file input
         importFileInput.addEventListener('change', importListFromFile);


        // --- Quiz Logic Functions ---
        function startNewQuiz() {
            score = 0;
            correctCount = 0; // Reset counts
            incorrectCount = 0;
            timedOutCount = 0;
            missedQuestions = []; // Clear missed questions list
            currentQuestionIndex = 0;
            // Shuffle questions at the start of a new quiz
            currentQuestions = shuffleArray([...availableQuestionLists[currentQuizListName]]); // Use selected list
            totalQuestionsEl.textContent = currentQuestions.length;
            updateScoreDisplay();
            feedbackEl.textContent = '';
            feedbackEl.className = '';
            nextQuestionBtn.classList.add('hidden');
            restartGameBtn.classList.remove('hidden'); // Show restart button
            playAgainSameListBtn.classList.add('hidden'); // Hide play again same button initially
            timerArea.classList.remove('hidden'); // Show timer
            endSummaryEl.classList.add('hidden'); // Hide summary at start of new quiz
            endTestBtn.classList.remove('hidden'); // Show End Test button
            displayNextQuestion();
        }

        // New function to restart quiz with the same list
         function restartQuizSameList() {
            score = 0;
            correctCount = 0; // Reset counts
            incorrectCount = 0;
            timedOutCount = 0;
             missedQuestions = []; // Clear missed questions list
            currentQuestionIndex = 0;
             // Re-shuffle the current list for a fresh game
             currentQuestions = shuffleArray([...availableQuestionLists[currentQuizListName]]);
            totalQuestionsEl.textContent = currentQuestions.length;
            updateScoreDisplay();
            feedbackEl.textContent = '';
            feedbackEl.className = '';
            nextQuestionBtn.classList.add('hidden');
            restartGameBtn.classList.remove('hidden');
             playAgainSameListBtn.classList.add('hidden');
            timerArea.classList.remove('hidden');
             endSummaryEl.classList.add('hidden'); // Hide summary
            endTestBtn.classList.remove('hidden'); // Show End Test button
            displayNextQuestion(); // Start displaying questions immediately
         }


        function displayNextQuestion() {
            if (currentQuestionIndex >= currentQuestions.length) {
                endQuiz();
                return;
            }

            resetTimer(); // Reset timer for the new question
            startTimer(); // Start timer

            const questionData = currentQuestions[currentQuestionIndex];
            // Use innerHTML to allow for basic formatting in questions if needed
            questionTextEl.innerHTML = questionData.question;
            optionsContainer.innerHTML = ''; // Clear previous options

            // Shuffle options for additional randomization
            const shuffledOptions = shuffleArray(questionData.options.map((opt, idx) => ({ text: opt, originalIndex: idx })));

            shuffledOptions.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option.text;
                // Store the original index so we know if it's the correct answer
                button.dataset.originalIndex = option.originalIndex;
                button.addEventListener('click', handleAnswer);
                optionsContainer.appendChild(button);
            });

            questionNumberEl.textContent = currentQuestionIndex + 1;
            feedbackEl.textContent = '';
            feedbackEl.className = '';
            nextQuestionBtn.classList.add('hidden');
            //nextQuestionBtn.textContent = "Next Question"; // Reset button text
        }

        function handleAnswer(event) {
            stopTimer(); // Stop the timer once an answer is selected

            // Get the original index of the selected option
            const selectedOriginalIndex = parseInt(event.target.dataset.originalIndex);
            const questionData = currentQuestions[currentQuestionIndex];
            const correctOriginalIndex = questionData.answerIndex; // This is the original index

            // Disable all option buttons
            const optionButtons = optionsContainer.querySelectorAll('button');
            optionButtons.forEach(btn => btn.disabled = true);

            if (selectedOriginalIndex === correctOriginalIndex) {
                event.target.classList.add('correct');
                feedbackEl.textContent = "Correct! " + (questionData.explanation || "");
                feedbackEl.className = 'feedback-correct';
                score++;
                correctCount++; // Increment correct count
            } else {
                event.target.classList.add('incorrect');
                // Highlight the correct answer using its original index
                optionButtons.forEach(btn => {
                    if (parseInt(btn.dataset.originalIndex) === correctOriginalIndex) {
                        btn.classList.add('revealed-correct');
                    }
                });
                feedbackEl.innerHTML = `Incorrect. The correct answer was "<strong>${questionData.options[correctOriginalIndex]}</strong>".<br>${questionData.explanation || ""}`;
                feedbackEl.className = 'feedback-incorrect';
                 incorrectCount++; // Increment incorrect count
                 missedQuestions.push({ // Record missed question details
                     question: questionData.question,
                     // Store original options and indices for accurate summary display
                     options: questionData.options,
                     yourAnswer: questionData.options[selectedOriginalIndex],
                     correctAnswer: questionData.options[correctOriginalIndex],
                     explanation: questionData.explanation || 'No explanation provided.' // Default explanation
                 });
            }
            updateScoreDisplay();
            nextQuestionBtn.classList.remove('hidden');
            if (currentQuestionIndex >= currentQuestions.length - 1) {
                nextQuestionBtn.textContent = "Show Final Score";
            } else {
                nextQuestionBtn.textContent = "Next Question";
            }
        }

        function endQuiz() {
            stopTimer(); // Ensure timer stops at the end
            timerArea.classList.add('hidden'); // Hide timer area
            endTestBtn.classList.add('hidden'); // Hide End Test button

            questionTextEl.textContent = "Quiz Finished!";
            optionsContainer.innerHTML = '';
            feedbackEl.textContent = ''; // Clear regular feedback

            // Display the end summary
            endSummaryEl.classList.remove('hidden');
            summaryTotalEl.textContent = currentQuestions.length;
            summaryCorrectEl.textContent = correctCount;
            summaryIncorrectEl.textContent = incorrectCount;
            summaryTimedOutEl.textContent = timedOutCount;

            // Display missed questions
            summaryMissedQuestionsEl.innerHTML = ''; // Clear previous list
            if (missedQuestions.length > 0) {
                 document.getElementById('summary-missed-questions').classList.remove('hidden'); // Show the heading if there are missed questions
                 missedQuestions.forEach((item, index) => {
                     const li = document.createElement('li');
                      // Try to find the original question index in the *current* quiz questions array
                      // This is safer than relying on the order in missedQuestions array
                      const originalQuizIndex = currentQuestions.findIndex(q =>
                          q.question === item.question &&
                          JSON.stringify(q.options) === JSON.stringify(item.options) &&
                          q.answerIndex === item.options.indexOf(item.correctAnswer) // Verify correct answer matches original data
                      );
                     const qNumber = originalQuizIndex !== -1 ? originalQuizIndex + 1 : 'N/A';

                     li.innerHTML = `<strong>Q${qNumber}:</strong> ${item.question}<br>
                                      You answered: <span class="incorrect-answer">${item.yourAnswer}</span><br>
                                      Correct answer: <span class="correct-answer">${item.correctAnswer}</span>`;
                     if (item.explanation && item.explanation !== 'No explanation provided.') { // Only show if a real explanation exists
                         li.innerHTML += `<br>Explanation: ${item.explanation}`;
                     }
                     summaryMissedQuestionsEl.appendChild(li);
                 });
            } else {
                 document.getElementById('summary-missed-questions').classList.add('hidden'); // Hide if no missed questions
            }


            nextQuestionBtn.classList.add('hidden');
            restartGameBtn.classList.remove('hidden');
            playAgainSameListBtn.classList.remove('hidden'); // Show "Play Again (Same List)" button
            //restartGameBtn.textContent = "Play Again"; // This button goes back to start screen

            updateHighScore(score); // Check and update high score
        }

         function resetQuiz() {
             score = 0;
             correctCount = 0;
             incorrectCount = 0;
             timedOutCount = 0;
             missedQuestions = [];
             currentQuestionIndex = 0;
             updateScoreDisplay();
             feedbackEl.textContent = '';
             feedbackEl.className = '';
             questionTextEl.textContent = ''; // Clear question text
             optionsContainer.innerHTML = ''; // Clear options
             endSummaryEl.classList.add('hidden'); // Hide summary
             nextQuestionBtn.classList.add('hidden');
             endTestBtn.classList.add('hidden'); // Hide End Test button
             restartGameBtn.classList.add('hidden'); // Hide restart until game ends or starts again
              playAgainSameListBtn.classList.add('hidden'); // Hide the new button too
              timerArea.classList.add('hidden'); // Hide timer
             stopTimer(); // Stop timer just in case
             resetTimer(); // Reset timer display
         }


        function updateScoreDisplay() {
            scoreEl.textContent = score;
        }

        // Generic shuffle function
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // --- Timer Functions ---
        function startTimer() {
             // Clear any existing timer first
            stopTimer();
             // Set initial color
            timerArea.style.color = '#424242';

            timer = setInterval(() => {
                timeLeft--;
                timeEl.textContent = timeLeft;
                if (timeLeft <= 5) { // Highlight timer when low
                    timerArea.style.color = '#d32f2f'; // Red
                } else {
                     timerArea.style.color = '#424242'; // Default dark grey
                }
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    handleTimerEnd();
                }
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timer);
        }

        function resetTimer() {
            stopTimer();
            timeLeft = TIME_PER_QUESTION;
            timeEl.textContent = timeLeft;
             timerArea.style.color = '#424242'; // Reset color
        }

        function handleTimerEnd() {
            stopTimer(); // Ensure timer is stopped
            timedOutCount++; // Increment timed out count

            // Automatically mark the question as incorrect and move on
            const questionData = currentQuestions[currentQuestionIndex];
            const correctOriginalIndex = questionData.answerIndex; // Correct index in original options
            const optionButtons = optionsContainer.querySelectorAll('button');

            // Disable all option buttons
            optionButtons.forEach(btn => btn.disabled = true);

            // Highlight the correct answer using its original index
             optionButtons.forEach(btn => {
                if (parseInt(btn.dataset.originalIndex) === correctOriginalIndex) {
                    btn.classList.add('revealed-correct');
                }
            });

            feedbackEl.innerHTML = `Time's up! The correct answer was "<strong>${questionData.options[correctOriginalIndex]}</strong>".<br>${questionData.explanation || ""}`;
            feedbackEl.className = 'feedback-incorrect';

            updateScoreDisplay(); // Score doesn't increase on timeout

             // Record missed question details (timed out counts as missed)
             missedQuestions.push({
                 question: questionData.question,
                 options: questionData.options, // Store original options
                 yourAnswer: 'Timed Out', // Indicate it was a timeout
                 correctAnswer: questionData.options[correctOriginalIndex],
                 explanation: questionData.explanation || 'No explanation provided.'
             });

            nextQuestionBtn.classList.remove('hidden');
            if (currentQuestionIndex >= currentQuestions.length - 1) {
                nextQuestionBtn.textContent = "Show Final Score";
            } else {
                 nextQuestionBtn.textContent = "Next Question";
            }
        }

        // --- High Score Functions ---
        function loadHighScores() {
            const highScoresJson = localStorage.getItem('quizHighScores'); // Changed storage key
            return highScoresJson ? JSON.parse(highScoresJson) : {};
        }

        function saveHighScores() {
            localStorage.setItem('quizHighScores', JSON.stringify(highScores)); // Changed storage key
        }

        function updateHighScore(finalScore) {
             // Only update if the list has questions
             if (!currentQuestions || currentQuestions.length === 0) return;

            if (!highScores[currentQuizListName] || finalScore > highScores[currentQuizListName]) {
                highScores[currentQuizListName] = finalScore;
                saveHighScores();
                updateHighScoreDisplay();
                // Use a more subtle notification than alert
                const highScoreNotification = document.createElement('div');
                highScoreNotification.textContent = `New High Score for "${currentQuizListName}": ${finalScore}!`;
                highScoreNotification.style.cssText = `
                    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
                    background-color: #4caf50; color: white; padding: 10px 20px;
                    border-radius: 8px; z-index: 100; font-size: 1.1rem;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.2); opacity: 1; transition: opacity 1s ease-in-out;
                `;
                document.body.appendChild(highScoreNotification);
                setTimeout(() => {
                    highScoreNotification.style.opacity = 0;
                    highScoreNotification.addEventListener('transitionend', () => highScoreNotification.remove());
                }, 3000); // Show for 3 seconds
            }
        }

         function updateHighScoreDisplay() {
              const currentListHighScore = highScores[currentQuizListName];
              // Also check if the current list exists and has questions before displaying a score of 0 potentially misleadingly
              if (!availableQuestionLists[currentQuizListName] || !Array.isArray(availableQuestionLists[currentQuizListName]) || availableQuestionLists[currentQuizListName].length === 0) {
                  highScoreEl.textContent = 'N/A (Empty List)';
              } else if (currentListHighScore === undefined) {
                  highScoreEl.textContent = '0'; // Show 0 if list exists but no score yet
              } else {
                   highScoreEl.textContent = currentListHighScore;
              }
         }

         // --- List Management Functions ---
         function loadQuestionLists() {
            const storedLists = localStorage.getItem('userQuizQuestionLists'); // Changed storage key
            if (storedLists) {
                try { // Use try-catch for parsing
                    const userLists = JSON.parse(storedLists);
                     // Basic validation to ensure it's an object and contains arrays
                     if (typeof userLists === 'object' && userLists !== null) {
                         const loadedLists = {};
                         for (const listName in userLists) {
                             const list = userLists[listName];
                             if (Array.isArray(list)) {
                                 // Validate array items - check if each item looks like a question
                                 const questionsValid = list.every(q =>
                                     typeof q === 'object' && q !== null &&
                                     typeof q.question === 'string' && q.question.length > 0 &&
                                     Array.isArray(q.options) && q.options.length >= 2 &&
                                     q.options.every(opt => typeof opt === 'string' && opt.length > 0) &&
                                     typeof q.answerIndex === 'number' && q.answerIndex >= 0 && q.answerIndex < q.options.length
                                     // explanation is optional, no need to check
                                 );
                                 if (questionsValid) {
                                     loadedLists[listName] = list; // Add valid list
                                 } else {
                                     console.warn(`List "${listName}" contains invalid question data and was not loaded.`);
                                 }
                             } else {
                                 console.warn(`Item "${listName}" in stored lists is not an array and was skipped.`);
                             }
                         }
                         // Merge valid loaded lists with default lists
                        availableQuestionLists = { ...availableQuestionLists, ...loadedLists };

                     } else {
                        console.error("Stored user lists are not in expected format (not an object). Loading defaults only.");
                        // Optionally clear invalid data
                        // localStorage.removeItem('userQuizQuestionLists');
                     }
                } catch (e) {
                    console.error("Failed to parse user question lists from local storage:", e);
                    // Optionally clear corrupted data
                    // localStorage.removeItem('userQuizQuestionLists');
                }
            }
             // Ensure default lists are always present even if storage is empty/corrupted
             if (!availableQuestionLists['Quiz 1']) availableQuestionLists['Quiz 1'] = pythonList1;
             if (!availableQuestionLists['Quiz 2']) availableQuestionLists['Quiz 2'] = pythonList2;

         }

         function saveQuestionLists() {
            // Only save user-created lists, not the defaults
            const userListsToSave = {};
            for (const listName in availableQuestionLists) {
                if (listName !== 'Quiz 1' && listName !== 'Quiz 2') {
                    userListsToSave[listName] = availableQuestionLists[listName];
                }
            }
            localStorage.setItem('userQuizQuestionLists', JSON.stringify(userListsToSave)); // Changed storage key
         }

         function populateQuestionListSelect() {
            questionListSelect.innerHTML = ''; // Clear existing options
            // loadQuestionLists(); // Already called in initialization

            // Sort list names alphabetically, keeping sample lists at the top
            const listNames = Object.keys(availableQuestionLists).sort((a, b) => {
                if (a.startsWith('Sample Quiz') && !b.startsWith('Sample Quiz')) return -1;
                if (!a.startsWith('Sample Quiz') && b.startsWith('Sample Quiz')) return 1;
                return a.localeCompare(b); // Alphabetical sort for others
            });


            listNames.forEach(listName => {
                 const list = availableQuestionLists[listName];
                 // Only add lists that are arrays and have at least one question
                 if (Array.isArray(list) && list.length > 0) {
                    const option = document.createElement('option');
                    option.value = listName;
                    option.textContent = `${listName} (${list.length} questions)`;
                    questionListSelect.appendChild(option);
                 }
            });

             // Ensure at least the default sample lists are available if others were invalid/empty
             if (questionListSelect.options.length === 0) {
                  if (Array.isArray(sampleQuizList1) && sampleQuizList1.length > 0) {
                       const option1 = document.createElement('option');
                        option1.value = 'Quiz 1';
                        option1.textContent = `Quiz 1 (${sampleQuizList1.length} questions)`;
                        questionListSelect.appendChild(option1);
                  }
                  if (Array.isArray(sampleQuizList2) && sampleQuizList2.length > 0) {
                       const option2 = document.createElement('option');
                        option2.value = 'Quiz 2';
                        option2.textContent = `Quiz 2 (${sampleQuizList2.length} questions)`;
                        questionListSelect.appendChild(option2);
                  }
             }


             // Set the select value back to the current quiz list if it still exists and is valid
             if (availableQuestionLists[currentQuizListName] && Array.isArray(availableQuestionLists[currentQuizListName]) && availableQuestionLists[currentQuizListName].length > 0) {
                 questionListSelect.value = currentQuizListName;
             } else if (questionListSelect.options.length > 0) {
                  // If current list is no longer valid, select the first available list
                  currentQuizListName = questionListSelect.value; // Set to the first option's value
             } else {
                 // Fallback if no lists are available (shouldn't happen if default exists)
                 currentQuizListName = 'Quiz 1'; // Default to first sample
             }
             updateHighScoreDisplay(); // Update high score display based on the selected list
         }


        // Removed addQuestionToNewList and updateQuestionInNewList functions

        // Removed startEditingQuestion and stopEditing functions

        // Removed deleteQuestionFromNewList function (individual deletion is gone)
        // The preview will now only show questions added via import before saving.

         function displayNewListPreview() {
            previewQuestionsListEl.innerHTML = ''; // Clear existing preview
            previewListNameEl.textContent = newListNameInput.value.trim() || 'Unnamed';

            if (newQuestionList.length === 0) {
                previewQuestionsListEl.innerHTML = '<li>Import a list to see questions here before saving.</li>'; // Updated placeholder
                return;
            }

            newQuestionList.forEach((q, index) => {
                const listItem = document.createElement('li');
                 // Use innerHTML for question text in case it contains HTML entities or structure
                listItem.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question}<br>
                                      <strong>Options:</strong> ${q.options.join(', ')}<br>
                                      <strong>Correct Index:</strong> ${q.answerIndex}`;
                 if (q.explanation) {
                     listItem.innerHTML += `<br><strong>Explanation:</strong> ${q.explanation}`;
                 }

                 // Removed Edit and Delete buttons for individual items
                 // The preview is now just a display before saving the imported list.

                previewQuestionsListEl.appendChild(listItem);
            });
         }

         function clearNewQuestionInputs() {
            newListNameInput.value = ''; // Clear list name input
            // Removed individual question input clearing
            // newQuestionInput.value = '';
            // newOptionsInput.value = '';
            // newAnswerIndexInput.value = '0';
            // newExplanationInput.value = '';
            // stopEditing(); // Ensure editing state is reset (no longer relevant)
         }

         function saveNewQuestionList() {
            const listName = newListNameInput.value.trim();
             if (!listName) {
                 alert("Please enter a name for your new list.");
                 return;
             }
              // Validate list name uniqueness (case-insensitive check might be good)
             // Check if name exists AND it's not the list we are currently building (which is newQuestionList)
             // If a list with this name exists and it's *not* the current newQuestionList object, prompt to overwrite.
             if (availableQuestionLists[listName] && availableQuestionLists[listName] !== newQuestionList) {
                 if (!confirm(`A list named "${listName}" already exists. Do you want to overwrite it?`)) {
                     return;
                 }
             } else if (listName === 'Quiz 1' || listName === 'Quiz 2') { // Check against new sample names
                  alert(`"${listName}" is a reserved name. Please choose a different name.`);
                 return;
             }


            if (newQuestionList.length === 0) {
                alert("Import questions before saving the list."); // Updated message
                return;
            }

            availableQuestionLists[listName] = newQuestionList; // Assign the new list to the available lists
            saveQuestionLists(); // Save *all* user lists to local storage
            populateQuestionListSelect(); // Refresh the dropdown
            alert(`List "${listName}" saved successfully!`);
            clearNewListPreview(); // Clear the preview after saving (resets newQuestionList)
             localStorage.removeItem('unsavedNewListPreview'); // Clear unsaved list data
         }

         function clearNewListPreview() {
             // Check if there's anything in the preview to clear
             if (newQuestionList.length > 0 || newListNameInput.value.trim()) {
                 if (!confirm("Are you sure you want to clear the current new list preview? Any unsaved imported questions will be lost.")) { // Updated message
                     return;
                 }
             }
             newListNameInput.value = '';
             newQuestionList = []; // Clear the list data
             displayNewListPreview(); // Update the display to show empty
             // clearNewQuestionInputs(); // This just clears name now
              localStorage.removeItem('unsavedNewListPreview'); // Clear unsaved list data
         }

         function updatePreviewListName() {
            previewListNameEl.textContent = newListNameInput.value.trim() || 'Unnamed';
             saveNewListPreview(); // Save name change
         }

         // Save/Load New List Preview to Local Storage (in case of accidental page close)
         // This saves the state of the list being built (via import), including the name.
         function saveNewListPreview() {
             const previewState = {
                 name: newListNameInput.value.trim(),
                 list: newQuestionList,
                 // editingIndex is no longer relevant for individual question editing
                 // editingIndex: editingQuestionIndex
             };
              // Only save if there's actually something in the list or a name entered
             if (previewState.list.length > 0 || previewState.name) {
                 localStorage.setItem('unsavedNewListPreview', JSON.stringify(previewState)); // Changed storage key
             } else {
                 localStorage.removeItem('unsavedNewListPreview'); // Changed storage key
             }
         }

         function loadAndDisplayNewListPreview() {
             const savedStateJson = localStorage.getItem('unsavedNewListPreview'); // Changed storage key
             if (savedStateJson) {
                 try {
                     const savedState = JSON.parse(savedStateJson);
                     // Validate the loaded state structure
                     if (savedState && Array.isArray(savedState.list)) {
                         newQuestionList = savedState.list;
                         if (savedState.name) {
                             newListNameInput.value = savedState.name;
                             previewListNameEl.textContent = savedState.name; // Update display immediately
                         }
                         // editingIndex is no longer relevant for individual question editing
                         // if (savedState.editingIndex !== -1 && savedState.editingIndex < newQuestionList.length) {
                         //      displayNewListPreview(); // Display first so elements exist
                         //      setTimeout(() => {
                         //          // startEditingQuestion(savedState.editingIndex); // This will also populate inputs and manage buttons
                         //          // This functionality is removed, so we just display the list.
                         //      }, 50); // Short delay
                         // } else {
                             displayNewListPreview(); // Just display the loaded list
                             // Ensure editing state is correctly reset if it wasn't saved properly (not relevant now)
                             // stopEditing();
                         // }
                         alert("Unsaved list preview loaded. Remember to save your list!");
                     } else {
                          console.error("Unsaved list preview data is not in expected format.");
                           localStorage.removeItem('unsavedNewListPreview'); // Clear invalid data (changed key)
                           // stopEditing(); // Ensure state is reset (not relevant now)
                     }
                 } catch (e) {
                    console.error("Failed to parse unsaved list preview from local storage:", e);
                     localStorage.removeItem('unsavedNewListPreview'); // Clear corrupted data (changed key)
                     // stopEditing(); // Ensure state is reset (not relevant now)
                 }
             } else {
                  // If no unsaved list, ensure inputs are clear and preview is empty
                  clearNewQuestionInputs(); // This clears name input
                  displayNewListPreview(); // Show empty preview
             }
         }

        // --- Export / Import Functions ---
        function exportSelectedList() {
            const listToExportName = questionListSelect.value;
            const listToExport = availableQuestionLists[listToExportName];

            if (!listToExport || !Array.isArray(listToExport) || listToExport.length === 0) {
                alert(`Please select a list with questions to export.`);
                importExportJsonTextarea.value = "";
                return;
            }

             // Check against the new sample list names
             if (listToExportName === 'Quiz 1' || listToExportName === 'Quiz 2') {
                 alert(`Exporting built-in list: "${listToExportName}".`);
             } else {
                  alert(`Exporting user list: "${listToExportName}".`);
             }

            try {
                // Include the list name in the export JSON structure
                const exportData = {
                    name: listToExportName,
                    questions: listToExport
                };
                const listJson = JSON.stringify(exportData, null, 2); // Use null, 2 for pretty printing
                importExportJsonTextarea.value = listJson;
                importExportJsonTextarea.select(); // Select the text for easy copying

                alert(`JSON for list "${listToExportName}" is now in the text area below. Copy the text to save your list. You can also use "Import from File" on another device/browser with this JSON.`);

            } catch (e) {
                console.error("Error exporting list:", e);
                alert("Failed to export list. Check console for details.");
                importExportJsonTextarea.value = "Error exporting list.";
            }
        }

         function importListFromJson() {
            const jsonString = importExportJsonTextarea.value.trim();
            if (!jsonString) {
                alert("Please paste JSON data into the text area.");
                return;
            }

             try {
                const importedData = JSON.parse(jsonString);

                // Validation: Check if it's an object with 'name' (string) and 'questions' (array)
                if (typeof importedData !== 'object' || importedData === null ||
                    typeof importedData.name !== 'string' || importedData.name.trim() === '' ||
                    !Array.isArray(importedData.questions) || importedData.questions.length === 0)
                {
                    alert("Invalid JSON format. Expected an object with 'name' (string) and 'questions' (non-empty array).");
                    return;
                }

                const importedList = importedData.questions;
                let newListName = importedData.name.trim();


                // Validate the questions array content
                 const isValid = importedList.every(q =>
                     typeof q === 'object' && q !== null &&
                     typeof q.question === 'string' && q.question.length > 0 &&
                     Array.isArray(q.options) && q.options.length >= 2 &&
                     q.options.every(opt => typeof opt === 'string' && opt.length > 0) &&
                     typeof q.answerIndex === 'number' && q.answerIndex >= 0 && q.answerIndex < q.options.length
                     // explanation is optional, no need to check
                 );

                 if (!isValid) {
                     alert("Invalid question structure found in the JSON 'questions' array. Please check each item.");
                     return;
                 }

                // Check if the imported list name is a reserved name (using new sample names)
                 if (newListName === 'Quiz 1' || newListName === 'Quiz 2') {
                      alert(`"${newListName}" is a reserved name. Please choose a different name when importing.`);
                      // Prompt for a new name here instead of cancelling
                      let tempName = prompt(`The imported list name "${newListName}" is reserved. Please enter a new name for this list:`);
                      if (tempName) {
                          newListName = tempName.trim();
                           if (newListName === 'Quiz 1' || newListName === 'Quiz 2' || newListName === '') {
                               alert("Invalid new name. Import cancelled.");
                               return;
                           }
                       } else {
                           alert("Import cancelled. A valid name is required.");
                           return;
                       }
                 }


                // Check for name conflict after handling reserved names
                if (availableQuestionLists[newListName]) {
                     if (!confirm(`A list named "${newListName}" already exists. Do you want to overwrite it?`)) {
                         alert("Import cancelled.");
                         return;
                     }
                 }

                 // Set the imported list to the newQuestionList variable first
                 newQuestionList = importedList;
                 newListNameInput.value = newListName; // Put the name in the input
                 displayNewListPreview(); // Display the imported list in the preview

                 // Prompt user to save the imported list
                 alert(`List "${newListName}" loaded into preview. Review the questions and click "Save New List" to add it to your available lists.`);
                 importExportJsonTextarea.value = ""; // Clear the textarea

                 // We don't automatically save or select the list here.
                 // The user must click "Save New List" to confirm.
                 // questionListSelect.value = newListName; // Don't select automatically
                 // updateHighScoreDisplay(); // Don't update high score yet

             } catch (e) {
                console.error("Error importing list:", e);
                alert("Failed to import JSON data. Please check the format.");
             }
         }

         function importListFromFile(event) {
            const file = event.target.files[0];
            if (!file) {
                return; // User cancelled file selection
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const jsonString = e.target.result;
                importExportJsonTextarea.value = jsonString; // Put content in textarea
                importListFromJson(); // Trigger import from textarea
                importFileInput.value = ''; // Clear the file input after use
            };
            reader.onerror = (e) => {
                console.error("Error reading file:", e);
                alert("Error reading file. Please try again.");
                importFileInput.value = ''; // Clear the file input
            };

            reader.readAsText(file); // Read the file as text
         }


        // Initial load of question lists
        // loadQuestionLists(); // Already done above initialization
        // populateQuestionListSelect(); // Already done above initialization
