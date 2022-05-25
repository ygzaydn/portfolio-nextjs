# Javascript Array Methods

In this article, I'll go into array methods, and how can be used on different scenarios to make it more clear. More details can be found on [MDN Resources](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array?retiredLocale=tr). This article focuses on the most practical ones, and the ones that I use generally. Please note that memorizing those methods will not help you, the main goal is to have the insight, I mean to have knowledge to attack problems.

---
## Table of Contents



- [slice](#slice--)
- [splice](#splice--)
- [reverse](#reverse--)
- [concat](#concat--)
- [join](#join--)
- [at](#at--)
- [forEach](#foreach--)
- [map](#map--)
- [filter](#filter--)
- [reduce](#reduce--)
- [find](#find--)
- [findIndex](#findindex--)
- [some](#some--)
- [every](#every--)

---


## slice()

Helps us to slice arrays(extracting particular parts). Does not mutate original array. Copies array and returns this array which is filtered only desired part. *slice* method takes two -optional- parameters.

```js
let arr = ['a','b','c','d','e'];

console.log(arr.slice(2)); // ['c','d','e']
console.log(arr.slice(1,2)); // ['b']
console.log(arr.slice(-1)); // ['e']
console.log(arr.slice(-2)); // ['d','e']
console.log(arr.slice(1,-2)); // ['b','c']
```

> First parameter(start) parameter is included, whereas second parameter (end parameter) is not included.

We can also use *slice* method to create **shallow copy** of any array.

```js
console.log(arr.slice()); // ['a','b','c','d','e']
console.log([..arr]); // spread operator also creates shallow copy ['a','b','c','d','e']
```

## splice()

Splice method works almost same way with *slice*. Fundamental difference that *splice* methods **mutates original array.** The way that *splice* works is similar with *slice*. It takes two optional parameters. First parameter is the place that we want to start. Second parameter determines the length that we want to remove.

```js
console.log(arr.splice(2)); // ['c','d','e']
console.log(arr); // ['a','b'];
```

Splice deletes extracted arrays. In practice, we use splice to delete elements instead of investigating extracted parts.

```
arr.splice(-1); // deletes last element from array
console.log(arr); // ['a']
```

## reverse()

Reverses the array. This method **mutates the original array.**

```js
const arr = ['a','b','c','d','e']
const arr2 = ['j','i','h','g','f']

console.log(arr2); // ['f','g','h','i''j]
console.log(arr); // ['f','g','h','i','j']

```

## concat()

Concatenates the array.

```js
const arr = ['a','b','c','d','e']
const arr2 = ['f','g','h','i','j']

const letters = arr.concat(arr2);

console.log('letters'); // ['a','b','c','d','e','f','g','h','i','j']
console.log([...arr,...arr2]); // ['a','b','c','d','e','f','g','h','i','j'] modern way

```

This method **does not mutate any array.**

## join()

Convert array to a string with the character we specify.

```js
console.log(letters.join('-')); "a-b-c-d-e-f-g-h-i-j"
```

## at()

*at* method is new. It helps to get specific index on an array.

```js
const arr = [23, 11, 64]

console.log(arr[0]); // traditional way
console.log(arr.at(0)) // gives same result, 23
```

There is one particularity on *add* method instead of bracket notation. Assume that we want to get latest array:

```js
console.log(arr[arr.length-1]) // gives last element, 64
console.log(arr.slice(-1)[0]) // gives last element, 64
console.log(arr.at(-1)) // gives last element, 64

/* similarly */

console.log(arr.at(-2)); / / 11
```

> When we use negative index on *at* method, it counts backwards.

> *add* method works on strings aswell.

## forEach()

Helps us to loop arrays. This methods is very niche one, lots of developer need to use it. It basically iterate every array element with given callback function. forEach calls callback function on each element of an array. 

On the example below, I have provided for loop and forEach loop seperately.

```js
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
	if(movement > 1500){
		console.log(movement)
	}
}

/* returns 3000 */

movements.forEach(el => {
	if(el > 1500){
		console.log(el)
	}
})

/* returns 3000 */
```

> forEach method does not create a new array. It does the operation on the **given array.**

Callback function can take up to 3 arguments. First argument is used to get each value on iteration, second argument is used to get index and third argument can be used get whole array if necessary.

```js
movements.forEach((el,ind,arr) => {
	if(el > 1500){
		console.log(el);
		console.log(arr);
		console.log(ind)
	}
})

/* returns 3000, [200, 450, -400, 3000, -650, -130, 70, 1300], 3 */

for (const [i, movement] of movements.entries()) {
	if(movement > 1500){
		console.log(i);
		console.log(movement);
		
	}
}
/* returns 3, 3000 */
```

> I want you to notice that, by using forEach it is much more easier to reach the elements of the array.

forEach is also available for *map* and *sets*. 

-	On map, the variables that we use for callback function represents value, key, and map itself respectively.
-	On set, the story is a bit different. On set, we do not have any key, so we need to pass it, if we not we'll have same value (the example shown below). To overcome it we use a **throwaway parameter -> _**. 

```js
const currencies = new Map([
	['USD', 'United Stats of Dollar'],
	['EUR', 'Euro'],
	['GBP', 'Great Britain Pound'],
])

currencies.forEach((value, key, map) => {
	if(key.includes('U')){
		console.log(value);
		console.log(key);
	}
})

/* returns United States of Dollar, USD, Euro, EUR */

const currenciesUnique = new Set(['USD','GBP','USD','EUR','EUR']);
console.log(currenciesUnique) // ['USD', 'GBP', 'EUR']

currenciesUnique.forEach((value, key, map)=>{
	console.log(`${key}: ${value}`)
})

/* returns USD: USD, GBP: GBP, EUR: EUR */

currenciesUnique.forEach((value, _, map)=>{
	console.log(`${value}: ${value}`)
})

/* returns USD: USD, GBP: GBP, EUR: EUR */
```

## map()

`map()` method is similar to `forEach()` method, but the main difference is that **`map()` method returns a completely new array instead of dealing with current one.** The conversion between present and new array should be defined in callback function.

Usage is very similar to `forEach()`

```js
const eurToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movementsEUR = movements.map(el => el * eurToUsd);

console.log(movementsEUR); // [220,495,-440,3300,-715,-143,77,1430]

const movementsUSDfor = []
for (const mov of movements) {
	movementsUSDfor.push(mov*eurToUsd)
}
console.log(movementsUSDfor); // [220,495,-440,3300,-715,-143,77,1430]
```

`map()` method callback function takes 3 arguments which are same with forEach case.

## filter()

`filter()` is used to filter array with given certain condition(callback function). This method **returns a new array.** It only displays the items that returns true on callback function.

```
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const big = movements.filter(el => el > 1500);

console.log(big); // [3000]
```

## reduce()

Reduce method is used to calculate a value by passing every element on an array.

Understanding *reduce* method is very important yet harder than the other array methods.

Reduce method takes 2 input. First input is callback function, second one is for initial value.

Callback function takes 4 input. They are *accumulator*, *current*, *index*, and *arr* respectively.

	-	Accumulator value is used to keep the returned value on every iteration.
	-	Current value is used to get the value on current iteration.
	-	Index is used to get index number, in case its necessary.
	-	Arr is used to get overall array, in case its necessary.


On below, I have provided an example:

```js
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

const balance = movements.reduce((accumulator, current, index, arr) => {
	return accumulator + current
	}, 0)

console.log(balance); // 3840

const balanceTwo = movements.reduce((accumulator, current, index, arr) => 
	accumulator + current , 100);

console.log(balanceTwo); //3940


```

> Keep in mind that accumulator variable keeps the calculated data on each iteration. So when we ask to *return accumulator+current* we basically want to add current value to accumulator.

Understanding *reduce* method is very important yet harder than the other array methods.

We can also do different stuff than adding numbers with the help of reduce method. I have provided an example which finds the maximum value on an array:

```js
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

const maxVal = movements.reduce((acc, current) => 
	acc > current ? acc : current, movements[0])

console.log(maxVal); // 3000
```

> Please note that we can chain different array functions. In this case, we'd have neater code, but debugging would be harder. It will be hard to detect error in case we made an error. In this case, one can use callback functions with *arr* input, and log it to see results.

## find()

To retrieve one element on an array based on condition(callback function). Find **returns the first element that meet condition.**

```js
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

const result = movements.find(el => el < 0);
console.log(result); -400;
```

## findIndex()

Similar to `find()`, `findIndex()` **retrieves the first index that meet condition.** Usage is very similar to `find()`.

```js
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

const result = movements.findIndex(el => el < 0);
console.log(result); 2;
```

## some() and every()

### some()

To test an array if includes a certain condition. We put a condition and check if array supports it. `some()` **returns a boolean value.**

```js
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

const result = movements.some(el => el > 0);
console.log(result); true;

const result2 = movements.some(el => el > 5000);
console.log(result2); false;
```

### every()

Similar to `some()` but the main difference is **it retuns true if all the elements in the array satisfies the condition.**

```js
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

const result = movements.every(el => el > 0);
console.log(result); false;

const result2 = movements.every(el => el < 5000);
console.log(result2); true;
```
