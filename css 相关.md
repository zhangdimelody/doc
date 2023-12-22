## css 有关高度100% / 100vh
#### 之前很纠结的问题，M：如果不是absolute 文档流模式的话 浏览器不知道到底有多高

````
<! doctype html>
	<div style="  position: absolute; width: 110px;height: 100%;">
		<a style="display:inline-block;width:50px; height:100%; background-color:red"></a>
		<a style="display:inline-block;width:50px; height:100%; background-color:green"></a>
	</div>
</html>
````

### 瀑布流

1. css3 多列布局 **column-count**  存在问题：它按照内容顺序从上到下填充每一列，而不是按照高度来调整

   ```css
   .container {
     column-count: 4;
     /* column-gap: 1em; */
   }
   .item {
     /* background-color: #333;
     margin-bottom: 1em; */
   }
   ```

2. flexbox

   ```css
   .container {
     display: flex;
     flex-wrap: wrap;
   }
   .item {
     flex-basis: cals(25% - 20px);
   }
   ```

3. css grid

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 300px;
  gap: 10px;
}
/* .item {
  background-color: #333;
} */
```

