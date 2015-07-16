## css 有关高度100%
#### 之前很纠结的问题，M：如果不是absolute 文档流模式的话 浏览器不知道到底有多高

````
<! doctype html>
	<div style="  position: absolute; width: 110px;height: 100%;">
		<a style="display:inline-block;width:50px; height:100%; background-color:red"></a>
		<a style="display:inline-block;width:50px; height:100%; background-color:green"></a>
	</div>
</html>
````