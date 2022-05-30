# 1、块级作用域和let
[TOC]
在ES5及以前版本，在同一个作用域环境中通过var声明重名的变量在进行覆盖后依旧能正常执行，所以会存在变量污染的问题。解决该问题的办法是通过函数作用域来对重名变量进行隔离到单独的作用域中执行。ES5及以前解决该问题的原则叫做kiss原则（keep it simple，stupid）。
在ES6之后，推出了新的语法let，与let语法相关联的概念为块级作用域。
补充：不建议在块级作用域中用函数声明的方式来声明函数（应用函数表达式）。
let语法的规则有：

1. 在同一作用域下，不允许重复声明。
2. let不会提升，会产生一个暂时性死区。例：
```javascript
{
  console.log(a); //输出undefined
  var a = 10;
}
{
  console.log(a); //报错，暂时性死区
  let a = 10;
}
{
  console.log(typeof a); //报错，暂时性死区
  let a;
}
```

3. let只能在当前的块级作用域下生效。例：
```javascript
{
  let a = 1
  console.log(a) //输出1
}
console.log(a) //报错
```

4. let与for循环（块级作用域）：
```javascript
for (var i = 0; i < 10; i++) {
  var i = 'a';	//此处的i会将for循环中的i覆盖
  console.log(i);
} //输出1个a

for (let i = 0; i < 10; i++) {
  var i = 'a';	//此处的i会被提升，所以会和for循环中的i冲突
  console.log(i);
} //报错

for (let i = 0; i < 10; i++) {
  let i = 'a'; // 因为此处的i相对于for循环中的i是处于子作用域中的，属于嵌套关系，所以变量i不冲突
  console.log(i);
} //输出10个a

for循环括号内容和for循环的执行内容为嵌套关系，以11行的for循环为例，两个i变量的块级作用域关系为：
{
  let i = 0;
  {
    let i = 'a'
    console.log(i);
  }
}
```
总结：let本质上是为JavaScript增加了一个块级作用域的概念。
# 2、const
const常量是块级范围的，非常类似用let 语句定义的变量。但常量的值是无法（通过重新赋值）改变的，也不能被重新声明。
const语法的规则有：

1. 一旦被定义必须赋值
1. 在同一作用域下，不允许重复声明。
1. const不会提升，会产生一个暂时性死区。
# 3、解构赋值
解构赋值语法是一种 Javascript 表达式。通过解构赋值, 可以将属性/值从对象/数组中取出,赋值给其他变量。解构允许你使用模式匹配绑定变量,这适用于数组和对象。 
解构的几种特殊情况：

1. 解构失败：变量多了，多余的变量会被赋值为undefined
1. 不完全解构：值多了，即没有将每一个值都解构获取出来

