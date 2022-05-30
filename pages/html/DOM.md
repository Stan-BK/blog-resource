DOM的全称是Document Object Model（文档对象模型），DOM本身是对象，但它是宿主对象，因为它需要浏览器提供一系列的方法，而不是ECMAScript。DOM是浏览器提供的表示或者操作html和xml的一套方法（无法操作CSS）。在JS中，对于操作的HTML部分称之为DOM结构（DOM树）。
# 1、document
每个载入浏览器的 HTML 文档都会成为 Document 对象，里面存放了一系列获取和操作DOM树的方法。
# 2、获取元素
getElementById()    获取相应id的元素
getElementsByName()    获取相应name的元素（不常用）
getElementsByClassName()    获取包含相应类名的元素（取得结果是一个类数组）
getElementsByTagName()    获取相应标签的元素（取得结果是一个类数组，兼容性高）
querySelector()    querySelectorAll() （HTML5新引入的WEB API，兼容性高，其括号内参数选择元素的方法与css选择器相同，前者只会选择单项，后者可选择多项（类数组），但这两个方法的性能较差，且不实时，即其选择后存储的是片段而不是节点本身）
例：
var divs1 = document.getElementsByTagName('div');
var divs2 = document.querySelectorAll('div');
console.log(divs1);//输出[div, div, div]
console.log(divs2);//输出[div, div, div]
divs1[0].remove();
divs2[0].remove();
console.log(divs1);//输出[div, div]
console.log(divs2);//输出[div, div, div]
# 3、节点和遍历节点树
节点不是元素，而是包含着元素。节点包含了元素节点，属性节点，文本节点，注释节点，document节点，DocumentFragment节点。每一种节点都有相对应的节点号。元素节点也就是DOM元素。
### 1、遍历节点树（兼容性高）
parentNode（父节点）每个节点有且只有一个父节点（除了顶级的document），HTML的父节点是document。
childNodes（子节点）每个元素可以有多个子节点，通过该属性选择出的子节点可能包含多种类型节点（即文本节点注释节点等）。
firstChild    lastChild 前者为第一个子节点，后者为最后一个子节点。
nextSibling    previousSibling 前者为下一个兄弟节点，后者为上一个兄弟节点。
### 2、遍历元素节点树（不常用）
parentElement（父元素）节点的父元素，HTML没有父元素。（IE9以下不支持）
children（子元素） 选择子元素。childElementCount = children.length（IE7以下不支持）
firstElementChild    lastElementChild 前者为第一个子元素，后者为最后一个子元素。（IE9以下不支持）
nextElementSibling    previousElementSibling 前者为下一个兄弟元素，后者为上一个兄弟元素。（IE9以下不支持）
# 4、节点属性
nodeName    节点名称，只读属性，元素节点返回的结果为大写。
nodeValue    节点的值，读写属性，属性、注释、文本节点可用，元素节点没有该属性。
getAttributeNode    获取属性节点，读写属性。
nodeType    节点对应的节点类型号，只读属性。元素节点为1，属性节点为2，文本节点为3，注释节点为8，document为9，DocumentFragment为11.
利用nodeType可以筛选出childNodes中的元素节点：
function elementChild (node) {
      var arr = [],
          children = node.childNodes
      for (var i = 0; i < children.length; i++) {
        var childItem = children[i]
        if (childItem.nodeType === 1) {
          arr.push(childItem)
        }
      }
      return arr
}
attributes    节点的属性集合，读写属性。
hasChildNodes（）    判断是否有子节点。
# 5、DOM的原型链
document（XML）构造函数 -> XMLDocument
document（HTML）  构造函数 -> HTMLDocument
HTMLDocument 构造函数 -> Document
document.__proto__.__proto__=Document
各变量的构造函数如图：
![QQ图片20210310221504.png](https://cdn.nlark.com/yuque/0/2021/png/12536926/1615385719321-31c9d5bf-a370-419a-95e7-0e01e940b06c.png#crop=0&crop=0&crop=1&crop=1&height=652&id=KmuzJ&margin=%5Bobject%20Object%5D&name=QQ%E5%9B%BE%E7%89%8720210310221504.png&originHeight=652&originWidth=1160&originalType=binary&ratio=1&rotation=0&showTitle=false&size=829827&status=done&style=none&title=&width=1160)
Dom结构树的顶层为Node。
Document构造函数下有两个子类，分别为XMLDocument和HTMLDocument。Element构造函数同理。
可以通过Object.prototype.toString.call()方法来判断节点类型。
例：
var div = document.getElementsByTagName('div')[0]
console.log(Object.prototype.toString.call(div))
console.log(Object.prototype.toString.call(div))//输出[object HTMLDivElement]
# 6、DOM操作深入
### 1、getElementById()、getElementsByName()
只有Document的原型上有这两个方法，Element的原型上没有。
### 2、getElementByTagName()、getElementsByClassName()、querySelector()、querySelectorAll()
Document和Element两者的原型上都有这些方法。
### 3、*通配符
*通配符只能作用于getElementsByTagName('*')，会选择出所有标签。
### 4、document.body和document.head
两者可分别选出body和head元素，两属性在HTMLDocument的原型上。
### 5、document.title
返回title标签中的文本而不是整个title元素。
### 6、document.documentElement
返回整个HTML文档，该属性在Document的原型上。
### 7、document.createDocumentFragment
创建文档片段（碎片）
在需要循环给文档添加多个节点时，浏览器渲染引擎需要多次重新去测算html的节点位置、几何数据（即回流），会大量消耗浏览器引擎的性能。所以可以通过创建文档片段来存储需要添加的若干个节点，再一次性添加到文档中，文档片段不会生成额外的节点。
# 7、创建、添加和删除节点
createElement()    该方法可以创建元素节点，为Document原型下的方法。
createTextNode()    该方法可以创建文本节点，为Document原型下的方法。
createComment()    该方法可以创建注释节点，为Document原型下的方法。
appendChild()    该方法可以给节点增加子节点，排在所有子节点之后，为Node原型下的方法。该方法还可以剪切节点。
insertBefore()    该方法可以在插入子节点，为Node原型下的方法。例：c.insertBefore(a, b)//在父节点c下的子节点b之前插入a节点
removeChild()    该方法可以删除子节点，返回被删除的子节点（只是在文档中删除，该节点仍存在于内存中为被销毁，为Node原型下的方法。例：b.removeChild(a)//父节点b删除子节点a
remove()    该方法可以使节点删除自身（不仅从文档中删除，也在内存中销毁）。
replaceChild()    该方法可以替换节点。例： c.replaceChild(new, origin)//父节点下的origin节点被new节点替换
# 8、元素节点的属性和方法
innerHTML    节点的内容（包含标签），可读写属性，为Element原型下的属性。
innerText    节点的内容（不包含标签），为HTMLElement原型下的属性。
setAttribute    给节点设置属性。
getAttribute    获取节点相应属性的值。
扩展知识：HTML5给元素节点添加了一个新属性为data-*（自定义属性），可以通过.dataset来访问该属性集合
例：<p    data-name="wbk"    data-age="21"></p>
var  p = document.getElementsByTagName('p')[0]
p.dataset//为一个对象集合，拥有name：wbk属性和age：21属性
# 9、滚动距离与高度
### 1、查看滚动条距离（网页滚动的距离）
常规：window.pageXoffset和window.pageYoffset（IE9/IE8以下不支持）
document.body.scrollLeft/scrollTop
document.documentElement.scrollLeft/scrollTop（Chrome不支持）
不常见：window.scrollX/scrollY
兼容性问题：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/12536926/1617012363515-c265f9cc-abc2-46c2-b0ab-3b1fc09c4dc5.png#crop=0&crop=0&crop=1&crop=1&height=104&id=tLLN5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=208&originWidth=750&originalType=binary&ratio=1&rotation=0&showTitle=false&size=161691&status=done&style=none&title=&width=375) 
封装解决兼容性问题：
```javascript
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}
```
### 2、浏览器可视区域的尺寸（窗口的宽高）
常规：window.innerWidth/innerHeight
document.documentElement.clientWidth/clientHeight（兼容IE9/IE8及以下，标准模式可用）
document.body.clientWidth/clientHeight（兼容IE9/IE8及以下，怪异模式可用）
扩展：window.outerWidth/outerHeight（包含浏览器工具栏等的窗口宽高）
封装解决兼容性问题：
```javascript
function getViewPortSize() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    if (document.compatMode === 'BackCompat') {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}
```
### 3、页面可滚动距离和页面大小之和
document.body.scrollWidth/scrollHeight
document.documentElement.scrollWidth/scrollHeight
封装解决兼容性问题：
```javascript
function getScorllSize() {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}
```
### 4、获取元素在文档中的位置及大小等属性
getBoundingClientRect()    元素节点对象可调用，返回位置及大小各属性
### 5、元素节点在文档中的位置偏移量细节
元素节点对象使用offsetLeft/offsetTop属性时，获取的距离是基于该元素的定位而言的，如果该元素的父级定位元素存在，则距离值基于父级元素计算，否则一直找到body元素为止，可以使用offsetParent属性获得父级定位元素。
封装方法以获得元素在窗口的位置：
```javascript
function getElemDocPosition(el) {
  var parent = el.offsetParent,
      offsetLeft = el.offsetLeft,
      offsetTop = el.offsetTop

  while (parent) {
    offsetLeft += parent.offsetLeft
    offsetTop += parent.offsetTop
    parent = parent.offsetParent
  }
}
```
### 6、操作滚动条
window.scroll(x, y)/window.scrollTo(x, y)    可以使页面滚动到相应位置
window.scrollBy(x, y)    可以使页面基于当前位置继续滚动该偏移量
# 10、鼠标行为坐标系
clientX/Y    鼠标位置相当于当前可视区域的坐标（不包括滚动条的距离）
layerX/Y    同pageX/Y相同（IE11以下同clientX/Y）
screenX/Y    鼠标位置相对于屏幕的坐标
X/Y    同clientX/Y相同（Firefox不支持）
pageX/pageY    鼠标位置相对于当前文档的坐标（包括滚动条的距离）（IE9以下不支持）
offsetX/Y    鼠标位置相对于块元素的坐标（包含边框，safari不包括边框）
clientLeft/clientTop    文档偏移量（如浏览器中默认的margin： 8px/12px）
封装解决pageX/Y的兼容性问题：
```javascript
function pagePos(e) {
  var sLeft = getScrollOffset().left,
      sTop = getScrollOffset().top,
      cLeft = document.documentElement.clientLeft || 0,
      cTop = document.documentElement.clientTop || 0
  
  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop
  }
}
```

# 11、浏览器的怪异模式和标准模式
浏览器有各自的兼容性模式，都是默认向后兼容的。
使用document.compatMode可以获取到兼容模式。分为怪异模式（BackCompat）和标准模式（CSS1Compat）。怪异模式为浏览器自己定义的兼容规范，浏览器一般向后兼容五个版本。标准模式为W3C组织的兼容规范。在文档中加入<!DOCTYPE  html>则表示该文档需遵循W3C组织的兼容规范。
# 12、DOM间接操作CSS
DOM不能直接操作样式表，当改写style属性时，实际上是改写节点的style属性，改写后的style属性是行内样式。
### 1、操作细节
通过style属性改写的css属性是可读写的，style下的属性名因遵循小驼峰，且值必须为字符串，复合值需进行拆解赋值，如border属性，需拆解为borderWidth，borderStyle和borderColor。某些css属性在js中属于保留字，如float，需改写为cssFloat。
### 2、访问获取css属性
1、通过style访问
访问一个节点对象的style属性，会返回这个节点对象可设置的css属性值，各css属性值默认为空字符串。
2、通过getComputedStyle()访问（查看计算样式）
window.getComputedStyle（element，null）可以访问到element节点的css各属性的绝对值（如em单位换算为px单位）。IE8及以下不支持该方法，支持currentStyle属性。getComputedStyle()方法的第二个参数可以填伪元素的名称，就能获取到伪元素的css属性（只读），操作伪元素只能通过加上css的类。
封装解决兼容性问题：
```javascript
function getStyles(elem, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return window.getComputedStyle(elem, null)[prop]
    } else {
      return window.getComputedStyle(elem, null)
    }
  } else {
    if (prop) {
      return elem.currentStyle[prop]
    } else {
      return elem.currentStyle
    }
  }    
}
```
