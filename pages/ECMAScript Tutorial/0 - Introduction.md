# ECMAScript 基本介绍

## 历史
1995 年，Netscape 公司需要在浏览器中实现一门“功能不需要太强，语法简单”的脚本语言，用来实现类似于“阻止用户还没填表单必填项就点了提交”的简单功能。此时 Netscape 和 Sun 公司合作，于是公司管理层希望这门语言像极了 Java，又没有 Java 那么复杂。

[Brendan Eich](https://www.brendaneich.com/) **只用了 10 天** 就设计完了这门语言的第一版。这门语言糅合了多门语言的特点，但又不像现在的 PHP（>= 5.6.0）集成了市面上所有语言的功能，因此没能成为世界上最好的语言。

1997 年，在 ECMA（欧洲计算机制造商协会）的协调下，Netscape、Sun、Microsoft 和 Borland 确定 JavaScript 的统一标准：ECMA-262。因为 JavaScript 兼容于 ECMA 标准，因此也称为 ECMAScript。

这门语言的设计上有着 **许多** 被人广为诟病的缺点，现在标准制定委员会还在填这些设计上的深坑。

## 设计
+ 语法：Java

```js
'use strict';
function func(array) {
  for (var x of array) {
    x = x * 2;
    try {
      if (x % 4 == 0)
        console.log(x);
      else
        throw new Error('Something happened');
    } catch (e) {
      console.error('Oh my god');
    }
  }
}
var items = [1, 2, 3, 4];
func(items);
/*
  Oh my god
  4
  Oh my god
  8
*/
```

+ 类型系统：动态类型
+ 数据结构：Java

```js
'use strict';
// Type: [number, boolean, string, object, undefined, object, object, function]
var items = [1, true, 'str', null, undefined, {key: 'value'}, [5, 4, 3], function () { return 1; }];
var temp;
for (var x of items) {
  temp = x;
  console.log(x);
  console.log('Type: ' + typeof(temp));
}
/*
  1
  Type: number
  true
  Type: boolean
  str
  Type: string
  null
  Type: object
  undefined
  Type: undefined
  { key: 'value' }
  Type: object
  [ 5, 4, 3 ]
  Type: object
  [Function]
  Type: function
*/
```

+ 函数和闭包：Scheme

```js
'use strict';
function doWithCallback(a, b, callback) {
  var c = a + b;
  return callback(c);
}
function print(x) {
  console.log(x);
}
doWithCallback(5, 3, print);
/*
  8
*/
```

+ 原型继承：Self

```js
'use strict';
// Superclass
function Animal(nickname) {
  this.nickname = nickname;
}
Animal.prototype = {
  walk: function(x) {
    console.log('Hello, my name is ' + this.nickname + '. ' +
                'I am an animal and I can walk ' + x + ' steps.');
  }
}
// Subclass
function Dog(nickname) {
  Animal.apply(this, arguments);
}
Dog.prototype = new Animal();
Dog.prototype.say = function() {
  console.log('Hello, my name is ' + this.nickname + '. ' +
              'I am a dog and I can bark.');
}
var pet = new Dog('fatty');
pet.walk(10);
pet.say();
/*
  Hello, my name is fatty. I am an animal and I can walk 10 steps.
  Hello, my name is fatty. I am a dog and I can bark.
*/
```

+ 正则表达式：Perl

```js
'use strict';
var regExp = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
regExp.test('8.8.8.8'); // true
var match = regExp.exec('10.214.0.99');
console.log(match);
/*
  [ '10.214.0.99',
  '10',
  '214',
  '0',
  '99',
  index: 0,
  input: '10.214.0.99' ]
*/
```

## 趋势

+ [GitHub language trends](https://github.com/blog/2047-language-trends-on-github)

![GitHub Language Trends](/assets/img/js-tutorial/github-language-trends.jpg)

+ [Event-driven I/O for JavaScript](https://nodejs.org)

![Node.js](/assets/img/js-tutorial/node-09-25.png)

+ [Cross-platform destop application](http://electron.atom.io)

![Destop Application](/assets/img/js-tutorial/atom.png)

+ [npm: the largest ecosystem of open source libraries](https://www.npmjs.com)

![npm](/assets/img/js-tutorial/npm-09-25.png)

> Any application that can be written in JavaScript, will eventually be written in JavaScript.
> - Atwood's Law
>
> 只要一个软件可以被 JavaScript 实现，这个软件就一定会被 JavaScript 的实现版所取代。
> —— 马云一定没有说过。
