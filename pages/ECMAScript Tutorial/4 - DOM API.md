# DOM API

JavaScript 作为浏览器中的编程语言，依靠 DOM(Document Object Model) API 来做到和 HTML 文档进行交互。

## 数据获取与修改

```html
<!DOCTYPE html>
<html>
<body>
  <h1 class="html-class-h1" id="sample">
    Hello world.
  </h1>
</html>
```

```js
'use strict'
// by css-like selector
let h1 = document.querySelector('h1.html-class-h1#sample')
// by id
let h1 = document.getElementById('sample')
// by class
let h1 = document.getElementsByClassName('html-class-h1')[0]
// by tag name
let h1 = document.getElementsByTagName('h1')[0]
```

每个 HTML 元素都是一个对象，是 [`class HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) 的一个实例，提供了大量的 API，可以动态获取或者修改元素的属性和行为，做到对整个 HTML 文档的修改。

```js
'use strict'
let h1 = document.querySelector('h1.html-class-h1#sample')
h1.innerHTML // a [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) representing the markup of the element's content.
h1.classList // a [`DOMTokenList`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList) containing the list of class attributes.
```

具体接口参考 [MDN](https://developer.mozilla.org) 即可。

## 事件绑定

API 通常是使用回调函数的形式做到监听事件的。

```js
'use strict'
let h1 = document.querySelector('h1.html-class-h1#sample')
h1.addEventListener('click', (e) => console.log(e))
```

## AJAX

AJAX(Asynchronous Javascript And XML) 给了浏览器不跳转页面即可与服务器交互的能力。核心是依靠浏览器提供的 [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) API。
