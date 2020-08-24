# 面试

## 1. 请实现一个sum函数，实现数字累加

示例：
sum(1)(2)(3) // 6

let foo = sum(6)
foo(7)(8) // 21

```js
console.log('Hello World!');
function sum (number) {
    this.value = number
    var result = this.value
    var t = function (add)  {
        this.toString = () => {
            return result
        }
        return sum(add + result)
    }
    return t
}
console.log(sum(1)(2)(3))
```

## 2. 给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值

如果数组元素个数小于 2，则返回 0。

示例 1:
输入: [3,6,9,1] ，输出: 3
解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。

示例 2:   输入: [10] , 输出: 0
解释: 数组元素个数小于 2，因此返回 0。

```js
let arr = [3,6,9,1];
function f (arr) {
    let result = 0
    if (arr.length >= 2) {
        let sortArr = sortFun(arr)
        for(let i = sortArr.length; i > 0; i--) {
            let number = sortArr[i] - sortArr[i-1]
            if(number > result){
                result = number
            }
        }
    }
    return result
}
function sortFun(arr) {
    // 排序返回新的数组
}
```

## 3. Array.prototype.myReduce =

```js
console.log('Hello World!');
Array.prototype.myReduce = function (fun, item) {
    let len = this.length
    let result = this[0]
    if (item) {
        result = fun(item,this[0])
    }
    for(let i = 0; i < len; i++){
        result = fun(result,this[i+1])
    }
    return result
}
arr.reduce((pre,next)=>{
    return pre + next
})
```

## 4. 重排

```js
domA.style.width = (domA.offsetWidth + 1) + 'px'
domB.style.width = (domB.offsetWidth + 1) + 'px'
domC.style.width = (domC.offsetWidth + 1) + 'px'

var num1 = domA.offsetWidth;
var num2 = domB.offsetWidth;
var num3 = domC.offsetWidth;

domA.style.width = num1 + 1
domA.style.width = (domA.offsetWidth + 1) + 'px'
domB.style.width = (domB.offsetWidth + 1) + 'px'
domC.style.width = (domC.offsetWidth + 1) + 'px'
```

## 5. sum

```js
function sum (a,b) {
}

11 3
101 5
^ 110
& 111
| 001
!11  00

11 >> 1 1
11 << 110 6

11 ^ 101 = 110
11 & 101 = 111


110 >> 0
0 -> 111 >> 1 进位 0
0 -> 110 >> 0 0

11 >> 1
```

## 6. 未重复出现的字符串

```js
/*
现有一个含有字符串的数组，形如：
["ab","c","ab","d","c"]
要求将其中出现的重复字符串，依次添加上数字序号，如：
["ab1","c1","ab2","d","c2"]
要求：
1. 未重复出现的字符串不处理；
2. 仅对相同的一组字符串依次添加序号，而不是共用一组序号；
3. 保持原数组顺序；
*/
function addSerial(arr) {
    var result = []
    // do something
    return result
}
console.log(addSerial(["ab", "c", "ab", "d", "c"]));


function addSerial(arr) {
    var result = []
    // do something
    let len = arr.length
    let obj = {}
    for(let i = 0; i < len; i++) {
        if (obj[arr[i]]) {
            obj[arr[i]].number++;
            arr[i] = arr[i] + obj[arr[i]].number;
        } else {
            obj[arr[i]] = {};
            obj[arr[i]].number = 1;
            obj[arr[i]].index = i;
        }
    }
    for(let key in obj){
        if (obj[key].number > 1) {
            arr[obj[key].index] = arr[obj[key].index] + '1';
        }
    }
    result = arr
    return result
}
console.log(addSerial(["ab", "c", "ab", "d", "c"]))
```

## 7. Promise.all

```js
Promise.all().then().catch()

function promiseAll([]) {

}

promiseAll().then().catch()
```

## 8. 闭包

```js
inner = 'window'
function say() {
    console.log(inner)
    console.log(this.inner)
}
var obj1 = (function() {
    var inner = '1-1'
    return {
        inner: '1-2',
        say: function() {
            console.log(inner)
            console.log(this.inner)
        }
    }
})()
```

## 9. 写出一个生成排雷游戏地雷以及周围地雷数量的函数 输入 m, n, k

1）

```js
/*
m * n个雷
1、 生成雷的位置
2、 确认地雷周围的数字
*/
function getMap(m, n, k) {
  let arr = new Array(m+2) // 没时间写循环了 值为0
  for (let i = 0; i < m + 2; i++) {
    arr[i] = new Array(n + 2)
  }
  let number = m * n
  for (let i = 0; i < k;){
    let value = Math.floor(Math.random() * number)
    let j = Math.floor(value / m) + 1
    let l = value % m + 1
    if (arr[i][j] === -1) {
      continue
    } else {
      arr[i][j] = -1
      i++
      arr[i - 1][j - 1] === -1 ? arr[i - 1][j - 1] : arr[i - 1][j - 1]++
      arr[i - 1][j]++
      arr[i - 1][j + 1]++
      arr[i][j - 1]++
      arr[i][j + 1]++
      arr[i + 1][j - 1]++
      arr[i + 1][j]++
      arr[i + 1][j + 1]++
    }
    if (i > number) { // 雷的个数大于地图位置的个数
      break
    }
  }
  // 最外面的数据
}
```

2） 算出一次都没有重复生成地雷的概率

`1 * (num-1)/num * (num-2)/num`

3） 优化生成地雷的模块 避免重复生成地雷

```js
arr = [...new Array(number).keys()]
[0,1,2,3,4,5]
2
1
[0,2,3,4,5]
number-1
4
[0,2,3,4]
```

## 10. 给定f1函数 返回[0, 7]的随机数，请写出函数f2随机生成[3, 6]区间的随机数， 函数f3随机生成[0-20]的随机数
