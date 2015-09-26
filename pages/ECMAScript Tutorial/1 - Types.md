# ECMAScript 的类型

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

**TODO**

### 数组（Array）

**TODO**

### 函数（Function）

**TODO**

## undefined（WTF?）

**TODO**
