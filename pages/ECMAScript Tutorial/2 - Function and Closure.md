# ECMAScript 的函数

JavaScript 披着命令式语言的外衣，但是有一颗函数式语言的心。

## 高阶函数

以函数为参数的函数，通常用于扩展原函数。

```js
'use strict'
function bigger(func) {
  let decorated = (text) => {
    return `<h1>${func(text)}</h1>`
  }
  return decorated
}
function bodify(func) {
  let decorated = (text) => {
    return `<body>${func(text)}</body>`
  }
  return decorated
}
function render(text) {
  let result = `<span>${text}</span>`
  return result
}
let renderToHTML = bodify(bigger(render))
console.log(render('Hello world'))
console.log(renderToHTML('Hello world'))
/*
  <span>Hello world</span>
  <body><h1><span>Hello world</span></h1></body>
*/
```

Python 中的 decorator 也是高阶函数的一个例子。

## apply, bind, call

JavaScript 中可以让一个对象代替另一个对象执行函数，直观的说，就是替换函数中的 `this` 所指向的对象。

Function 类有三个常用的实例方法，`Function.call`，`Function.apply`，`Function.bind`。

```js
'use strict'
let dog = {
  name: 'poi',
  printName(repeat) {
    for (let i = 0; i < repeat; ++i) {
      console.log(`I am a dog named ${this.name}`)
    }
  }
}
let bear = {
  name: 'kuma',
  printName(repeat) {
    for (let i = 0; i < repeat; ++i) {
      console.log(`I am a bear named ${this.name}`)
    }
  }
}
console.log('Dog prints: ')
dog.printName(2)
console.log('Bear prints: ')
bear.printName(2)
console.log('`Function.call` prints: ')
dog.printName.call(bear, 2)
console.log('`Function.apply` prints: ')
dog.printName.apply(bear, [2])
console.log('`Function.bind` prints: ')
dog.printName.bind(bear, 2)()
/*
  Dog prints:
  I am a dog named poi
  I am a dog named poi
  Bear prints:
  I am a bear named kuma
  I am a bear named kuma
  `Function.call` prints:
  I am a dog named kuma
  I am a dog named kuma
  `Function.apply` prints:
  I am a dog named kuma
  I am a dog named kuma
  `Function.bind` prints:
  I am a dog named kuma
  I am a dog named kuma
*/
```

## 语法闭包

A -> B, B -> C, 那么 A -> C。

语法闭包的定义很绕，我的理解是：语法闭包是一个自由变量 C，作为某个函数 B 的上下文，通过传递的方式带到了作用域 A，那么 A 便能间接访问到 C。此时，被带出作用域的的自由变量不会因为原作用域消失而被回收。

一个直接例子。

```js
'use strict'
let counter = 0
function multiplyGenerator() {
  counter += 1
  let factor = counter
  return (a, b) => {
    let result = a * factor;
    if (typeof b !== 'undefined') {
      factor = b
    }
    return result
  }
}
let multiplyOne = multiplyGenerator()
let multiplyTwo = multiplyGenerator()
let multiplyThree = multiplyGenerator()

console.log(multiplyOne(2))
console.log(multiplyTwo(2))
console.log(multiplyThree(2))
console.log(multiplyTwo(2, 1))
console.log(multiplyTwo(2, 1))
```

`function multiplyGenerator` 中的 `factor` 不会因为 `multiplyGenerator` 退出而被回收，而是被带出了原本的作用域，外层的 `console.log` 通过 `Function multiply*` 简介地访问到了 `factor` 的值。并且，因为 `multiplyGenerator` 被调用了多次，生成了不同的 `factor`，所以不同的 `Function multiply*` 的 `factor` 之间是相互独立的。

这东西能用来做什么呢？

> 闭包是穷人的对象

> 对象是穷人的闭包

诶嘿。
