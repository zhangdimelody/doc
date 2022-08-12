### Map object 区别

* Map 继承于 object
* Map 可以用任何数据类型作为 key （NaN作为key时===NaN）；object 只能用 string / Symbol 作为 key 
* Map 可以用  **for** ( const [key, value] **of** mapObj ) 遍历 ；object 不可以
* Map 可以用 `size`属性；
* Map 有序；object 无序
* Map 对于增删的性能更好；object 没有优化

```js
const map1 = new Map();
map1.set('a', 'alpha');
map1.set('b', 'beta');

console.log(map1.size);  // 2
```

### 

### for of / for in 区别

<i>for of </i>（es6）

1. 适用于遍历有迭代器对象（iterator）的，如：数组 字符串；object 没有迭代器所以不能用

2. 遍历的值是 value

<i>for in </i>

1. 适用于 object
2. 遍历的值是 key



### grid

```css
.wrapper {
  display: grid;
  grid-template-columns: 200px 100px 200px; /*  声明了三列，宽度分别为 200px 100px 200px */
  grid-template-rows: 50px 50px; /*  声明了两行，行高分别为 50px 50px  */
  grid-gap: 5px;
}

```

### Symbol

1. 私有变量不被继承 `this[Symbol()]  = 'a'` 使用symbol可以实现私有变量
2. symbol 不需要 new 因为构造函数中加了判断 
3. Reflect.ownKeys 可以拿到 symbol key



### 

### 

