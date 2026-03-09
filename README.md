Question-1:
The difference between var, let and const:
var: var was used in older versions of JavaScript. It has function scope, which means it is accessible throughout the entire function where it is declared. A variable declared with var can be redeclared and reassigned in the same scope.
	var a = 10;
	var a = 20;
these are allowed for taking var.

let: A let variable can be reassigned, but it cannot be redeclared in the same scope. It is mostly used in modern JavaScript. It is block scope. one let variable initialize only one time in a function block.
	let b = 10;
	b = 20;
	but not allowed let b=50;

const: is used to declare variables whose values cannot be reassigned after initialization. Const variable means fixed variable. It is also block scope.
	const c = 10;
	but it doesn't allow c = 20 again.


Question-2:
The spread operator (...) is used to expand elements of an array or properties of an object. It is used to copy one array into another or combine multiple arrays into a single array.

	const arr1 = [1,2,3];
	const arr2 = [...arr1,4,5];
arr1 will show as output: [1,2,3] and arr2 will show: [1,2,3,4,5]. arr2 copies all elements of arr1 and it is safe method. Non-primitive data types(array, object, function) pass values with reference. So, change in one, updates in all arrays. 


Question-3:
Difference between map(), filter() and forEach():
map(), filter(), forEach are used are used to work with arrays in JavaScript. These are ES6 methods or modern methods. 

map(): The map() method is used to transform or modify each element of an array based on a condition. It returns a new array without changing the original array.

filter(): The filter() method is used to select elements that satisfy a given condition. It returns a new array containing only the matched elements without modifying the original array.

forEach(): The forEach() method is used to iterate through each element of an array and perform an action but it has no return.



Question 4:
Arrow function is a shorter way of writing a function. It is a ES6 feature. It stores the return value in a variable. If the code body is multiple lines, must be mentioned return keyword and return value. Arrow functions make code shorter and easier to read, especially for small functions and callbacks.
Syntax:
	const function_name =(parameter1,....)=>{code body}
	const add = (a,b) => {
  		return a+b;
	}


Question 5:
Template literals are a feature in JavaScript that allows developers to create dynamic strings. 
They use backticks ` ` instead of single or double quotation marks. It allows variables and expressions to be embedded directly inside a string using the ${} syntax.

const name = "Afazur";
const age = 25;
const text = `My name is ${name} and I am ${age} years old.`;