解构可以有默认值，即在解构失败的情况下可能将变量赋值为默认值（只有解构出的变量值为undefined的时候默认值才会生效），例：
```javascript
var [a, b, c = 1] = [3, 2];
console.log(a, b, c); // 输出3 2 1
```
数组的解构：
```javascript
var [a, b, c] = [1, 2, undefined] //每一位元素与数组下标相对应的去取值
var [a, b, c=3] = [1, 2, undefined] //可以给解构变量默认值，此时c为3


var [a, [b, c]] = [2, [3, 4]] // a = 2, b = 3, c = 4

//因为数组是一种特殊的对象，所以也可以以对象形式进行解构赋值
var arr = [1, 2, 3]
var {0: a, [arr.length-2]: b, 2: c} = arr
console.log(a, b, c) //输出1 2 3
```
对象的解构：
```javascript
var {name: name1, age: age1, sex: sex1 = 'male'} = {name: 'try', age: 21, sex: undefined}
console.log(name1, age1, sex1) //输出'try' 21 'male
//此处的name1和age1为保存相应键值的变量

var person = {
    name: '1',
    son: {
        name: '2',
        son: {
            name: '3'
        }
    }
}
//获取name为3的son
var {son: {son}} = person
console.log(son)//{name: '3'}
//或
var {son: {son: son1}}= person
console.log(son1)
```
# 4、对象中属性和方法的简写以及属性名的拼接
如果对象中的属性键名和值变量名相同的话，可以进行简写，例：
```javascript
var name = 'try',
    age = 21
var obj = {
  name: name,
  age: age
}
//可简写为
var obj = {
  name,
  age
}

属性名还可以通过以下方式拼接：
var lastName = 'b'
var obj = {
  ['a' + lastName] : 1 //即'ab': 1
}
```
对象中的方法的简写：
```javascript
var obj = {
  test: function() {}
  //可以简写为
  test() {}
 }
```
# 5、解构的隐式转换
解构对象为原始值时会调用其包装类进行包装为对象后再进行解构赋值。如果解构对象为null或者undefined，则无法进行隐式转换（因为这两个值没有包装类）。
```javascript
const [a, b, c, d, e] = 'hello'
console.log(a, b, c, d, e) //输出h e l l o

const {length} = 'hello'
console.log(length) //输出5
```
# 6、解构相关例题
```javascript
var x = 200, y = 300, z = 100
var obj1 = {x: {y: 42}, z: {y: z}}

;({y: x = {y: y}} = obj1) //在obj1中找不到键名为y的变量，于是将x变量赋值为默认值，即右侧的表达式，x = {y: 300}
console.log(x)// 输出{y: 300}
;({z: y = {y: z}} = obj1)
console.log(y)// 输出{y: 100}
;({x: z = {y: x}} = obj1)
console.log(z)// 输出{y: 42}
```
# 7、ES6中与arguments的冲突
详见5月份arguments篇
[arguments](https://www.yuque.com/gemini-usfau/wgzmtt/gop5pr?view=doc_embed)
补充：test.length属性在函数形参有默认值时，会根据第一个有默认值的形参的下标来决定，且如果有rest运算符表示的参数，也不会计入函数的length长度中。例：
```javascript
function test(a, b = 1, c) {
  console.log(test.length)
}
test() //输出1
function test(a = 1, b, c) {
  console.log(test.length)
}
test() //输出0
function test(a, b, c, ...d) {
  console.log(test.length)
}
test() //输出3
```
# 8、箭头函数
箭头函数表达式的语法比[函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function)更简洁，并且没有自己的[this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)，[arguments](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)，[super](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super)或[new.target](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new.target)（即不能作为构造函数使用）。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。
箭头函数的特点有：

1. 当箭头函数只有一个参数时，参数体可以不加括号
1. 当箭头函数内部只有一条表达式需要返回时，可以直接写返回体而不需要return

例：
```javascript
var func = a => 1
console.log(func()) //输出1
```
# 9、...（rest/spread运算符）收集剩余参数/展开参数
...(rest/spread)运算符允许我们将一个不定数量的参数表示为一个数组。rest运算符可以将一个数组进行收集，spread运算符可以将数组进行展开，例：
```javascript
//收集
function test(...args){
  console.log(args)
}
test(1, 2, 3) //输出[1, 2, 3]

//展开
let a = [2, 3, 4]
let b = [1, ...a, 5]
console.log(b) //输出[1, 2, 3, 4, 5]
```
还可以对...运算符的结果进行解构赋值：
```javascript
function foo(...[a, b, c]) { //此处相当于[a, b, c] = ...args
  console.log(a, b, c)
}
foo(1, 2, 3) //输出1 2 3
```
tips：...运算符只能在函数参数中处于最后一位，用于收集剩余参数，否则会报错：
```javascript
function foo(...a, b) {
  console.log(a, b)
}
foo(1, 2, 3) //报错 SyntaxError: Rest parameter must be last formal parameter
```
补充：在ES2017后，...运算符还可以作用于对象：
```javascript
var obj = {
  a: 1,
  b: 2
}
function test(o) {
  var res = {
    ...o
  }
  console.log(res)
}
test(obj) //{a: 1, b: 2}
```
# 10、函数名
在ES6中，访问函数的name属性会返回函数名，对象方法也是函数，因此也有name属性。
```javascript
function test(){}
console.log(test.name); // test

var obj = {
  say(){}
}
console.log(obj.say.name); // say
```
如果使用了getter或setter，则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。
```javascript
var obj = {
  get name() {},
  set name(newValue) {}
}

console.log(obj.name.name); //报错 TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'name');

console.log(descriptor.get.name); // get name
console.log(descriptor.set.name); // set name
```
有两种特殊情况：bind方法创造的函数，name属性返回bound加上原函数的名字；Function构造函数创造的函数，name属性返回anonymous。
```javascript
(new Function()).name // "anonymous"

var doSomething = function() {
  // ...
};
doSomething.bind().name // "bound doSomething"
```
# 11、Object对象上新增的方法
## 1、Object.freeze()、Object.isFrozen()
Object.seal()、Object.isSealed()
Object.preventExtensions()、Object.isExtensible()
详见：
[对象密封](https://www.yuque.com/gemini-usfau/wgzmtt/dqfgs0?view=doc_embed)
## 2、Object.is()
Object.is() 方法判断两个值是否为同一个值。时
详见：
[相等性判断和Object.is方法](https://www.yuque.com/gemini-usfau/wgzmtt/vaqg1c?view=doc_embed)
## 3、Object.assign()
Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象（不包括源对象的原型）。它将返回目标对象。
如果源对象的值为String类型和Symbol类型也会被拷贝。但getter/setter定义的属性只会拷贝最终值。
```javascript
var origin = {
  get foo () {
    return this._foo
  },
  set foo (value) {
    this._foo = value
  }
}

var target = Object.assign({}, origin)
console.log(target)//输出 {foo: undefined}
```
解决Object.assign中关于getter/setter定义的属性问题：
```javascript
var origin = {
  get foo () {
    return this._foo
  },
  set foo (value) {
    this._foo = value
  }
}

var target = Object.defineProperties({}, Object.getOwnPropertyDescriptors(origin))

```
## 4、Object.setPrototypeOf()、Object.getPrototypeOf()
Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  [null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)。返回值为被指定对象。
Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）。
如果Object.setPrototypeOf()的第一个参数为原始值，则不会进行操作。
# 12、Symbol、Symbol.for()、Symbol.keyFor()
## 1、Symbol
symbol 是一种基本数据类型 （[primitive data type](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)）。Symbol()函数会返回symbol类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"。
每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。
symbol类型的值可以通过String()和Boolean()转换为相应类型，但不能通过Number()转换为数值类型。而隐式转换只有在需要转换为Boolean类型值时才会生效。
几种给对象属性声明为Symbol值的方式：
```javascript
//第一种
var key = Symbol()
var obj = {}
obj[key] = 1
console.log(obj) // {Symbol(): 1}

//第二种
var key = Symbol()
var obj = {
  [key]: 1
}	
console.log(obj) // {Symbol(): 1}

//第三种
var key = Symbol()
var obj = {}
Object.defineProperty(obj, key, {
  value: 1
})
console.log(obj) // {Symbol(): 1}
```
## 2、Symbol.for()
Symbol.for(key) 方法会根据给定的键 key，来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。
## 3、Symbol.keyFor()
Symbol.keyFor(sym) 方法用来获取全局symbol 注册表中与某个 symbol 关联的键。
## 4、Symbol的遍历
对象中Symbol类型的键无法通过for...in遍历，为此有一个专门的API可以对Symbol类型的键进行遍历：Object.getOwnPropertySymbols() 方法返回一个给定对象自身的所有 Symbol 属性的数组。
# 13、迭代器（iterator）
在 JavaScript 中，迭代器是一个对象，它定义一个序列，并在终止时可能返回一个返回值。 更具体地说，迭代器是通过使用 next() 方法实现 [Iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol) 的任何一个对象，该方法返回具有两个属性的对象： value，这是序列中的 next 值；和 done ，如果已经迭代到序列中的最后一个值，则它为 true 。如果 value 和 done 一起存在，则它是迭代器的返回值。
实现迭代器：
```javascript
function myIterator = (arr) => {
  var nextIndex = 0
  return {
    next: () => {
      return nextIndex < arr.length ?
        { value: arr[nextIndex++], done: false } :
      	{ value: undefined, done: true }
    }
  }
}
```
### 可迭代协议
可迭代协议允许 JavaScript 对象定义或定制它们的迭代行为，例如，在一个 [for..of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 结构中，哪些值可以被遍历到。一些内置类型同时是[内置可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%86%85%E7%BD%AE%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%AF%B9%E8%B1%A1)，并且有默认的迭代行为，比如 [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) 或者 [Map](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/JavaScript/Reference/Global_Objects/Map)，而其他内置类型则不是（比如 [Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object))）。
要成为可迭代对象， 一个对象必须实现 @@iterator 方法。这意味着对象（或者它[原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)上的某个对象）必须有一个键为 @@iterator 的属性，可通过常量 [Symbol.iterator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) 访问该属性，该属性的值为一个无参函数，其返回值为一个符合迭代器协议的对象。
### 迭代器协议
迭代器协议定义了产生一系列值（无论是有限个还是无限个）的标准方式。当值为有限个时，所有的值都被迭代完毕后，则会返回一个默认返回值。
只有实现了一个拥有以下语义（semantic）的 next() 方法，一个对象才能成为迭代器：
next()方法的值为一个无参函数，返回一个格式为{ value: ..., done: ... }的对象。
# 14、模板字符串
模板字面量是允许嵌入表达式的字符串字面量。可以使用多行字符串和字符串插值功能。它们在ES2015规范的先前版本中被称为“模板字符串”。模板字符串可以包含特定语法（${expression}）的占位符。
## 标签模板
占位符中的表达式和周围的文本会一起传递给一个默认函数，该函数负责将所有的部分连接起来，如果一个模板字符串由表达式开头，则该字符串被称为带标签的模板字符串，该表达式通常是一个函数，它会在模板字符串处理后被调用，在输出最终结果前，你都可以通过该函数来对模板字符串进行操作处理。
例：
```javascript
var text = '<img src="QQ图片20210310221504.png"/>'
var message = test`<p>这是个img标签，不会加载为图片${text}</p>`
console.log(message)
function test(template, ...args) {
  var template = template.join('')
  for (var i = 0; i < args.length; i++) {
    var str = args[i]
    template += str.replace(/</, '&lt')
  }
  return template
}
var p = document.createElement('p')
p.innerHTML = message
document.body.append(p) //因为img标签的<被转为实体，所以不会js引擎不会将其解析为DOM元素，因此不会加载为图片
```
# 15、set和map
## 1、set
Set 对象允许你存储任何类型的唯一值，无论是[原始值](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)或者是对象引用。可通过new操作符实例化一个set对象。
Set对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set中的元素只会出现一次，即 Set 中的元素是唯一的。
可以在实例化Set对象时，给set构造函数传入可迭代对象作为Set对象的初始值。

Set原型下的属性：
### Set.prototype.size
返回Set对象中元素的个数。

set下常用的方法：
### Set.prototype.add()
方法用来向一个 Set 对象的末尾添加一个指定的值。返回值为Set对象本身。
### Set.prototype.delete()
该方法可以删除Set对象中的指定元素。删除成功返回true，删除失败返回false。
### Set.prototype.clear()
该方法可以清空Set对象中的所有元素。返回值为undefined。
### Set.prototype.has()
该方法会返回一个布尔值，来表示对应值是否在该Set对象中。
### Set.prototype.values()
 该方法按照元素插入顺序返回一个具有 Set 对象每个元素值的全新 Iterator 对象。
keys() 方法是这个方法的别名；他们的行为一致，都是返回Set 对象中的元素值。
### Set.prototype.entries()
该方法返回一个新的迭代器对象 ，这个对象的元素是类似 [value, value] 形式的数组，value 是集合对象中的每个元素，迭代器对象元素的顺序即集合对象中元素插入的顺序。每一个 entry 的 key 和 value 都拥有相同的值。
### Set.prototype.forEach()
该方法会根据集合中元素的插入顺序，依次执行提供的回调函数。回调函数的三个参数分别为（item, index, Set对象本身）。
## 2、map
Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者[原始值](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)) 都可以作为一个键或一个值。
可以在实例化Map对象时，给Map构造函数传入可迭代对象作为Map对象的初始值。例：
```javascript
var map = new Map([['name', 'www'], ['age', '12']]);
```
Map原型下的属性：
### Map.prototype.size
返回Map对象中元素的个数。

Map原型下的方法：
### Map.prototype.set()
设置Map对象中键的值。返回该Map对象。
### Map.prototype.get()
返回键对应的值，如果不存在，则返回undefined。
### Map.prototype.delete()
删除相应元素（参数为键名），删除成功返回true，删除失败返回false。
### Map.prototype.has()
该方法会返回一个布尔值，来表示对应值是否在该Map对象中。
### Map.prototype.keys()
返回一个新的 Iterator对象， 它按插入顺序包含了Map对象中每个元素的键 。
### Map.prototype.values()
返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的值 。
### Map.prototype.entries()
返回一个新的 Iterator 对象，它按插入顺序包含了Map对象中每个元素的 [key, value] 数组。
### Map.prototype.forEach()
按插入顺序，为 Map对象里的每一键值对调用一次callbackFn函数。如果为forEach提供了thisArg，它将在每次回调中作为this值。
# 16、WeakSet和WeakMap
WeakSet和WeakMap分别为弱集合和弱映射。两者的原型上都没有迭代方法，且在垃圾回收机制中，键值不会被计入引用。WeakMap多用于弱引用存值和存储私有变量。
WeakMap的键名只能为引用值，键值可以为任意值。WeakSet的值只能为引用值。
基于WeakMap的弱引用，可以用来实现事件处理函数的撤销，防止内存泄漏：
```javascript
var oBtn = document.getElementById('btn')
function handleBtnClick () {}

//传统撤销引用方法
oBtn.addEventListener('click', handleBtnClick, false)
oBtn.remove()
handleBtnClick = null

//利用WeakMap的方法
const oBtnMap = new WeakMap()
oBtnMap.set(oBtn, handleBtnClick)
oBtn.addEventListener('click', oBtnMap.get(oBtn), false)
oBtn.remove()	//当oBtn被清除时，WeakMap中相应键名会失去该值的引用，则对应键值的引用也会被垃圾清除机制回收。
```
# 17、Proxy
Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。例：
```javascript
var host = { name: 'star', age: 21 }
var handler = {
  //获取host属性时的拦截
  get: function(target, key) {
    if (key === 'age') {
      return 20
    }
    return target[key]
  },
  //使用in操作符判断时的拦截，不能拦截for...in...
  has: function(target, key) {
    if (key === 'age') {
      return false
    } else if (target.hasOwnProperty(key)) {
    	return true
    }
  }
}
var agent = new Proxy(host, handler)
console.log(agent.name) //star
console.log(agent.age) //20
console.log('name' in agent) //true
console.log('age' in agent) //false
```
其中handler对象通常以函数作为属性，各属性中的函数分别定义了在执行各种操作时代理 agent 的行为。如get、set、has等函数，可以在这些函数中定义对于host对象进行相应操作时的拦截处理。
tips：Proxy构造函数没有[[prototype]]内部插槽，所以实例化出来的对象，其__proto__指向的是target对象的__proto__。
# 18、Reflect
Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与[proxy handlers](https://wiki.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)的方法相同。Reflect不是一个函数对象，因此它是不可构造的。Reflect的所有属性和方法都是静态的。
# 20、Class
class 声明创建一个基于原型继承的具有给定名称的新类。有两种方式可以声明类，一种是类表达式，一种是类声明。

- JS中的类建立在原型上
- 类的声明不可提升。
- 类声明和类表达式的主体都执行在[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下。比如，构造函数，静态方法，原型方法，getter和setter都在严格模式下执行。
## 1、Class与ES5中构造函数的区别

- class只能通过new操作符进行实例化，当做函数调用会报错。
- class中绑定到原型上的方法不可枚举，ES5中绑定到原型上的方法可以枚举。
- class存在TDZ（暂时性死区），ES5中构造函数不存在TDZ。
- class中默认为严格模式。
## 2、构造函数
在class中可以定义一个特殊的方法：constructor。该方法用于创建和初始化一个由class创建的对象。可以看做是ES5中的构造函数。其返回值如果为原始值，不会影响实例化结果，如果返回值为一个新的引用值，则该引用值会作为实例化对象，这点也与ES5的构造函数相同。

- 一个类只能有一个constructor方法，有多个会报错（SyntaxError）。
- 一个构造函数可以使用 super 关键字来调用一个父类的构造函数。
- 如果没有指定constructor方法，会在class中默认生成一个constructor方法。
## 3、静态方法
[static](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/static) 关键字用来定义一个类的一个静态方法。调用静态方法不需要[实例化](https://developer.mozilla.org/zh-CN/docs/conflicting/Learn/JavaScript/Objects#the_object_(class_instance))该类，但不能通过一个类实例调用静态方法。静态方法通常用于为一个应用程序创建工具函数。
## 4、class的声明
```javascript
//类Example
class Example {
  //构造函数
  constructor(name, age) {
    //定义了两个私有属性name和age
    this.name = name
    this.age = age
  }

  //公有属性，相当于定义在Example.prototype上，不可枚举
  say() {

  }

  //私有属性，相当于在constructor中定义了this.gender = 'male'（ES2017中推出的写法）
  gender = 'male'

  //静态属性，相当于直接在Example类下定义了一个属性，可通过Example.语法访问
  static ExampleTest() {
    console.log('this is an example')
  }
}
```
## 5、类的继承（extends）
[extends](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/extends) 关键字在 类声明 或 类表达式 中用于创建一个类作为另一个类的一个子类。
如果子类中定义了constructor，那么它必须在constructor中先调用 super() 才能使用 this 。子类还会继承父类的静态方法。
## 6、super
[super](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super) 关键字用于调用对象的父对象上的函数（不能调用父对象上的静态方法）。super关键字除了可以在class中构造函数指向父类外，还可以在对象中的方法内指向自己的原型。super的内部其实是将父类的属性和方法绑定到子类中，即super()相当于Parent.call(this)，但class中的子类的this必须先调用super()才能形成。
```javascript
//class中指向父类
class Parent {
  say() {
    console.log("parent's function")
  }
}
class Children extends Parent {
  constructor(lastName) {
    super().say()
    this.age = 21
  }
}
new Children() //parent's function


//对象中指向原型
var pro = {
  say() {
    console.log("pro's function")
  },
  name: 'pro'
}
var obj = {
  //只能在ES6的简写方法中可以调用super
  trySay() {
    super.say() //pro's function
    console.log(super.name) //pro
  }
}
Object.setPrototypeOf(obj, pro)
obj.trySay()

```
## 7、new.target
new本身是从构造函数生成实例对象的命令。在ES6中，new命令引入了target属性，该属性一般用在构造函数中，返回new命令作用于的构造函数，如果不是该构造函数不是通过new命令或Reflect.construct()调用,则new.target会返回undefined，因此可以利用该属性用来确定构造函数的调用方式。new.target只能在函数内部使用，且在子类继承父类时，new.target会返回子类。
```html
class Parent {
  constructor() {
    if (new.target === Parent) {
     throw new Error('本类不能被实例化')
    }
  }
}

var person = new Parent() //报错
```
# 21、装饰器
装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。装饰器相关联的设计模式是装饰器模式。
装饰器是一种函数，写成@ + 函数名。它可以放在类和类方法的定义前面。
当放在类前时，该函数的参数只有一个，即目标类。
当放在类方法前时，该函数的参数有三个，分别为目标类的原型、类方法名、类方法的descriptor属性。
当放在静态方法前时，该函数的参数有三个，分别为目标类、类方法名、类方法的descriptor属性。

装饰器的行为相当于：
```javascript
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
```
装饰器的应用：
```javascript
function classExample(target) {
  console.log(target) //class Example，转译输出后为Example构造函数
}

function testThink(target, name, descriptor) {
  console.log(target, name, descriptor) //Example.prototype "think" {writable: true, enumerable: false, configurable: true, value: ƒ think()}
}

let testSay = (type) => {
  return function(target, name, descriptor) {
    let _value = descriptor.value //获取到装饰的目标方法
    descriptor.value = (...args) => {
      _value.apply(target, args)  //将this指向还原到目标的原型
    }

    console.log(`方法${name}正在进行“${type}”类型的操作...`)
  }
}

@classExample
class Example {
  constructor() {
    this.name = 'wbk'
  }

  @testThink
  think(){}

  @testSay("说")
  say() {}
}

new Example().say() //方法say正在进行“说”类型的操作...

```
# 22、Promise
在ES5中，在进行异步操作时通常需要进行回调，而当多次回调后就会造成回调地狱，会有难以维护，不便拓展等劣势，且异步操作中的错误难以被try...catch...捕获。
所以在ES6中，新增了原生对象Promise，Promise 对象用于表示一个异步操作的最终完成 (或失败)及其结果值。
一个 Promise 对象代表一个在这个 promise 被创建出来时不一定已知的值。它让您能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。 这样使得异步方法可以像同步方法那样返回值：异步方法并不会立即返回最终的值，而是会返回一个 promise，以便在未来某个时候把值交给使用者。
Promise对象有三种状态：

- 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（fulfilled）: 意味着操作成功完成。
- 已拒绝（rejected）: 意味着操作失败。

Promise对象的状态不受外界影响，且状态不可逆（一经改变不可更改）
### JS中异步代码的宏任务与微任务
在JS中，微任务有Promise与Node中的process.nextTick()，其余大部分异步代码都是宏任务，微任务的优先级相对宏任务更高。
```javascript
setTimeout(() => {
  console.log('time')
})
Promise.resolve().then(() => {
  console.log('pro')
})

//先执行Promise，再执行setTimeout
```
### Promise的链式调用
then() 函数会返回一个和原来不同的新的 Promise对象，所以可以通过链式调用Promise来替代之前ES5中的回调。
then()函数中也可以接收第二个回调函数，作为rejected状态的回调。
如果then()函数中参数为空，则该then()函数会被忽略，不影响Promise链式调用的结果。
```javascript
//回调地狱
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);


//Promise实现
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
```
### 错误传递
.catch()可以捕获Promise链上的错误（捕获在.catch()之前的Promise链），且.catch()中也会返回一个新的Promise对象。
通常，一遇到异常抛出，浏览器就会顺着 Promise 链寻找下一个 onRejected 失败回调函数或者由 .catch() 指定的回调函数。
```javascript
Promise.reject('第一个错误').then(() => {
  console.log('第一个then不会执行')
}).catch(err => {
  console.log(err)
}).then(() => {
  console.log('第二个then可以执行')
  throw new Error('第二个错误')
}).then(() => {
  console.log('hhh')
}, err => {
  console.log('第三个then中处理的错误:' + err)
}).catch(err => {
  console.log(err)
}).then(() => {
  console.log('第四个then')
})

//输出
第一个错误 （第4行）
第二个then可以执行	（第6行）
第三个then中处理的错误:Error: 第二个错误	（第11行）
第四个then	（第15行）
```
### 状态固化
Promise对象的状态只有两个过程（pending -> fulfilled）和（pending -> rejected），一旦经历了状态改变的过程，最终状态就决定了并不再改变，即只会走相应的处理函数（fulfilled状态走then()，rejected走catch()）。
```javascript
var pro = new Promise((resolve, reject) => {
  resolve('ok')
  console.log(a) //此处本应报错 ReferenceError，因为Promise对象状态的改变，该代码会执行，但错误不会被捕获
})
pro.then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})

//输出
ok
```
### Promise.all
Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)实例， 输入的所有promise的resolve回调的结果是一个数组。这个[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)的resolve回调执行是在所有输入的promise的resolve回调都结束，或者输入的iterable里没有promise了的时候。它的reject回调执行是，只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，并且reject的是第一个抛出的错误信息。
```javascript
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  },3000)
})
var p2 = new Promise((resolve, reject)  => {
  resolve('p2')
})
var resultSet = Promise.all([p1, p2])
resultSet.then(res => {
  console.log(res) //['p1', 'p2']
})


var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  },3000)
})
var p2 = new Promise((resolve, reject)  => {
  resolve('p2')
})
var p3 = new Promise((resolve, reject) => {
  reject('p3')
})
var resultSet = Promise.all([p1, p2, p3])
resultSet.then(res => {
  console.log(res)
}).catch(err => {
  console.log(err) //'p3'
})
```
### Promise.race
Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
```javascript
var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  },3000)
})
var p2 = new Promise((resolve, reject)  => {
  resolve('p2')
})
var resultSet = Promise.race([p1, p2])
resultSet.then(res => {
  console.log(res) //'p2'
})
```
### Promise.resolve
Promise.resolve(value)方法返回一个以给定值解析后的[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 对象。如果这个值是一个 promise ，那么将返回这个 promise ；如果这个值是thenable（即带有["then"](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；否则返回的promise将以此值完成。此函数将类promise对象的多层嵌套展平。
```javascript
var obj = {
  then(resolve, reject) {
    resolve('obj')
  }
}
Promise.resolve(obj).then(res => console.log(res)) //'obj'
```
### 封装：将函数用Promise包装
Node中的util模块中也有该方法（promisify），可用util.promisify调用

```javascript
function Promisify(func) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      func(...args, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}
```
### 实现Promise
Promise雏形：
```javascript
function MyPromise (fn){
  var value = undefined,
      state = 'pending'

  fn(resolve)
  function resolve(newValue) {	//模拟Promise对resolve函数的处理，修改闭包内的值。
    value = newValue
    state = 'Resolved'
  }

  function handle(onResolved) { //执行then()方法中传入的回调函数。
    onResolved(value)
  }

  this.then = function(onResolved) {
    // handle(onResolved)
    onResolved(value)
  }
}
var pro = new MyPromise((resolve) => {
  resolve('Promise success')
})
pro.then(data => {
  console.log(data)
})
```
Promise实现链式调用：
```javascript
function MyPromise (fn){
  var value = undefined,
      state = 'pending'

  fn(resolve)
  function resolve(newValue) {
    value = newValue
    state = 'Resolved'
  }

  function handle(handler) {
    if (handler.onResolved == undefined) {
      return
    }
    
    //执行then()中传入的回调函数，将回调函数返回值作为传入下一个then()方法中回调函数的参数。
    var returnValue = handler.onResolved(value)
    handler.resolve(returnValue)
  }

  this.then = function(onResolved) {
    return new MyPromise(function(resolve) {
      handle({
        onResolved: onResolved,
        resolve: resolve
      })
    })
  }
}
var pro = new MyPromise((resolve) => {
  resolve('Promise success')
})
pro.then(data => {
  console.log(data) //Promise success
  return 989
}).then(data => {
  console.log(data) //989
})
```
最终版：
```javascript
function MyPromise (fn){
  var value = undefined,
      state = 'pending'

  fn(resolve, reject)
  function resolve(newValue) {
    try {
      if (typeof newValue === 'object' && newValue.constructor === MyPromise) {
        newValue.then(resolve)
        return
      }
      value = newValue
      state = 'Resolved'
    } catch(e) {
      reject(e)
    }
  }

  function reject(reason) {
    value = reason
    state = 'Rejected'
  }

  function handle(handler) {
    setTimeout(function() {
      var handlerCallback = state === 'Resolved' ? handler.onResolved : handler.onRejected
      if (!handlerCallback) {
        if (state === 'Resolved') {
          handler.resolve(value)
        } else {
          handler.reject(value)
        }
        return
      }

      try {
        var returnValue = handlerCallback(value)
      } catch(e) {
        handler.reject(e)
        return
      }

      handler.resolve(returnValue)
    })
  }

  this.then = function(onResolved, onRejected) {
    return new MyPromise(function(resolve, reject) {
      handle({
        onResolved: onResolved,
        onRejected: onRejected,
        resolve: resolve,
        reject: reject
      })
    })
  }
}
```
总结思路：利用闭包的特性，将每一次Promise对象的状态和值保存，将本次Promise对象的handle函数传入下一个Promise对象中，在下一个Promise对象中执行的handle函数可以读取到上一个Promise的状态和值后进一步处理。
# 23、生成器
生成器对象是由一个 [generator function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*) 返回的,并且它符合[可迭代协议和迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)。
生成器的声明方式同普通函数相似，但在function关键字后面需添加一个 * 号。例：
```javascript
//两种方式皆可，*号只需保证在function关键字和函数名中间即可
function* test() {
  yield 'a'
  yield 'b'
  return 'c'
}

var test = function* (){
  yield 'a'
  yield 'b'
  return 'c'
}
```
yield关键字只在生成器中生效，用来暂停和恢复一个生成器函数。在生成器函数执行时，一旦遇到 yield 表达式，生成器的代码将被暂停运行，直到生成器的 next() 方法被调用。如果将参数传递给生成器的next()方法，则该值将成为生成器当前yield操作返回的值。生成器中return的效果与yield相同，但会结束函数执行，并将done值转为true。
```javascript
function* test() {
  let value1 = yield 'a'
  console.log('value1 = ' + value1)
  let value2 = yield 'b'
  console.log('value2 = ' + value2)
  return 'c'
}

var iter = test()
console.log(iter.next())
console.log(iter.next('1')) //该处的'1'作为当前已执行的yield表达式的返回值，当前已执行的yield为第2行的yield
console.log(iter.next('2'))
```
### generator.prototype.return
return() 方法返回给定的值并结束生成器，结果与生成器中进行return操作相同。
```javascript
function *test() {
  yield 1
  yield 2
  yield 3
}
var iter = test()
console.log(iter.next()) //{ value: 1, done: false }
console.log(iter.return('End')) //{ value: 'End', done: true }
console.log(iter.next()) //{ value: undefined, done: true }
```
### generator.prototype.throw
向生成器抛出一个错误，可在生成器内捕获该错误。如果错误被捕获，则生成器内会继续执行，直到下一个yield操作或return。
```javascript
function *test() {
  try{
    yield 1
  }catch(e) {
    console.log(e)
  }
  yield 2
  yield 3
}
var iter = test()
console.log(iter.next()) //{ value: 1, done: false }
console.log(iter.throw(new Error())) // Error { value: 2, done: false }
console.log(iter.next())// { value: 3, done: false }
```
### 案例：利用生成器实现文件依次读取
```javascript
const fs = require('fs')
function Promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}
var readFile = Promisify(fs.readFile)

function *read() {
  let value1 = yield readFile('1.txt', 'utf-8')
  let value2 = yield readFile(value1, 'utf-8')
  yield readFile(value2, 'utf-8')
}

let iter = read()
·················································此区域块可封装为下方的Promise对象
let { value } = iter.next()
value.then(data => {
  let { value } = iter.next(data) 
  value.then(data => {
    let { value } = iter.next(data) 
    value.then(data => {
      console.log(data) //输出第三次yield操作返回的值
    })
  })
})
···················································
function total(iter) {
  return new Promise((resolve, reject) => {
    let next = function (iter, data) {
      let { value, done } = iter.next(data)
      if (!done) 
        value.then(data => {
          next(iter, data)
        })
      else
        resolve(data)
    }
    next(iter)
  })
}
var res = total(iter)
res.then(data => {
  console.log(data)
})
```
# 24、async函数
async函数是使用async关键字声明的函数。 async函数是[AsyncFunction](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)构造函数的实例， 并且其中允许使用await关键字。async和await关键字让我们可以用一种更简洁的方式写出基于[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)的异步行为，而无需刻意地链式调用promise。
async函数可能包含0个或者多个[await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)表达式。await表达式会暂停整个async函数的执行进程并出让其控制权，只有当其等待的基于promise的异步操作被兑现或被拒绝之后才会恢复进程。promise的解决值会被当作该await表达式的返回值。使用async / await关键字就可以在异步代码中使用普通的try / catch代码块。
async函数会返回一个Promise对象。
例：
```javascript
var num = 0
function promise() {
  return new Promise((resolve, reject) => {
    resolve(++num)
  })
}


async function test() {
  let res = await promise()
  let res2 = await promise()
  return res2
}
test().then(data => console.log(data))  //2
```
