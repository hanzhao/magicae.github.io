# ECMAScript 的类型

## 声明

用 `var` 声明一个变量，这个变量的作用域是声明这个变量的整个函数内，或者是全局。

es2015 中增加了 `let` 实现块级作用域，算是比较正常的一种。

```js
'use strict';
var a = 5;
console.log(a);
(function func() {
  console.log(a);
  var a = 10;
  console.log(a);
})();
console.log(a);
/*
  5
  undefined
  10
  5
*/
```

```js
'use strict';
let a = 5;
console.log(a);
let func = () => {
  // console.log(a); // ReferenceError: a is not defined
  let a = 10;
  console.log(a);
};
func();
console.log(a);
/*
  5
  10
  5
*/
```

## 动态类型

一个变量可以被多次赋予不同类型的数据。

```js
'use strict';
var a = 5; // Number
a = 'string'; // String
a = {
  key: 'value'
}; // Object
a = function (x) { // Function
  return console.log.call(this, x);
}
```

## 基本类型

### 数值（Number）

#### 存储方式

规范中规定所有数值均为浮点数的方式存储。

以 Google V8 为例，所有数值均为 V8::Number，以 double 的形式存在（但是优化的时候会使用 V8::Int32 和 V8::Uint32）。

```js
'use strict';
var a = 1;
var b = 1.0;
a === b; // true
```

#### 数值范围

可以精确表达的整数范围是正负 2<sup>53</sup> 之间（开区间），超过范围会无法保证精度。
可以表示的数字在 2<sup>-1023</sup> 到 2<sup>1024</sup> 之间（开区间），超过范围会变 0 或者 Infinity。

```js
'use strict';
Number.MAX_SAFE_INTEGER; // 9007199254740991
Number.MIN_SAFE_INTEGER; // -9007199254740991
Number.MAX_VALUE; // 1.7976931348623157e+308
Number.MIN_VALUE; // 5e-324
Number.MAX_VALUE * 2; // Infinity
Number.MIN_VALUE / 2; // 0
```

#### 浮点误差

浮点运算存在浮点误差，比较时需要注意。

```js
'use strict';
var a = 1.1 - 1.0; // 0.10000000000000009
var b = 1.0 - 0.9; // 0.09999999999999998
Number.EPSILON; // 2.220446049250313e-16
a === b; // false
Math.abs(a - b) < Number.EPSILON; // true
```

#### 特殊值

+ NaN

超越科学定义范围的数学运算返回 NaN。

```js
'use strict';
var a = 'String' * 5; // NaN
var b = 0 / 0; // NaN
Number.isNaN(a); // true
NaN === NaN; // false
```

+ Infinity

超过可表达范围的数值。

```js
'use strict';
var a = 5 / 0; // Infinity
var b = Math.pow(-0, -1); // -Infinity
a === b * -1; // true
a + b; // NaN
a - b; // Infinity
a * b; // -Infinity
a / b; // NaN
Number.isFinite(a); // false
Number.isFinite(a / b); // false
```

#### 相关方法

字符串转数值，`parseInt` 和 `parseFloat`。

### 字符串（String）

和各种语言的字符串行为类似，字符串是不可变的（Immutable）。

```js
'use strict';
var s = 'abcdefg😘ijklmnopqrstuvwxyz';
s.length; // 27
s[6]; // g
s.slice(7, 9); // 😘
s[1] = '_';
s; // abcdefg😘ijklmnopqrstuvwxyz
```

### 对象（Object）

JavaScript 的对象就是一个无序的数据集合，由一堆 key-value 构成。可以通过 `this` 访问自己的成员。

```js
'use strict';
let obj = {
  key: 'value',
  "another-key": 3,
  0x7F: function () {
    console.log(this.key);
  }
}
console.log(obj.key);
console.log(obj['another-key']);
// obj.0x7F(); // SyntaxError: Unexpected token ILLEGAL
obj[0x7F]();
/*
  value
  3
  value
*/
```

### 数组（Array）

和其他语言的数组差不多，属于 `Array` 这个类，提供了一堆方法，具体可以查文档。

```js
'use strict';
let a = [1, 2, 3];
a.length === 3;
a.push(4);
a.pop();
a.unshift(0);
a.shift();
```

### 函数（Function）

函数作为一种基本类型，可以作为参数也可以作为返回值。作为返回值的时候还可以把一个局部变量带出作用域（Closure）。
函数属于 `Function` 这个类，也提供了一堆成员变量和方法，可以看文档，比如可以通过 `name` 获得这个函数的名字。

```js
'use strict';
function plus(a, b) {
  var res = a + b;
  return res;
}
console.log(plus(1, 2));
function multiplyGenerator(factor) {
  return function multiply(a, b) {
    return a * b * factor;
  }
}
let multiplySix = multiplyGenerator(6);
let multiplySeven = multiplyGenerator(7);
console.log(multiplySix(5, 6));
console.log(multiplySeven(5, 6));
/*
  3
  180
  210
*/
```

匿名函数，很多时候没什么必要写名字的，那不写就好了，通过 `name` 发现这个函数的名字为空字符串。

```js
'use strict';
[2, 4, 6, 8].forEach(function (x) {
  console.log(x >> 1);
});
let res = [1, 2, 3, 4, 5, 6, 7, 8].filter((x) => x % 2 == 0);
console.log(res);
let res2 = [-1, 0, 1, 2, 3, -4, 5, 6, 7, -10]
           .filter((x) => x > 0)
           .map((x) => x * 2)
           .reduce((a, b) => a + b);
// [-1, 0, 1, 2, 3, -4, 5, 6, 7, -10]
// => [1, 2, 3, 5, 6, 7]
// => [2, 4, 6, 10, 12, 14]
// => 2 + 4 + 6 + 10 + 12 + 14
// => 48
console.log(res2);
/*
  1
  2
  3
  4
  [ 2, 4, 6, 8 ]
  48
*/
```

## undefined（WTF?）

表示空值的方式，C 语言用 `NULL`，Java 用 `null`，Python 用 `None`，Ruby 用 `nil`…

可是 JavaScript 有 `undefined` 和 `null` 两种……而且 `undefined` 是一个类型，`null` 是一个值。

```js
'use strict';
let a = {};
let b = null;
console.log(a.haha); // undefined
console.log(a.haha === undefined); // true
console.log(typeof a.haha === 'undefined'); // true
console.log(b === null); // true
console.log(typeof b === 'object'); // true (WTF?)
```

```js
'use strict';
let a = undefined;
let b = null;
```

不知道这个设计者怎么想的，不过两者在实践中还是有一些区别的。

通常用 `undefined` 的场景是“这个值没有被定义过”。

1. 变量被声明了，但没有赋值时，就等于 `undefined`；
2. 调用函数时，应该提供的参数没有提供，该参数等于 `undefined`；
3. 对象没有赋值的属性，该属性的值为 `undefined`；
4. 函数没有返回值时，默认返回 `undefined`；

用 `null` 表示“定义为空值”。

## Built-in Objects

RegExp，Date，Error，Promise，Generator，Proxy，Map，Set，WeakMap，WeakSet……

[Standard built-in objects - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
