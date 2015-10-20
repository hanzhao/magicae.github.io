# ECMAScript 的类与继承

## ES2015

以下代码符合 ES2015 Specification 中关于类和继承的约定。

```js
'use strict'
// String
String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1)
}
// Class
class Animal {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name.capitalize()
  }
  walk() {
    return 'Walk! Walk!'
  }
  static isAlive() {
    return true
  }
  static getClassName() {
    return 'Animal'
  }
}
// Inheritance
class Dog extends Animal {
  constructor(name) {
    super(name)
  }
  // Override
  walk() {
    return 'Run! Run!'
  }
  static getClassName() {
    return 'Dog'
  }
}
// Class method
console.log(Animal.getClassName())
console.log(Animal.isAlive())
// Constructor
let kitty = new Animal('kitty')
// Instance method
console.log(kitty.walk())
console.log(kitty.getName())
// Class method
console.log(Dog.getClassName())
console.log(Dog.isAlive())
// Constructor
let doge = new Dog('doge')
// Instance method
console.log(doge.walk())
console.log(doge.getName())
```

然而现在 ES2015 在各个环境下支持都不太完善。通常需要靠 JavaScript compiler 和运行时 Polyfill，于是这个就暂时搁置。

## 传统的类与基于原型链的继承

1. 类 -> 构造函数
2. 成员变量 -> 当前对象的属性
3. 成员方法 ->
    1. 当前对象的属性，类型为函数
    2. 原型
4. 类方法 -> 构造函数的属性
5. 继承 -> 引入原型链

```js
'use strict'
// String
String.prototype.capitalize = function () {
  return this[0].toUpperCase() + this.slice(1)
}
// Class
function Animal(name) {
  this.name = name
}
Animal.prototype.walk = function () {
  return 'Walk! Walk!'
}
Animal.prototype.getName = function () {
  return this.name.capitalize()
}
Animal.isAlive = function () {
  return true
}
Animal.getClassName = function () {
  return 'Animal'
}
// Inheritance
function Dog(name) {
  // super
  Animal.apply(this, arguments)
}
Dog.prototype = new Animal()
// Override Instance Method
Dog.prototype.walk = function () {
  return 'Run! Run!'
}
// Inherit Class Method
Dog.isAlive = Animal.isAlive
// Override Class Method
Dog.getClassName = function () {
  return 'Dog'
}
// Class method
console.log(Animal.getClassName())
console.log(Animal.isAlive())
// Constructor
let kitty = new Animal('kitty')
// Instance method
console.log(kitty.walk())
console.log(kitty.getName())
// Class method
console.log(Dog.getClassName())
console.log(Dog.isAlive())
// Constructor
let doge = new Dog('doge')
// Instance method
console.log(doge.walk())
console.log(doge.getName())
```
