# Types on Javascript

We all know that Javascript has dynamic type structure. Unlike static type languages, we can assign different types on same variable. 

This situation may be exhaustive and hard to fight with, but with strong fundamental knowledge, developers can benefit from it.

> Whenever there's a divergence between what your brain thinks is happening, and what the computer does, that's where bugs enter the code.

Many developer on Javascript community is not interested with JS specification, but the logic behind JS is clearly defined on ECMA standarts of Javascript. We all should check the spec when having struggles about JS.

In this post, I'll try to open a wider window about types we have on JS. This post will mainly focus on the edge cases - cases that we may struggle.


- 
	- [Types](#types)
		- [undefined vs undeclared vs uninitialized](#undefined-vs-undeclared-vs-uninitialized)
		- [NaN](#nan)
		- [Negative Zero](#negative-zero)
		- [Fundamental Objects](#fundamental-objects)
	- [Coercion](#coercion)
		- [toString](#tostring)
	- [Equality Checks](#equality-checks)

## Types

There is a general saying about JS: `In JS, everything is an object`. This statement is actually false. You can check the [spec](https://262.ecma-international.org/9.0/#sec-ecmascript-language-types) itself.

The ECMAScript language types are:
	-	undefined
	-	null
	-	boolean
	-	string
	-	number
	-	symbol
	-	object

The key phrase we can say that: `In JS, variables don't have types, values do.`


```js
var v;
typeof v; // "undefined"

v = "1"
typeof v; // "string"

v = 1
typeof v; // "number"

v = {}
typeof v; // "object"

v = Symbol()
typeof v; // "symbol"

v = null
typeof v // "object" !!!

v = function(){}
typeof v; // "function" !!!

v = [1,2,3]
typeof v; // "object"
```

As you can see above, there are different edge cases we need to deal with. Although we have a type of `null`, when we check the type of `null`, we have `object`. Interesting, isn't it?

### undefined vs undeclared vs uninitialized

Let's make a clarification here. 

-	Undefined means that value of the variable is not assigned.
-	Undeclared means that variable is never been created.
-	Uninitialized means that variable is not created on the scope.

Block scope variables are not initialized, means that they won't have value of undefined when they're called. On the other hand, global variables can have value of `undefined`.

### NaN

We have special expression called `NaN` (invalid number).

```js
var myAge = Number("0o46"); //38
var myNextAge = Number("39") //39
var myCatsAge = Number("n/a") //NaN
myAge - "my son's age"; //NaN

myCatsAge === myCatsAge; //false !!

isNaN(myAge); //false
isNaN(myCatsAge) //true
isNaN("my son's age") //true !! isNaN coerces values to number before it makes its own evaluation

Number.isNaN(myCatsAge); //false
Number.isNaN("my son's age"); //false

```

NaN is the only value that does not have identical value. (undefined === undefined is true, but we can't make type check on NaN which comes true)

### Negative Zero

Negative Zero (-0) is another special expression that we have. There are some edge cases on it (maybe you may need to use -0 in your projects.)

```js
var trendRate = -0;
trendRate === -0; //true

trendRate.toString(); //"0" !!
trendRate === 0; //true !!
trendRate < 0; //false;
trendRate > 0; //false

Object.is(trendRate,-0); //true
Object.is(trendRate,0); //false

Math.sign(-3); //-1
Math.sign(3); //1
Math.sign(-0); //-0 !!
Math.sign(0); //0;

function sign(v){
  return v !== 0 ? Math.sign(v) : Object.is(v,-0) ? -1 : 1
}

sign(-3); //-1
sign(3); //1
sign(0); //1
sign(-0); //-1
```

> The [Object.is()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) method determines whether two values are the same value. 


### Fundamental Objects

As I've mentioned above, if an value does not have primitive type, it is identified as an `object`. There are some defined objects on JS. They have defined constructor function on prototype. We can use `new` keyword to create objects on:

```js
Object()
Array()
Function()
Date()
RegExp()
Error()
```


## Coercion

Type conversion on JS -> Coercion. 

All programming languages have type conversions, because it's absolutel necessary. You can use coericon in JS whether you admit it or not, because you have to. Some of those coercions may operate explicitly, but behind the scenes we have much more coercion operation.

We have `toPrimitive(hint)` abstract operation help us to coarce.

### toString

toString abstract operation helps us to coerce type to string.

```js
toString(null); // "null"
toString(undefined); // "undefined"
toString(true); // "true"
toString(false); // "false"
toString(3.1459); // "3.1459"
toString(0); // "0"
toString(-0); // "0"
```

If we call `toString` on an object, we'll invoke `toString()` first, if we do not have a value, we'll call `valueOf()`.

```js
toString([]); // ""
toString([1,2,3]); // "1,2,3"
toString([null, undefined]); // ","
toString([[],[],[],[]]); // ",,,"
toString([,,,]); // ",,,"

toString({}); // [object Object]
toString({a:2}); // [object Object]
toString(toString(){return "X"}); // "X"
```

> I won't go detail on different abstract operations (e.g `toNumber`, `toBoolean`). You can check them on the web.

We don't deal with these type conversion corner cases by avoiding coercions. Instead, w e have to adopt a coding style that makes value types plain and obvious. A quality JS program embraces coercions, making sure the types involved in every operation are clear. Thus, corner cases are safely managed. JS's dynamic typing is not a weakness, it's one of its strong qualities.

> Implicit coercion != Magic
> Implicit coercion != Bad
> Implicit coercion = Abstraction

## Equality Checks

-	== allows coercion (types different)
-	=== disallows coercion (types same)

We can call this operation as: **Coercive Equality vs. Non-Coercive Equality**

> If you're trying to understand your code, it's critical you learn to think like JS.

Corner case for == operation.

-   If x is null and y is undefined == returns true
-   If x is undefined and y is null == returns true

> `null` and `undefined` are equal on coercion-wise

```js
var workshop1 = {topic: null};
var workshop2 = {};

if (
    (workshop1.topic === null || workshop1 === undefined) &&
    (workshop2.topic === null || workshop2 === undefined) &&
    ) {

}

// is same as

if (workshop1 == null && workshop2 == null) {}

    /*------------------*/

var workshop1Count = 42;
var workshop2Count = [42];

//if(workshopCount1 == workshopCount2)
//if(42 == "42")
//if(42 === 42) -> true

    /*------------------*/
```

As a summary, **almost keep in mind following items on equality check:**

-	Always use `===` if the types are same.
-	Double equality check equals `null` and `undefined`
-	Double equality check calls `toPrimitive` on first step.
-	Double equality prefers comparison by calling `toNumber`
-	You always avoid `==` with 0 or "" (or even " ")
-	You always avoid `==` with non-primitives
-	You always avoid `== true` or `== false` (instead use `===` or `toBoolean`)
-	There are some corner cases for `==` which are listed below:

```js
[] == ![]; // true;

var workshop1Students = [];
var workshop2Students = [];

workshop1Students ==! workshop2Students // true
/*
([] == false)
("" == false)
(0 == false)
(0 === 0) -> true
*/
workshop1Students != workshop2Students // true
/*
!(workshop1Students == workshop2Students)
!(false) -> true
*/


var workshopStudents = []

if(workshopStudents) // true
/*
(Boolean(workshopStudents)) -> true
*/
if(workshopStudents == true) // false
/*
if("" == true)
if(0 === 1) -> false
*/
if(workshopStudents == false)// true
/*
if("" == false)
if(0 === 0) -> false
*/
```

Knowing types is always better than not knowing them. Static types is not the only (or even necessarily best) way to know your types. `==` is not about comparisons with unknown types. `==` is about comparisons with known type(s), optionally where conversions are helpful.

If you **know** the types in a comparison; if both types are the same `==` is identical to `===`. Using `===` would be unnecessary, so prefer the shorter `==`.

> You should use `==` in all possible cases. Since `===` is pointless when the types don't match. It's similarly unnecessary when they do match. `==` runs faster & cleaner.

If you don't know the types in a comparison: Not knowing the types means not fully understanding that code. So, best to refactor so you can know the types. Not knowing the types is equivalent to assumng type conversion. Because of corner cases, the only safe choice is `===`.

> If you can't or won't use known and obvious types, `===` is the only **reasonable** choice.

> Making types known and obvious leads to better code. If types are known, `==` is best. Otherwise, fallback to `===`

